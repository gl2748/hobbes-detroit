import {
  GatsbyNode,
  PluginOptions,
  SourceNodesArgs,
  NodePluginArgs,
} from 'gatsby';
import { fetch } from './fetch';
import {
  standardizeKeys,
  createEntityType,
  createGatsbyIds,
} from './normalize';

export interface IGatsbyTransformerUploadcareOptions {
  url: string;
  publicKey: string;
  localSave?: boolean;
  idField?: string;
  skipCreateNode?: boolean;
  path?: string;
  auth?: { username: string; password: string } | false;
  payloadKey?: string;
  name: string;
  verboseOutput?: boolean;
}

const typePrefix = `transformerUploadcare__`;

const isUploadCareUrl: (url: string) => boolean = url => {
  return url.search('ucarecdn') === -1 ? false : true;
};

const objToArr: (obj: { [k: string]: any }) => any[] = obj => {
  return Object.keys(obj).map(k => obj[k]);
};

const myReducer: (acc: string[], curr: string) => string[] = (acc, curr) => {
  if (typeof curr === 'string' && isUploadCareUrl(curr)) {
    return [...acc, curr];
  } else if (Array.isArray(curr)) {
    const s = curr.reduce(myReducer, []); // Recur.
    return [...acc, ...s];
  } else if (typeof curr === 'object') {
    const arr = objToArr(curr); // Convert to array.
    const strs = arr.reduce(myReducer, []); // Recur.
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
    idField = `id`,
    localSave = false,
    skipCreateNode = false,
    path,
    auth = false,
    payloadKey,
    name,
    verboseOutput = false,
  }: PluginOptions
) => {
  const { createNode, createParentChildLink, createNodeField } = actions;
  let entityType = `${typePrefix}${name}`;

  const nodes = getNodes();
  let allTheFetches: Promise<any>[] = [];
  nodes.forEach((node: any) => {
    if (
      node.internal.type === 'MarkdownRemark' &&
      node.frontmatter !== undefined
    ) {
      const fields: any[] = objToArr(node.frontmatter); // Convert to array.
      const uploadCareUrls: string[] = fields.reduce(myReducer, []); // Reduce (has a recursion).
      const uploadCareIds: string[] = uploadCareUrls.map(upUrl => {
        return upUrl.split('/')[3];
        //return `https://upload.uploadcare.com/info/?pub_key=${publicKey}\\&file_id=${uploadcareFileId}`
      });
      // For each uploadCareUrl there's a promise that resolves when its data is fetched.
      uploadCareIds.map(id => {
        allTheFetches.push(
          fetch({
            url: url as string,
            uploadcareId: id,
            publicKey: publicKey as string,
            name: name as string,
            localSave: localSave as boolean,
            path: path as string,
            verbose: verboseOutput as boolean,
            reporter: reporter,
            auth: false,
            payloadKey: '',
          }).then(e => {
            let out = [e];
            out = standardizeKeys(out);
            out = createEntityType(entityType, out);
            out = createGatsbyIds(createNodeId, out);
            let n = out[0];
            let { __type, ...entity } = n;
            let uploadcareNode = {
              ...entity,
              id: n.id,
              parent: null,
              children: [],
              mediaType: 'uploadcareMetaData',
              internal: {
                type: `transformerUploadcareMeta`,
                contentDigest: createContentDigest(e),
                description: `some kind of uploadcarefile`,
                content: JSON.stringify(entity),
              },
            };
            createNode(uploadcareNode);
          })
        );
      });
    }
  });
  debugger;
  return Promise.all(allTheFetches);
};
