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
}

export default renderExercisesList;
