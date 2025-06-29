import initModalRating from "./form_rating";
import getParentId from "./unitls/find_parent_id";

const container = document.querySelector('.exercises-workout-list');

container?.addEventListener('click', e => {
  if (e.target.classList.contains('rating')) {
    const id = getParentId(e.target);
    initModalRating(id);
  }
});
