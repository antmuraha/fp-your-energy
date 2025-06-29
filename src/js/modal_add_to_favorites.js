import { openDetailsModal } from './modal';
import getParentId from './unitls/find_parent_id';

const container = document.querySelector('.exercises-workout-list');

container?.addEventListener('click', e => {
  if (e.target.classList.contains('start')) {
    const id = getParentId(e.target);
    openDetailsModal(id);
  }
});
