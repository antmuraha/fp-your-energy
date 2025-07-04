import renderCardWorkout from './render_card_workout';

function renderExercisesList(data, selectedFilter) {
  const list = document.querySelector('.exercises-workout-list');
  if (!selectedFilter) {
    list?.classList.add('hidden');
    return;
  }
  list?.classList.remove('hidden');
  list.innerHTML = '';

  data.forEach(item => {
    const element = renderCardWorkout(item);
    list.appendChild(element);
  });

  if (data?.length === 0) {
    const emptyMessage = document.querySelector('.exercises-empty-message');
    emptyMessage.classList.remove('hidden');
  } else {
    const emptyMessage = document.querySelector('.exercises-empty-message');
    emptyMessage.classList.add('hidden');
  }
}

export default renderExercisesList;
