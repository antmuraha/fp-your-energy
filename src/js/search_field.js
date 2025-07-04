const debounceTime = 500;

function initSearchField(initValue, setValue) {
  const container = document.querySelector('.search-field');
  const input = container?.querySelector('.search-input');
  const clearButton = container?.querySelector('.clear-button');
  const searchIcon = container?.querySelector('.search-icon');
  input.value = initValue || '';

  if (initValue) {
    clearButton.classList.remove('hidden');
    searchIcon.classList.add('hidden');
  } else {
    clearButton.classList.add('hidden');
    searchIcon.classList.remove('hidden');
  }

  let timer;

  input.addEventListener('input', event => {
    const value = event.target.value.trim();
    clearTimeout(timer);
    timer = setTimeout(() => {
      setValue(value);
    }, debounceTime);
    clearButton.classList.toggle('hidden', !value);
    searchIcon.classList.toggle('hidden', !!value);
  });

  clearButton.addEventListener('click', () => {
    input.value = '';
    clearButton.classList.add('hidden');
    searchIcon.classList.remove('hidden');
    setValue('');
    input.focus();
  });

  // Observer value attribute changes
  const observer = new MutationObserver(() => {
    const value = (input.getAttribute('value') || '').trim();
    input.value = value;
    setValue(value);
    clearButton.classList.toggle('hidden', !value);
    searchIcon.classList.toggle('hidden', !!value);
  });
  observer.observe(input, {
    attributes: true,
    attributeFilter: ['value'],
  });
}

export default initSearchField;
