/**
 * Error thrown when a fetch operation fails to execute properly
 * @extends {Error}
 * @description This error is thrown when fetch function encounters issues like wrong URL,
 * network problems, or invalid request parameters
 */
export class FetchError extends Error {
  constructor(message) {
    super(message);
  }
}