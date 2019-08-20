import crypto from 'crypto';
import stringify from 'json-stringify-safe';
import deepMapKeys from 'deep-map-keys';
import nanoid from 'nanoid';
import chalk from 'chalk';
import { NodeInput, Reporter, Node, Actions } from 'gatsby';

const log = console.log;

/**
 * Encrypts a String using md5 hash of hexadecimal digest.
 *
 */
const digest = (str: string) =>
  crypto
    .createHash(`md5`)
    .update(str)
    .digest(`hex`);

// Prefix to use if there is a conflict with key name
const conflictFieldPrefix = `uploadcareTransformer_`;

// Keys that will conflict with graphql
const restrictedNodeFields = [`id`, `children`, `parent`, `fields`, `internal`];

export interface ICreateNodesFromEntitiesParams {
  entities: any[];
  createNode: Actions['createNode'];
  reporter: Reporter;
  parentNodeId: string;
  parentNode: Node;
  createParentChildLink: Actions['createParentChildLink'];
  createNodeField: Actions['createNodeField'];
}

/**
 * Validate the GraphQL naming convetions & protect specific fields.
 *
 * @param {any} key
 * @returns the valid name
 */
export const getValidKey = ({
  key,
  verbose = false,
}: {
  key: string;
  verbose?: boolean;
}): string => {
  let nkey = String(key);
  const NAME_RX = /^[_a-zA-Z][_a-zA-Z0-9]*$/;
  let changed = false;
  // Replace invalid characters
  if (!NAME_RX.test(nkey)) {
    changed = true;
    nkey = nkey.replace(/-|__|:|\.|\s/g, `_`);
  }
  // Prefix if first character isn't a letter.
  if (!NAME_RX.test(nkey.slice(0, 1))) {
    changed = true;
    nkey = `${conflictFieldPrefix}${nkey}`;
  }
  if (restrictedNodeFields.includes(nkey)) {
    changed = true;
    nkey = `${conflictFieldPrefix}${nkey}`.replace(/-|__|:|\.|\s/g, `_`);
  }
  if (changed && verbose)
    log(
      chalk`{bgCyan ThirdParty} Object with key "${key}" breaks GraphQL naming convention. Renamed to "${nkey}"`
    );

  return nkey;
};

// Standardize ids + make sure keys are valid.
export const standardizeKeys = (entities: any[]) =>
  entities.map(e =>
    deepMapKeys(e, key =>
      key === `ID` ? getValidKey({ key: `id` }) : getValidKey({ key })
    )
  );

// Generate a unique id for each entity
export const createGatsbyIds = (createNodeId: any, entities: any[]) =>
  entities.map(e => {
    e.id = createNodeId(`${nanoid()}`);
    return e;
  });

// Add entity type to each entity
export const createEntityType = (entityType: string, entities: any[]) => {
  return entities.map(e => {
    e.__type = entityType;
    return e;
  });
};
