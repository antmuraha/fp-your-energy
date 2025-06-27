import { createRestClient } from '../lib/create-rest-client'

const handleError = {
  400: (error) => {},
  401: (error) => {},
  403: (error) => {},
  404: (error) => {
    console.log('404 error:', error);
  },
  500: (error) => {},
}

const makeRequest = createRestClient(import.meta.env.VITE_API_URL, handleError);

/**
 * Executes GET request to REST API
 * @param {string} url - Request URL path (must start with /)
 * @param {Object} [config] - Request configuration
 * @param {Object} [config.query] - Query parameters for URL
 * @returns {Promise<{data: object|null, error: Error|null, isError: boolean}>} Response with data or error
 */
const get = async (url, config) => await makeRequest(url, {
  ...config,
  method: 'GET',
  body: undefined,
})

/**
 * Executes POST request to REST API
 * @param {string} url - Request URL path (must start with /)
 * @param {Object} [config] - Request configuration
 * @param {Object} [config.query] - Query parameters for URL
 * @returns {Promise<{data: object|null, error: Error|null, isError: boolean}>} Response with data or error
 */
const post = async (url, config) => await makeRequest(url, {
  ...config,
  method: 'POST',
});

/**
 * Executes PUT request to REST API
 * @param {string} url - Request URL path (must start with /)
 * @param {Object} [config] - Request configuration
 * @param {Object} [config.query] - Query parameters for URL
 * @returns {Promise<{data: object|null, error: Error|null, isError: boolean}>} Response with data or error
 */
const put = async (url, config) => await makeRequest(url,{
  ...config,
  method: 'PUT',
});

/**
 * Executes PATCH request to REST API
 * @param {string} url - Request URL path (must start with /)
 * @param {Object} [config] - Request configuration
 * @param {Object} [config.query] - Query parameters for URL
 * @returns {Promise<{data: object|null, error: Error|null, isError: boolean}>} Response with data or error
 */
const patch = async (url, config) => await makeRequest(url, {
  ...config,
  method: 'PATCH',
});

/**
 * Executes DELETE request to REST API
 * @param {string} url - Request URL path (must start with /)
 * @param {Object} [config] - Request configuration
 * @param {Object} [config.query] - Query parameters for URL
 * @param {Object} [config.body] - Request body
 * @returns {Promise<{data: object|null, error: Error|null, isError: boolean}>} Response with data or error
 */
const del = async (url, config) => await makeRequest(url, {
  ...config,
  method: 'DELETE',
});

export const api = {
  get,
  post,
  put,
  patch,
  del,
}
