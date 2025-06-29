import getParentId from "./unitls/find_parent_id";

const container = document.querySelector('.exercises-workout-list');

container?.addEventListener('click', e => {
  if (e.target.classList.contains('start')) {
    const id = getParentId(e.target);
    alert('Click Start on workout card with ID: ' + id);
  }
});
