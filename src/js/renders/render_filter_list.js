import renderCardFilter from './render_card_filter';

// TODO: Refactoring will be needed
const pageSize = 12;

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
      filterList.children[idx].classList.remove('hidden');
      renderCardFilter(filterList.children[idx], {
        filter: name,
        image: imgURL,
        group: filter,
      });
    }
  });

  if (data.length < pageSize) {
    const emptyCount = pageSize - data.length;
    for (let i = 0; i < emptyCount; i++) {
      filterList?.children[i + data.length]?.classList.add('hidden');
    }
  }
}

export default renderFilterList;
