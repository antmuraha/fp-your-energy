import client from './api/client';
import { ExercisesConstants } from './api/constans';
import FlatStateManager from './FlatStateManager';
import HashtagManager from './HashtagManager';
import localFavorites from './local_favorites';
import { Messages } from './messages';
import renderExercisesList from './renders/render-exercises-list';
import renderFavoritesList from './renders/render_favorites_list';
import renderFilterList from './renders/render_filter_list';
import renderPaginationButtons from './renders/render_pagination_buttons';
import getParentId from './unitls/find_parent_id';

const hashtagManager = new HashtagManager();

const store = new FlatStateManager({
  loading: false,
  // Selected group for exercises
  selectedGroup: 'Muscles',
  selectedFilter: null,

  // Filters
  filtersPage: 1,
  filtersPerPage: 12,
  filtersTotalPages: null,
  filters: [],

  // Exercises
  exercises: [],
  exercisesPage: 1,
  exercisesPerPage: 10,
  exercisesTotalPages: null,

  // Favorites
  showFavorites: hashtagManager.isActive('#favorites'),
  favorites: localFavorites.get() || [],
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
  const main = document.querySelector('main');
  if (showFavorites) {
    main?.classList.add('hidden');
    favoritesContent.classList.remove('hidden');
    favoritesContent.style.setProperty('--height', `${window.innerHeight}px`);
  } else {
    main?.classList.remove('hidden');
    favoritesContent.classList.add('hidden');
  }
});

const exercisesGroupsFilter = document.querySelector('.tabs-controls');

exercisesGroupsFilter.addEventListener('click', e => {
  if (e.target.dataset.group) {
    exercisesGroupsFilter?.querySelector('.active')?.classList.remove('active');
    e.target.classList.add('active');
    const group = e.target.dataset.group;
    console.log('Selected category:', group);
    store.setState('selectedGroup', group);
    store.setState('selectedFilter', null);
  }
});

function filtersGetDataKey(perPage, page, group) {
  return `${perPage}-${page}-${group}`;
}

let filtersUpdating = false;
async function updateFilters(state) {
  if (filtersUpdating) {
    console.log('Filters are already being updated, skipping this call');
    return;
  }
  filtersUpdating = true;
  const {selectedGroup} = state;
  console.log('Selected category changed:', selectedGroup);

  const currentKey = filtersGetDataKey(
    state.filtersPerPage,
    state.filtersPage,
    selectedGroup
  );
  const exist = state.filters.find(item => item._key === currentKey);
  if (exist) {
    console.log('Filters already loaded for this group:', selectedGroup, state.filters);
    // No need to fetch again, just update the state for rendering
    store.setState('filters', [...state.filters]);
    store.setState('filtersTotalPages', exist._total);
    filtersUpdating = false;
    return;
  }

  const response = await client.getFilters(selectedGroup, state.filtersPage);
  console.log('Filters data:', selectedGroup, response, state);

  if (response.isError) {
    console.error('Error fetching filters:', response.error);
    filtersUpdating = false;
    return;
  }

  const { results, page, perPage, totalPages } = response.data;

  store.setState('filters', [
    ...state.filters,
    ...results.map(item => ({
      ...item,
      _key: filtersGetDataKey(perPage, page, selectedGroup),
      _total: totalPages,
    })),
  ]);
  store.setState('filtersPerPage', perPage);
  store.setState('filtersTotalPages', totalPages);
  filtersUpdating = false;
};

store.subscribe('selectedGroup', (_, state) => updateFilters(state));
store.subscribe('filtersPage', (_, state) => updateFilters(state));


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
store.subscribe('selectedFilter', (selectedFilter, state) => {
  // If filter is selected, hide the filter list
  if (selectedFilter) {
    renderFilterList(null, selectedFilter);
  }
});

const exercisesFiltersList = document.querySelector('.exercises-filters-list');
exercisesFiltersList?.addEventListener('click', e => {
  if (e.target.classList.contains('exercises-card-filter')) {
    const filter = e.target.querySelector("[data-filter]").dataset.filter;
    console.log('Selected filter:', filter);
    store.setState('selectedFilter', filter);
  }
});

function exerciseGetDataKey(perPage, page, group, filter) {
  return `${perPage}-${page}-${group}-${filter}`;
}

let exercisesUpdating = false;
async function updateExercises(state) {
  if (exercisesUpdating) {
    console.log('Exercises are already being updated, skipping this call');
    return;
  }
  exercisesUpdating = true;
  const {selectedFilter} = state;
  if (!selectedFilter) {
    console.log('No filter selected, skipping exercises fetch');
    exercisesUpdating = false;
    return;
  }

  const currentKey = exerciseGetDataKey(
    state.exercisesPerPage,
    state.exercisesPage,
    state.selectedGroup,
    selectedFilter
  );
  const exist = state.exercises.find(item => item._key === currentKey);
  if (exist) {
    console.log('Exercises already loaded for this filter:', selectedFilter, state.exercises);
    // No need to fetch again, just update the state for rendering
    store.setState('exercises', [...state.exercises]);
    store.setState('exercisesTotalPages', exist._total);
    exercisesUpdating = false;
    return;
  }

  const paramName =
    ExercisesConstants.MAP_GROUPS_TO_QUERY_PARAMS[state.selectedGroup];
  const query = {
    [paramName]: selectedFilter,
    page: state.exercisesPage,
    limit: state.exercisesPerPage,
  };

  client.getExercises(query).then(response => {
    if (response.isError) {
      console.error('Error fetching exercises:', response.error);
      return;
    }
    const { results, page, perPage, totalPages } = response.data;
    console.log('Exercises data:', response.data);
    store.setState('exercises', [
      ...state.exercises,
      ...results.map(item => ({
        ...item,
        _group: state.selectedGroup,
        _key: exerciseGetDataKey(perPage, page, state.selectedGroup, selectedFilter),
        _total: totalPages,
      })),
    ]);
    store.setState('exercisesPerPage', perPage);
    store.setState('exercisesTotalPages', totalPages);
    exercisesUpdating = false;
  });
};

store.subscribe('selectedFilter', (_, state) => updateExercises(state));
store.subscribe('exercisesPage', (_, state) => updateExercises(state));

store.subscribe('exercises', (exercises, state) => {
  const { exercisesPerPage, exercisesPage, selectedGroup, selectedFilter } = state;

  const list = exercises.filter(
    item =>
      item._key ===
      exerciseGetDataKey(exercisesPerPage, exercisesPage, selectedGroup, selectedFilter)
  );

  console.log('Exercises list:', {exercises, list});
  renderExercisesList(list, selectedFilter);
});
store.subscribe('selectedFilter', (selectedFilter, state) => {
  // If filter is not selected, hide the exercises list
  if (!selectedFilter) {
    renderExercisesList(false, selectedFilter);
  }
});

// Favorites
store.subscribe('favorites', (favorites, state) => {
  console.log('Favorites list:', favorites);
  renderFavoritesList(favorites);
});

document.querySelector('.favorites-content-list')?.addEventListener('click', e => {
  if (e.target.classList.contains('delete')) {
    const id = getParentId(e.target);
    client
      .removeFromFavorites(id)
      .then(() => {
        Messages.success('Exercise removed from favorites');
      })
      .catch(error => {
        Messages.error('Failed to remove exercise from favorites');
      });
  }
});

// Pagination
function updatePaginationButtons(state) {
  const { selectedFilter } = state;
  if (!selectedFilter) {
    renderPaginationButtons(state.filtersPage, state.filtersTotalPages);
  } else {
    renderPaginationButtons(state.exercisesPage, state.exercisesTotalPages);
  }
}

store.subscribe('filtersTotalPages', (_, state) => updatePaginationButtons(state));
store.subscribe('filtersPage', (_, state) => updatePaginationButtons(state));
store.subscribe('exercisesTotalPages', (_, state) => updatePaginationButtons(state));
store.subscribe('exercisesPage', (_, state) => updatePaginationButtons(state));
store.subscribe('selectedGroup', (_, state) => updatePaginationButtons(state));
store.subscribe('selectedFilter', (_, state) => updatePaginationButtons(state));

document.querySelector('.page-buttons')?.addEventListener('click', e => {
  const page = e.target.dataset.page;
  if (page) {
    const selectedFilter = store.getState("selectedFilter");
    if (!selectedFilter) {
      store.setState('filtersPage', Number(page));
    } else {
      store.setState('exercisesPage', Number(page));
    }
  }
});