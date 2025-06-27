/**
 * Converts object parameters to URL query string
 * @param {Object} [params] - Object containing query parameters
 * @returns {string} Query string starting with '?' or empty string if no parameters
 */
export const objectToQueryString = params => {
  // Remove keys with undefined values
  const filteredParams = Object.fromEntries(
    Object.entries(params).filter(([_, value]) => value !== undefined)
  );

  if (Object.keys(filteredParams).length === 0) return '';

  const searchParams = new URLSearchParams(filteredParams);
  return '?' + searchParams.toString();
};
