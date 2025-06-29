export function openModal(data) {
  document.querySelector('.modal-title').textContent = data.name;

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

  document.querySelector('.modal-description').textContent = data.description;

  document.querySelector('.backdrop').classList.add('is-open');

  document.body.classList.add('modal-open');
}

export function closeModal() {
  document.querySelector('.backdrop').classList.remove('is-open');
  document.body.classList.remove('modal-open');
}

document
  .querySelector('.modal-close-btn')
  .addEventListener('click', closeModal);
document.querySelector('.backdrop').addEventListener('click', e => {
  if (e.target === e.currentTarget) closeModal();
});
