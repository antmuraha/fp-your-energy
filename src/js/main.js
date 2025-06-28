import client from './api/client';
import FlatStateManager from './FlatStateManager';
import HashtagManager from './HashtagManager';
import renderFilterList from './renders/render_filter_list';

const hashtagManager = new HashtagManager();

const store = new FlatStateManager({
  loading: false,
  // Selected group for exercises
  selectedGroup: 'Muscles',

  // Filters
  filtersPage: 1,
  filtersPerPage: 12,
  filtersTotalPages: null,
  filters: [],

  // Exercises
  exercises: [],

  // Favorites
  showFavorites: hashtagManager.isActive('#favorites'),
});

const mainUnsubscribe = hashtagManager.subscribe('main', hash => {
  console.log('Main hash changed:', hash);

  const mapActions = {
    '#favorites': () => store.setState('showFavorites', true),
    '': () => store.setState('showFavorites', false),
  };

  try {
    mapActions[hash]();
  } catch (error) {
    console.error('Not implemented action for hash:', hash);
  }
});

store.subscribe('showFavorites', (showFavorites, state) => {
  console.log('Show favorites state changed:', showFavorites);
  const favoritesContent = document.querySelector('#favorites-content');
  if (showFavorites) {
    favoritesContent.classList.remove('hidden');
  } else {
    favoritesContent.classList.add('hidden');
  }
});

// .exercises-groups-filter
const exercisesGroupsFilter = document.querySelector(
  '.exercises-groups-filter'
);

exercisesGroupsFilter.addEventListener('click', e => {
  if (e.target.dataset.group) {
    const group = e.target.dataset.group;
    console.log('Selected category:', group);
    store.setState('selectedGroup', group);
  }
});

function filtersGetDataKey(perPage, page, group) {
  return `${perPage}-${page}-${group}`;
}

store.subscribe('selectedGroup', async (selectedGroup, state) => {
  console.log('Selected category changed:', selectedGroup);

  const currentKey = filtersGetDataKey(
    state.filtersPerPage,
    state.filtersPage,
    selectedGroup
  );
  const isExist = state.filters.some(item => item._key === currentKey);
  if (isExist) {
    console.log('Filters already loaded for this group:', selectedGroup, state.filters);
    // No need to fetch again, just update the state for rendering
    store.setState('filters', [...state.filters]);
    return;
  }

  const response = await client.getFilters(selectedGroup);
  console.log('Filters data:', selectedGroup, response, state);

  if (response.isError) {
    console.error('Error fetching filters:', response.error);
    return;
  }

  const { results, page, perPage, totalPages } = response.data;

  store.setState('filters', [
    ...state.filters,
    ...results.map(item => ({
      ...item,
      _key: filtersGetDataKey(perPage, page, selectedGroup),
    })),
  ]);
});

store.subscribe('filters', (filters, state) => {
  const { filtersPerPage, filtersPage, selectedGroup } = state;

  const list = filters.filter(
    item =>
      item._key ===
      filtersGetDataKey(filtersPerPage, filtersPage, selectedGroup)
  );

  console.log('Filters list:', list);
  renderFilterList(list);
});
