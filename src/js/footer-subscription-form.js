document.addEventListener('DOMContentLoaded', async () => {
  const container = document.createElement('div');
  document.body.appendChild(container);

  try {
    const res = await fetch('./partials/footer-subscription-form.html');
    if (!res.ok) throw new Error('Failed to load modal HTML');
    const html = await res.text();
    container.innerHTML = html;
  } catch (err) {
    console.error('Error loading modal:', err);
    return;
  }

  const emailInput = document.querySelector('.subscribe-input');
  const firstSendBtn = document.querySelector('.subscribe-btn');
  const modal = document.getElementById('subscribe-modal');
  const modalForm = document.getElementById('subscribe-details-form');
  const modalCloseBtn = document.getElementById('modal-close');

  const openModalBtn = document.getElementById('open-modal-btn');

  if (openModalBtn) {
    openModalBtn.addEventListener('click', () => {
      modal.style.display = 'flex';
    });
  }

  if (!emailInput || !firstSendBtn || !modal || !modalForm || !modalCloseBtn) {
    console.error('Modal or button elements not found');
    return;
  }

  let capturedEmail = '';

  const modalEmailInput = document.getElementById('modal-email');

  const ratingValue = document.getElementById('rating-value');
  const ratingStars = document.getElementById('rating-stars');

  let selectedRating = 0;

  ratingStars?.addEventListener('click', e => {
    const rect = ratingStars.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percent = x / rect.width;
    selectedRating = Math.round(percent * 5); // значення від 1 до 5

    ratingValue.textContent = selectedRating.toFixed(1);
    highlightStars(selectedRating);
  });

  if (ratingStars && ratingValue) {
    ratingStars.addEventListener('mousemove', e => {
      const rect = ratingStars.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percent = x / rect.width;
      const rating = Math.round(percent * 5 * 10) / 10;
      ratingValue.textContent = rating.toFixed(1);
      highlightStars(rating);
    });

    ratingStars.addEventListener('mouseleave', () => {
      ratingValue.textContent = selectedRating.toFixed(1);
      highlightStars(selectedRating);
    });

    ratingStars.addEventListener('click', e => {
      const rect = ratingStars.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percent = x / rect.width;
      selectedRating = Math.round(percent * 5 * 10) / 10;

      ratingValue.textContent = selectedRating.toFixed(1);
      highlightStars(selectedRating);
    });
  }

  function highlightStars(value) {
    const stars = ratingStars.textContent
      .split('')
      .map((_, i) => (i < Math.round(value) ? '★' : '☆'));
    ratingStars.textContent = stars.join('');
  }

  // Close the modal window
  modalCloseBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    selectedRating = 0;
    ratingValue.textContent = '0.0';
    highlightStars(0);
  });

  // Submit the form
  modalForm.addEventListener('submit', async e => {
    e.preventDefault();
    //const exerciseID = 'your-exercise-id'; // ← заміни на актуальний
    const exerciseID = '64f389465ae26083f39b17a2'; // захардкоджене для тесту

    const emailInput = modalForm.elements['email'];
    const commentInput = modalForm.elements['comment'];
    const email = emailInput.value.trim();
    const review = commentInput.value.trim();

    // 🔸 Читаємо рейтинг (збережений раніше у JS)
    const rate = selectedRating; // має бути числом від 1 до 5

    if (!emailInput.checkValidity()) {
      alert('Please enter a valid email address.');
      return;
    }

    try {
      const response = await fetch(
        `https://your-energy.b.goit.study/api/exercises/${exerciseID}/rating`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ rate, email, review }),
        }
      );

      if (response.status === 409) {
        alert('You have already submitted a review for this exercise.');
        return;
      } else if (!response.ok) {
        const error = await response.json();
        alert(`Error ${response.status}: ${error.message || 'Unknown error'}`);
        return;
      } else {
        alert('Your feedback has been submitted!');
      }

      alert('Your feedback has been submitted!');
      modalForm.reset();
      modal.style.display = 'none';
    } catch (err) {
      alert('Something went wrong. Please try again later.');
    }
  });
});
