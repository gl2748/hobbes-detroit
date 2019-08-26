import axios, { AxiosRequestConfig } from "axios";
import chalk from "chalk";
import { Reporter } from "gatsby";
import { httpExceptionHandler } from "./http-exception-handler";

const log = console.log;

export interface IFetchParams {
  url: string;
  publicKey: string;
  uploadcareId: string;
  name: string;
  path: string;
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
  path,
  auth,
  verbose,
  reporter
}: IFetchParams) => {
  let allRoutes;
  const params: URLSearchParams = new URLSearchParams();
  params.append("pub_key", publicKey);
  params.append("file_id", uploadcareId);

  try {
    const options: AxiosRequestConfig = {
      method: `get`,
      url,
      params
    };
    if (auth) {
      options.auth = auth;
    }
    allRoutes = await axios(options);
  } catch (e) {
    httpExceptionHandler(e, reporter);
  }

  if (allRoutes && allRoutes.data) {
    return allRoutes.data;
  }
};
