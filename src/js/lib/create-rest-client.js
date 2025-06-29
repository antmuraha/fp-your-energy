import { objectToQueryString } from './utils';

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
(url, { method = 'GET', query, body }) => new Promise(async (resolve, reject) => {
  const queryString = objectToQueryString(query);

  const fetchResult = await fetch(`${baseDomain}${url}${queryString}`, {
    method,
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (fetchResult.status >= 500) {
    reject({
      status: fetchResult.status,
      data: null,
      error: fetchResult.statusText || 'Unknown error',
      isError: true,
    });
    return;
  }

  let data = null;
  try {
    data = await fetchResult.json();
  } catch (error) {
    reject({
      status: 500,
      data: null,
      error: 'Parse error',
      isError: true,
    });
  }
  

  if (fetchResult.status >= 400) {
    reject({
      status: fetchResult.status,
      data: data,
      error: fetchResult.statusText || 'Unknown error',
      isError: true,
    });
    return;
  }

  resolve({
    status: fetchResult.status,
    data,
    error: null,
    isError: false,
  })
});