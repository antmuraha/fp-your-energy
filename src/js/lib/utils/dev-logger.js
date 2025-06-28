/**
 * Creates a development logger that only outputs in development environment
 * @returns {Object} Collection of logging functions
 */
const makeDevLogger = () => {
  const isDev = import.meta.env.DEV;

  /**
   * Creates a logging function that only executes in development environment
   * @param {Function} fn - Console function to wrap
   * @returns {Function} Wrapped logging function
   */
  const commonLog = (fn) => (...args) => {
    if(isDev) fn(...args)
  };

  const log = commonLog(console.log);
  const warn = commonLog(console.warn);
  const error = commonLog(console.error);
  const info = commonLog(console.info);
  const table = commonLog(console.table);

  return {
    /** Log message to console (dev environment only) */
    log,
    /** Log warning message to console (dev environment only) */
    warn,
    /** Log error message to console (dev environment only) */
    error,
    /** Log info message to console (dev environment only) */
    info,
    /** Log data as table to console (dev environment only) */
    table,
  }
};

export const devLogger = makeDevLogger();