import renderCardFilter from './render_card_filter';

function renderFilterList(data, selectedFilter) {
  const filterList = document.querySelector('.exercises-filters-list');
  if (selectedFilter) {
    filterList?.classList.add('hidden');
    return;
  }
  filterList?.classList.remove('hidden');

  data.forEach((item, idx) => {
    const { filter, imgURL, name } = item;
    if (filterList.children[idx]) {
      renderCardFilter(filterList.children[idx], {
        filter: name,
        image: imgURL,
        group: filter,
      });
    } else {
      const filterItem = document.createElement('div');
      filterItem.setAttribute('src', imgURL);
      filterItem.setAttribute('group', filter.group);
      filterItem.setAttribute('filter', filter.filter);
      filterItem.setAttribute('image', filter.image);
      filterList.appendChild(filterItem);
    }
  });
}

export default renderFilterList;
