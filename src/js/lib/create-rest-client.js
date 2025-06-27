import { JsonParseError, HTTPResponseError, FetchError } from './errors';
import { devLogger, attempt, objectToQueryString } from './utils';

/**
 * Creates a REST client factory function with predefined base domain
 * @param {string} baseDomain - The base domain URL for all API requests
 * @param handleError
 * @returns {Function} Configured REST client function
 */
export const createRestClient = (baseDomain, handleError) => /**
 * Executes REST API request
 * @param url - Request URL path
 * @param {Object} [options] - Request options
 * @param {string} [options.method] - HTTP method
 * @param {Object} [options.query] - Query parameters
 * @param {any} [options.body] - Request body
 * @returns {Promise<{data: any|null, error: Error|null, isError: boolean}>} Response with data or error
 */
async (url, { method = 'GET', query, body }) => {
  const queryString = objectToQueryString(query);

  const fetchResult = await attempt(() => fetch(`${baseDomain}${url}${queryString}`, {
    method,
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  }));

  if (fetchResult.isError) {
    const error = new FetchError(`Error fetching ${url}${queryString}`, fetchResult.error);

    devLogger.error(error.toString());

    return {
      data: null, error: error, isError: true,
    };
  }

  if (!fetchResult.data.ok) {
    const error = new HTTPResponseError(`HTTP ${fetchResult.data.status} error in request ${url}${queryString}`, fetchResult.data.status);

    devLogger.error(error);

    handleError?.[fetchResult.data.status]?.(error);

    return {
      data: null, error, isError: true,
    };
  }

  const { data, error, isError } = await attempt(() => fetchResult.data.json());

  if (isError) {
    const error = new JsonParseError(`Error parsing JSON in request ${url}${queryString}`);

    devLogger.error(error);

    return {
      data: null, error, isError,
    };
  }

  return {
    data, error, isError,
  };
};