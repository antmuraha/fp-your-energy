// For src/partials/exercises/card-filter.html

function renderCardFilter(element, { group, filter, image }) {
  const templates = document.querySelector('#templates'); // <template> container
  const template = templates.content.querySelector('.exercises-card-filter');

  let backgroundTemplate = template?.getAttribute('style');
  backgroundTemplate = backgroundTemplate.replace('{=$image}', `${image}`);

  if (element) {
    element.setAttribute('style', backgroundTemplate);
    element.querySelector('h3').textContent = capitalizeFirstLetter(filter);
    element.querySelector('h3').setAttribute('data-filter', filter);
    element.querySelector('div').textContent = group;
    element.querySelector('div').setAttribute('data-group', group);
  } else {
    const newElement = template.cloneNode(true);
    newElement.setAttribute('style', backgroundTemplate);
    newElement.querySelector('h3').textContent = capitalizeFirstLetter(filter);
    newElement.querySelector('h3').setAttribute('data-filter', filter);
    newElement.querySelector('div').textContent = group;
    newElement.querySelector('div').setAttribute('data-group', group);

    return newElement;
  }
}

function capitalizeFirstLetter(string) {
  if (typeof string === 'string') {
    return `${string.charAt(0).toUpperCase()}${string.slice(1)}`;
  } else {
    return string;
  }
}

export default renderCardFilter;
