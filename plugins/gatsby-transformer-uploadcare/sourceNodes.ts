import fp from 'lodash/fp';

import {
    GatsbyNode,
    PluginOptions,
    NodePluginArgs,
    Node
} from 'gatsby';
import { fetch } from './fetch';
import {
    standardizeKeys,
    createEntityType,
    createGatsbyIds,
} from './normalize';

export interface IGatsbyTransformerUploadcareOptions extends PluginOptions {
    url: string; // Uploadcare file metadata / info endpoint.
    publicKey: string; // Uploadcare public key.
    auth?: { username: string; password: string } | false; // Optional Auth payload for request.
    name: string; // Name to append to nodes created by this plugin. 
    searchTerm: string; // String to search for in fields, from which we infer that the field refers to an uploadcare asset with an info endpoint at the url option for this plugin.
}

const typePrefix = `transformerUploadcare__`;

const isMatchingSearchTerm: (searchTerm: string) => (url: string) => boolean = searchTerm => url => {
    return url.search(searchTerm) === -1 ? false : true;
};

const objToArr: (obj: { [k: string]: any }) => any[] = obj => {
    return Object.keys(obj).map(k => obj[k]);
};

const searchFields: (searchTerm: string) => (acc: string[], curr: {[k: string] : any}) => string[] = (searchTerm) => (acc, curr) => {
    if (typeof curr === 'string' && isMatchingSearchTerm(searchTerm)(curr)) {
        return [...acc, curr];
    } else if (Array.isArray(curr)) {
        const s = curr.reduce(searchFields(searchTerm), []); // Recur.
        return [...acc, ...s];
    } else if (typeof curr === 'object') {
        const arr = objToArr(curr); // Convert to array.
        const strs = arr.reduce(searchFields(searchTerm), []); // Recur.
        return [...acc, ...strs];
    }
    return acc;
};

export const sourceNodes: GatsbyNode['sourceNodes'] = (
    {
        actions,
        createNodeId,
        reporter,
        createContentDigest,
        getNodes,
    }: NodePluginArgs,
    {
        url,
        publicKey,
        path,
        name,
        verboseOutput = false,
        searchTerm
    }: IGatsbyTransformerUploadcareOptions
) => {
    const { createNode, createParentChildLink, createNodeField } = actions;
    let entityType = `${typePrefix}${name}`;

    const nodes = getNodes();

    const allTheFetches = nodes.reduce((promises: Promise<any>[], node: Node) => {
        let newPromises = [] as Promise<any>[]
        if (
            node.internal.type === 'MarkdownRemark' &&
            node.frontmatter !== undefined
        ) {
            newPromises = objToArr(node.frontmatter).reduce(searchFields(searchTerm), []).map((uploadCareAssetUrl: string): string=> {
                return uploadCareAssetUrl.split('/')[3]; // Return the uploadcare asset ID from the url.
            }).reduce((fetches: Promise<any>[], id: string) => {
                const newFetch = 
                    fetch({
                        url: url as string,
                        uploadcareId: id,
                        publicKey: publicKey as string,
                        name: name as string,
                        path: path as string,
                        verbose: verboseOutput as boolean,
                        reporter: reporter,
                        auth: false,
                    }).then(e => {

                        const n = fp.compose(
                            createEntityType(entityType),
                            createGatsbyIds(createNodeId),
                            standardizeKeys([e]),
                        )()[0]

                        let { __type, ...entity } = n;
                        let uploadcareNode = {
                            ...entity,
                            id: n.id,
                            parent: node.id,
                            children: [],
                            internal: {
                                type: entityType,
                                contentDigest: createContentDigest(e),
                                description: `some kind of uploadcarefile`,
                                content: JSON.stringify(entity),
                            },
                        };
                        createNode(uploadcareNode);
                        createParentChildLink({parent: node, child: uploadcareNode});
                    })
                return [...fetches, newFetch ]
            }, [] as Promise<any>[]);
        }
        return [...promises, ...newPromises]
    }, [] as Promise<any>[] )
    // Gatsby's sourceNodes function should return a promise, so that Gatsby knows when all the nodes are present, and from which it can build the GraphQL schema.
    return Promise.all(allTheFetches);
};
