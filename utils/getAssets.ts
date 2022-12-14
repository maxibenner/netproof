import { OpenseaAssetsAndNextCursor } from "../types/OpenseaAsset";

export const OPENSEA_API_OFFSET = 50;
// const OPENSEA_URL =
//   process.env.NODE_ENV === "development"
//     ? "https://testnets-api.opensea.io"
//     : "https://api.opensea.io";
console.log("Currently running on goerli test net");
const OPENSEA_URL = "https://testnets-api.opensea.io";
const ENS_GRAPH_URL = "https://api.thegraph.com/subgraphs/name/ensdomains/ens";
const MAX_AUTO_RETRY_ATTEMPT = 10;
const AUTO_RETRY_ATTEMPT_INTERVAL = 2000;

let requestRetryCount = 0;

const delay = (
  fn: () => OpenseaAssetsAndNextCursor | PromiseLike<OpenseaAssetsAndNextCursor>
): Promise<OpenseaAssetsAndNextCursor> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(fn()), AUTO_RETRY_ATTEMPT_INTERVAL);
  });
};

export const fetchOpenseaAssets = async ({
  owner,
  cursor,
  apiKey,
  isProxyApi,
  apiUrl,
  autoRetry,
}: {
  owner: string | null;
  cursor?: string;
  apiKey?: string;
  isProxyApi?: boolean;
  apiUrl?: string;
  autoRetry?: boolean;
}): Promise<OpenseaAssetsAndNextCursor> => {
  try {
    const apiUrlFinal =
      apiKey || isProxyApi
        ? `${
            apiUrl ? apiUrl : OPENSEA_URL
          }/api/v1/assets?limit=50&cursor=${cursor}${
            owner ? "&owner=" + owner : ""
          }`
        : `${apiUrl ? apiUrl : OPENSEA_URL}/api/v1/assets?${
            owner ? "&owner=" + owner : ""
          }`;
    const result = await fetch(
      apiUrlFinal,
      apiKey ? { headers: { "X-API-KEY": apiKey } } : {}
    );
    if (result.status !== 200) {
      const error = await result.text();
      throw new Error(error);
    }
    const response = await result.json();
    const { assets, next: nextCursor } = response;

    return {
      assets,
      nextCursor,
      hasError: false,
    };
  } catch (error) {
    if (autoRetry && requestRetryCount < MAX_AUTO_RETRY_ATTEMPT) {
      console.log(
        `Failed to fetch assets, retrying in ${
          AUTO_RETRY_ATTEMPT_INTERVAL / 1000
        } seconds...`
      );
      console.log(
        `Retry Count: ${requestRetryCount}/${MAX_AUTO_RETRY_ATTEMPT}`
      );

      requestRetryCount++;

      return delay(() =>
        fetchOpenseaAssets({
          owner,
          cursor,
          apiKey,
          isProxyApi,
          apiUrl,
          autoRetry,
        })
      );
    } else {
      console.error("fetchAssets failed:", error);
      return {
        assets: [],
        nextCursor: "",
        hasError: true,
      };
    }
  }
};
