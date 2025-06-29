import renderCardWorkout from './render_card_workout';

function renderFavoritesList(data) {
  const wrapper = document.querySelector('.favorites-content-list');
  const favoritesList = wrapper?.querySelector('.favorites-list');
  const emptyMessage = wrapper?.querySelector('.favorites-empty-message');
  favoritesList.innerHTML = '';

  if (data.length === 0) {
    emptyMessage.classList.remove('hidden');
    favoritesList.classList.add('hidden');
    return;
  }

  emptyMessage.classList.add('hidden');
  favoritesList.classList.remove('hidden');

  data.forEach(item => {
    const listItem = renderCardWorkout(item, true); // Assuming renderCardWorkout is defined elsewhere
    favoritesList.appendChild(listItem);
  });
}

export default renderFavoritesList;
