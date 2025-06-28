// For src/partials/exercises/card-filter.html

function renderCardFilter(element, { group, filter, image }) {
  const templates = document.querySelector('#templates');
  const template = templates.querySelector('.exercises-card-filter');

  let backgroundTemplate = template?.getAttribute('style');
  backgroundTemplate = backgroundTemplate.replace('{=$image}', `'${image}'`);
  element.setAttribute('style', backgroundTemplate);
  element.querySelector('h3').textContent = filter;
  element.querySelector('h3').setAttribute('data-filter', filter);
  element.querySelector('div').textContent = group;
  element.querySelector('div').setAttribute('data-group', group);
}

export default renderCardFilter;
