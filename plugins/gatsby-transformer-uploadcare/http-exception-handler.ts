import { AxiosError } from "axios";
import chalk from "chalk";
import { Reporter } from "gatsby";
const log = console.log;

export const httpExceptionHandler = (e: AxiosError, reporter: Reporter) => {
  const { response, code } = e;

  const c = code !== undefined ? code : "undefined error code";
  if (!response) {
    log(chalk`{bgRed ThirdParty} The request failed. Error Code: ${c}`);
    return reporter.panic(
      `Plugin ThirdParty http request failed. Error Code: ${c}`,
      e
    );
  }
  if (e.response !== undefined) {
    const {
      status,
      statusText,
      data: { message }
    } = e.response;
    log(
      chalk`{bgRed ThirdParty} The server response was "${status.toString()} ${statusText}"`
    );
    if (message) {
      log(chalk`{bgRed ThirdParty} Inner exception message : "${message}"`);
    }
    return reporter.panic(
      `Plugin transformer-uploadcare http request failed. The server response was "${status} ${statusText}"`,
      e
    );
  }
  return reporter.panic(
    `Plugin transformer-uploadcare http request failed without a server response`
  );
};
