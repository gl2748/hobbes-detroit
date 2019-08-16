import axios, { AxiosRequestConfig } from 'axios';
import { Reporter } from 'gatsby';
import fs from 'fs';
import stringify from 'json-stringify-safe';
import chalk from 'chalk';
import { httpExceptionHandler } from './http-exception-handler';

const log = console.log;

export interface IFetchParams {
  url: string;
  publicKey: string;
  uploadcareId: string;
  name: string;
  localSave: boolean;
  path: string;
  payloadKey: string;
  auth:
    | {
        username: string;
        password: string;
      }
    | false;
  verbose: boolean;
  reporter: Reporter;
}

export const fetch = async ({
  url,
  publicKey,
  uploadcareId,
  name,
  localSave,
  path,
  payloadKey,
  auth,
  verbose,
  reporter,
}: IFetchParams) => {
  let allRoutes;

  const params: URLSearchParams = new URLSearchParams();
  params.append('pub_key', publicKey);
  params.append('file_id', uploadcareId);

  try {
    let options: AxiosRequestConfig = {
      method: `get`,
      url: url,
      params: params,
    };
    if (auth) {
      options.auth = auth;
    }
    allRoutes = await axios(options);
  } catch (e) {
    httpExceptionHandler(e, reporter);
  }

  if (allRoutes) {
    // Create a local save of the json data in the user selected path
    if (localSave) {
      try {
        fs.writeFileSync(
          `${path}${name}.json`,
          stringify(allRoutes.data, null, 2)
        );
      } catch (err) {
        reporter.panic(
          `Plugin transformer uploadcare could not save the file.  Please make sure the folder structure is already in place.`,
          err
        );
      }

      if (verbose) {
        log(
          chalk`{bgCyan TransformerUploadCare} ${name}.json was saved locally to ${path}`
        );
      }
    }

    // Return just the intended data
    if (payloadKey) {
      return allRoutes.data[payloadKey];
    }
    return allRoutes.data;
  }
};
