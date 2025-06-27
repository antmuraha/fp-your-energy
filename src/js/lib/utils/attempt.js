/**
 * Safely executes a function and wraps its result or error in a standardized format
 * @template T
 * @param {() => Promise<T>} fn - Function to execute
 * @returns {Promise<{data: T|null, error: Error|null, isError: boolean}>} Promise resolving to object containing execution result or error
 */
export const attempt = async (fn) => {
  try {
    return {
      data: await fn(),
      error: null,
      isError: false,
    };
  } catch (error) {
    return {
      data: null,
      error,
      isError: true,
    }
  }
}