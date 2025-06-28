import renderCardFilter from './render_card_filter';

function renderFilterList(data) {
  const filterList = document.querySelector('.exercises-filters');

  data.forEach((item, idx) => {
    const { filter, imgURL, name } = item;
    if (filterList.children[idx]) {
      renderCardFilter(filterList.children[idx], {
        filter: name,
        image: imgURL,
        group: filter,
      });
    } else {
      const filterItem = document.createElement('load');
      filterItem.setAttribute('src', 'partials/exercises/card-filter.html');
      filterItem.setAttribute('group', filter.group);
      filterItem.setAttribute('filter', filter.filter);
      filterItem.setAttribute('image', filter.image);
      filterList.appendChild(filterItem);
    }
  });
}

export default renderFilterList;
