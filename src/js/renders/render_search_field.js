function renderSearchField(show) {
  const container = document.querySelector('.search-field');
  const input = container?.querySelector('.search-input');

  if (show) {
    container?.classList.remove('hidden');
    input?.setAttribute("value", "");
  } else {
    container?.classList.add('hidden');
  }
}

export default renderSearchField;
