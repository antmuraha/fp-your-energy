function renderExercisesHeader(selectedFilter) {
  const exercisesHeader = document.querySelector('.exercises-header-container');
  if (selectedFilter) {
    exercisesHeader.querySelector('.filter').textContent = selectedFilter || '';
    exercisesHeader.classList.remove('hidden');
    return;
  }

  exercisesHeader.classList.add('hidden');
}

export default renderExercisesHeader;
