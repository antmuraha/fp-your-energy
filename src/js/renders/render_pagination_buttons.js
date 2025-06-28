// For src/partials/components/pagination-buttons.html

function renderPaginationButtons(id, currentPage, totalPages) {
  const paginationContainer = document.getElementById(id);
  const arrowButtonsLeft = paginationContainer.querySelector(
    '.arrow-buttons-left'
  );
  const arrowButtonsRight = paginationContainer.querySelector(
    '.arrow-buttons-right'
  );
  const pageButtonsContainer =
    paginationContainer.querySelector('.page-buttons');
  const pageButtons = pageButtonsContainer.querySelectorAll('.page-button');

  if (totalPages <= 1) {
    paginationContainer.style.display = 'none';
    return;
  }

  if (totalPages <= 3) {
    arrowButtonsLeft.style.display = 'none';
    arrowButtonsRight.style.display = 'none';
  }

  pageButtons.innerHTML = ''; // Clear existing buttons
  for (let i = 1; i <= totalPages; i++) {
    const button = document.createElement('button');
    button.className = 'page-button';
    button.textContent = i;
    if (i === currentPage) {
      button.classList.add('active');
    }
    pageButtonsContainer.appendChild(button);
  }
}

export default renderPaginationButtons;
