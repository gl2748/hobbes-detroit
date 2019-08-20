import { GatsbyNode, PluginOptions } from 'gatsby';
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

export const onCreateNode: GatsbyNode['onCreateNode'] = async (
  {
    node,
    loadNodeContent,
    actions,
    createNodeId,
    reporter,
    createContentDigest,
  },
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

  if (
    node.internal.type === 'MarkdownRemark' &&
    node.frontmatter !== undefined
  ) {
    const c = await loadNodeContent(node);
    const fields: any[] = objToArr(node.frontmatter); // Convert to array.
    const uploadCareUrls: string[] = fields.reduce(myReducer, []); // Reduce (has a recursion).

    // For each uploadCareUrl fetch its data, and create a node.
    uploadCareUrls
      .map(upUrl => {
        return upUrl.split('/')[3];
        //return `https://upload.uploadcare.com/info/?pub_key=${publicKey}\\&file_id=${uploadcareFileId}`
      })
      .map(async id => {
        // We skip auth and payloadkey for the time being.
        let entities: any[] = await fetch({
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
        });

        // No entities found.
        if (!entities) {
          return;
        }

        // If entities is a single object, add to array to prevent issues with creating nodes
        if (entities && !Array.isArray(entities)) {
          entities = [entities];
        }

        // Skip node creation if the goal is to only download the data to json files
        if (skipCreateNode) {
          return;
        }

        // Standardize and clean keys
        entities = standardizeKeys(entities);

        // Add entity type to each entity
        entities = createEntityType(entityType, entities);

        // Create a unique id for gatsby
        entities = createGatsbyIds(createNodeId, entities);

        // Generate the nodes
        entities.forEach(e => {
          let { __type, ...entity } = e;
          let uploadcareNode = {
            ...entity,
            id: entity.id,
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
          console.log('creating node!: ', uploadcareNode);
          createNode(uploadcareNode);
          createParentChildLink({ parent: node, child: uploadcareNode });
          return uploadcareNode;
        });
      });
  }
};
