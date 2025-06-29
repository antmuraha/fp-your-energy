import client from './api/client';
import { Messages } from './messages';
import getParentId from './unitls/find_parent_id';

const container = document.querySelector('.exercises-workout-list');

container?.addEventListener('click', e => {
  if (e.target.classList.contains('start')) {
    const id = getParentId(e.target);

    // Example: How to add to favorites
    client
      .addToFavorites(id)
      .then(() => {
        Messages.success('Exercise added to favorites');
      })
      .catch(error => {
        console.error('Error adding exercise to favorites:', error);
        Messages.error('Failed to add exercise to favorites');
      });
  }
});
