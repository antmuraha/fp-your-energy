// For src/partials/components/workout-card.html

function renderCardWorkout(item, asFavorite = false) {
  const templates = document.querySelector('#templates'); // <template> container
  const template = templates.content.querySelector('.favorites-workout-card');
  const newElement = template.cloneNode(true);

  newElement.dataset.id = item._id; // Set data-id attribute

  if (!asFavorite) {
    newElement.querySelector('.delete').classList.add('hidden'); // Hide delete button for workout cards
    newElement.querySelector('.rating-value').textContent = item.rating; // Set rating for favorite workout cards
    newElement.querySelector('.favorites-workout-card-rating-container').classList.remove('hidden'); // Show rating for favorite workout cards
  } else {
    newElement.querySelector('.delete').classList.remove('hidden');
    newElement.querySelector('.favorites-workout-card-rating-container').classList.add('hidden');
  }
  // rating
  newElement.querySelector('.title').textContent = item.name;
  newElement.querySelector('.burned-calories').textContent = `${item.burnedCalories} / ${item.time} min`;
  newElement.querySelector('.group').textContent = item._group;
  newElement.querySelector('.group-target').textContent = item.bodyPart;
  newElement.querySelector('.filter').textContent = item.target;

  return newElement;
}

export default renderCardWorkout;
