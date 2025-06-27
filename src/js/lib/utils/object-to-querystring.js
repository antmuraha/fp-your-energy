/**
 * Converts object parameters to URL query string
 * @param {Object} [params] - Object containing query parameters
 * @returns {string} Query string starting with '?' or empty string if no parameters
 */
export const objectToQueryString = (params) => {
  if (!params) return '';

  return '?' + Object.entries(params)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');
};