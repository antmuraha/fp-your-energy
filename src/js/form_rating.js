import { Messages } from './messages.js';

function initModalRating(id) {
  const modal = document.getElementById('modal-rating');
  const modalContent = modal?.querySelector('.modal-content');
  modal.style.display = 'flex';
  const modalForm = document.getElementById('subscribe-details-form');
  const modalCloseBtn = document.getElementById('modal-close');

  const ratingValue = document.getElementById('rating-value');
  const ratingStars = document.getElementById('rating-stars');

  let selectedRating = 0;

  function selectStar(e) {
    const rect = ratingStars.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percent = x / rect.width;
    selectedRating = Math.round(percent * 5);

    ratingValue.textContent = selectedRating.toFixed(1);
    highlightStars(selectedRating);
  };
  ratingStars?.addEventListener('click', selectStar);
  
    function starMouseMove(e){
      const rect = ratingStars.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percent = x / rect.width;
      const rating = Math.round(percent * 5 * 10) / 10;
      ratingValue.textContent = rating.toFixed(1);
      highlightStars(rating);
    };
    ratingStars.addEventListener('mousemove', starMouseMove);


    function starMouseLeave(e){
      ratingValue.textContent = selectedRating.toFixed(1);
      highlightStars(selectedRating);
    };
    ratingStars.addEventListener('mouseleave', starMouseLeave);

    function starClick(e) {
      const rect = ratingStars.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percent = x / rect.width;
      selectedRating = Math.round(percent * 5 * 10) / 10;

      ratingValue.textContent = selectedRating.toFixed(1);
      highlightStars(selectedRating);
    };
    ratingStars.addEventListener('click', starClick);
  

  function highlightStars(value) {
    const starIcons = ratingStars.querySelectorAll('.star-icon');
    starIcons.forEach((star, index) => {
      if (index < Math.round(value)) {
        star.classList.add('active');
      } else {
        star.classList.remove('active');
      }
    });
  }

  // Close the modal window
  modalContent.addEventListener('click', e => {
    e.stopPropagation(); // Prevent click from closing the modal
  });

  function closeModal() {
    modal.style.display = 'none';
    selectedRating = 0;
    ratingValue.textContent = '0.0';
    highlightStars(0);
    modalForm.reset();
    ratingStars?.removeEventListener('click', selectStar);
    ratingStars.removeEventListener('mousemove', starMouseMove);
    ratingStars.removeEventListener('mouseleave', starMouseLeave);
    ratingStars.removeEventListener('click', starClick);
    modalCloseBtn.removeEventListener('click', closeModal);
    modal.removeEventListener('click', closeModal);
    modalForm.removeEventListener('submit', onSubmit);
  }

  modalCloseBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', closeModal);

  // Submit the form
  async function onSubmit(e) {
    e.preventDefault();
    //const exerciseID = 'your-exercise-id'; // ← replacement with the actual one
    const exerciseID = '64f389465ae26083f39b17a2'; // hacked for the test

    const emailInput = modalForm.elements['email'];
    const commentInput = modalForm.elements['comment'];
    const email = emailInput.value.trim();
    const review = commentInput.value.trim();

    const rate = selectedRating;

    if (!emailInput.checkValidity()) {
      Messages.error('Please enter a valid email address.');
      return;
    }

    try {
      const response = await fetch(`https://your-energy.b.goit.study/api/exercises/${exerciseID}/rating`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rate, email, review }),
      });

      if (response.status === 409) {
        Messages.warning('You have already submitted a review for this exercise.');
        return;
      } else if (!response.ok) {
        const error = await response.json();
        Messages.error(`Error ${response.status}: ${error.message || 'Unknown error'}`);
        return;
      } else {
        Messages.success('Your feedback has been submitted successfully!');
        modalForm.reset();
        modal.style.display = 'none';
        selectedRating = 0;
        ratingValue.textContent = '0.0';
        highlightStars(0);
        closeModal();
      }
    } catch (err) {
      Messages.error('Something went wrong. Please try again later.');
    }
  };
  modalForm.addEventListener('submit', onSubmit);
}

export default initModalRating;
