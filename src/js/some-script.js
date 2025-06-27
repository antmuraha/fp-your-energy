import { api } from './api'
import { devLogger } from './lib/utils/index.js';

// test request
(async function () {
  console.log("Some JavaScript code");
  const result = await api.get('/exercises', {
    query: {
      test: 2,
      abcd: 'test string'
    }
  })

  console.log(result)
})();

// test request 404 - see js/api/rest-client.js to define handlers
(async function () {
  console.log("Some JavaScript code");
  const result = await api.get('/api-request-1111')

  console.log(result)
})();

// test devLogger - should not log in PROD env
devLogger.log('devLogger test');

export {}