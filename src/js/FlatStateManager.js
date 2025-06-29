/**
 * Manages a flat key-value state object with subscription capabilities.
 * Allows subscribing to changes on specific keys and notifies subscribers when values change.
 *
 * @class FlatStateManager
 * @example
 * const manager = new FlatStateManager({ count: 0 });
 * manager.subscribe('count', (value, state) => console.log(value));
 * manager.setState('count', 1); // Logs: 1
 */


class FlatStateManager {
    /**
     * @type {Object}
     * Internal state object for managing flat state data.
     */
    #state = {};
  
    /**
     * @type {Object.<string, Function[]>}
     * Stores subscribers for different state keys.
     * Each key maps to an array of subscriber callback functions.
     */
    #subscribers = {};
  
    constructor(initialState = {}) {
      this.#state = { ...initialState };
      this.startListening();
    }

    startListening() {
      document.addEventListener("stateChange", (event) => {
        const { branch, data } = event.detail;
        console.log("Received new state:", branch, data);
        this.setState(branch, data);
      });
    }
  
    getState(key) {
      return this.#state[key];
    }
  
    /**
     * Updates the state for the specified key if the new value is different from the current value,
     * and notifies subscribers about the change.
     *
     * @param {string} key - The key of the state property to update.
     * @param {*} value - The new value to set for the specified key.
     */
    setState(key, value) {
      if (this.#state[key] !== value) {
        this.#state[key] = value;
        this.notify(key);
      }
    }
  
    /**
     * Subscribes a callback function to changes of a specific state key.
     * The callback is immediately invoked with the current value of the key and the entire state.
     *
     * @param {string} key - The key in the state to subscribe to.
     * @param {(value: any, state: Object) => void} callback - The function to call when the state for the given key changes.
     */
    subscribe(key, callback) {
      if (!this.#subscribers[key]) {
        this.#subscribers[key] = [];
      }
      this.#subscribers[key].push(callback);
      // Initial trigger
      callback(this.#state[key], this.#state);
    }
  
    /**
     * Notifies all subscribers of a specific state key by invoking their callbacks.
     *
     * @param {string} key - The key of the state to notify subscribers about.
     */
    notify(key) {
      if (this.#subscribers[key]) {
        for (const callback of this.#subscribers[key]) {
          callback(this.#state[key], this.#state);
        }
      }
    }
  }
  
  export default FlatStateManager;

