import client from './api/client';
import initModalRating from './form_rating';
import { Messages } from './messages';

async function toggleFavorite(id) {
  const isFavorite = await client.isFavorite(id);

  if (isFavorite) {
    client
      .removeFromFavorites(id)
      .then(() => {
        Messages.success('Exercise removed from favorites');
      })
      .catch(error => {
        console.error('Error adding exercise to favorites:', error);
        Messages.error('Failed to remove exercise from favorites');
      });
  } else {
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
}

export async function openDetailsModal(id) {
  const data = (await client.getExerciseById(id))?.data;
  const isFavorite = await client.isFavorite(id);

  document.querySelector('.modal-title').textContent = data.name;
  if (isFavorite) {
    document.querySelector('.icon-favorite')?.classList.add('active');
  } else {
    document.querySelector('.icon-favorite')?.classList.remove('active');
  }
  

  document.querySelector('.modal-rate-value').textContent = data.rating;

  const infoElements = document.querySelectorAll('.exercise-info-text');
  const infoData = [
    data.target,
    data.bodyPart,
    data.equipment,
    data.popularity,
    data.burnedCalories,
  ];
  infoElements.forEach((el, idx) => (el.textContent = infoData[idx]));

  document.querySelector('.modal-img').setAttribute('src', data.gifUrl);
  document.querySelector('.modal-description').textContent = data.description;
  document.querySelector('.btn-favorite').onclick = () => {
    toggleFavorite(id);
    document.querySelector('.icon-favorite')?.classList.toggle('active');
  }
  document.querySelector('.btn-rating').onclick = () => {
      closeDetailsModal();
      initModalRating(id);
  };

  document.querySelector('.backdrop').classList.add('is-open');

  document.body.classList.add('modal-open');
}

export function closeDetailsModal() {
  document.querySelector('.backdrop').classList.remove('is-open');
  document.body.classList.remove('modal-open');
}

document
  .querySelector('.modal-close-btn')
  .addEventListener('click', closeDetailsModal);
document.querySelector('.backdrop').addEventListener('click', e => {
  if (e.target === e.currentTarget) closeDetailsModal();
});
