import FlatStateManager from './FlatStateManager';
import HashtagManager from './HashtagManager';

const hashtagManager = new HashtagManager();

const store = new FlatStateManager({
  loading: false,
  filters: [],
  categories: [],
  selectedCategory: null,
  page: 1,
  showFavorites: hashtagManager.isActive('#favorites'),
  exerciseGroups: [],
  exercises: [],
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
