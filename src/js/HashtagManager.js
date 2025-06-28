class HashtagManager {
  constructor() {
    this.subscribers = new Map();
    window.addEventListener('hashchange', this.handleHashChange.bind(this));
  }

  handleHashChange() {
    const hash = window.location.hash;
    this.subscribers.forEach((callback, key) => {
      callback(hash);
    });
  }

  subscribe(key, callback) {
    if (!this.subscribers.has(key)) {
      this.subscribers.set(key, callback);
    }
    return () => {
      this.subscribers.delete(key);
    };
  }

  isActive(hash) {
    return window.location.hash === hash;
  }
}

export default HashtagManager;
