// For src/partials/components/pagination-buttons.html

function renderPaginationButtons(currentPage, totalPages) {
  const paginationContainer = document.getElementById("exercises-list-pagination-buttons");

  if (!totalPages || totalPages <= 1 || totalPages == "1") {
    paginationContainer?.classList.add('hidden');
    return;
  };
  paginationContainer?.classList.remove('hidden');
  const arrowButtonsLeft = paginationContainer.querySelector(
    '.arrow-buttons-left'
  );
  const arrowButtonsRight = paginationContainer.querySelector(
    '.arrow-buttons-right'
  );
  const pageButtonsContainer =
    paginationContainer.querySelector('.page-buttons');

  pageButtonsContainer.innerHTML = ''; // Clear existing buttons
  for (let i = 1; i <= totalPages; i++) {
    const button = document.createElement('button');
    button.dataset.page = i;
    button.className = 'page-button';
    button.textContent = i;
    if (i == currentPage) {
      button.classList.add('active');
    }
    pageButtonsContainer.appendChild(button);
  }
}

export default renderPaginationButtons;
