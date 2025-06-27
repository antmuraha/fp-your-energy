import client from './api/client.js';
import { ExercisesConstants } from './api/constans.js';
import { devLogger } from './lib/utils/index.js';

// test devLogger - should not log in PROD env
devLogger.log('devLogger test');

async function testClient() {
  const exercises = await client.getExercises();
  console.log('Fetched exercises:', exercises);

  client
    .addExerciseRating(exercises.data.results[0]._id, {
      rate: 5,
      email: `exmaple@test.test`,
      review: 'Great exercise!',
    })
    .then(response => {
      console.log('Exercise rating added:', response);
    })
    .catch(error => {
      console.error('Error adding exercise rating:', error);
    });

  client
    .getExerciseById(exercises.data.results[0]._id)
    .then(response => {
      console.log('Fetched exercise by ID:', response);
    })
    .catch(error => {
      console.error('Error fetching exercise by ID:', error);
    });

  client
    .getFilters(ExercisesConstants.GROUPS.BODY_PARTS)
    .then(response => {
      console.log('Fetched filters for body parts:', response);
    })
    .catch(error => {
      console.error('Error fetching filters for body parts:', error);
    });

  client
    .getQuoteOfDay()
    .then(response => {
      console.log('Fetched quote of the day:', response);
    })
    .catch(error => {
      console.error('Error fetching quote of the day:', error);
    });

  client
    .subscribe('example@text.text')
    .then(response => {
      console.log('Subscription response:', response);
    })
    .catch(error => {
      console.error('Error during subscription:', error);
    });
}

// Uncomment to test the client
// testClient();

export {};
