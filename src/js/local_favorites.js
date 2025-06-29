const localStorageKey = 'favorites';

function getLocalFavorites() {
  // Get Favorites from Local Storage
  const favorites = localStorage.getItem(localStorageKey);
  if (favorites) {
    try {
      return JSON.parse(favorites);
    } catch (error) {
      console.error('Error parsing favorites from local storage:', error);
      return [];
    }
  }
  return [];
}

function setLocalFavorites(list) {
  // Set Favorites to Local Storage
  if (!Array.isArray(list)) {
    console.error('Invalid data type for favorites. Expected an array.');
    return;
  }

  // deduplicate the list
  const uniqueList = Array.from(new Set(list.map(item => item._id))).map(id => list.find(item => item._id === id));

  try {
    localStorage.setItem(localStorageKey, JSON.stringify(uniqueList));
  } catch (error) {
    console.error('Error saving favorites to local storage:', error);
  }
}

const localFavorites = {
  get: getLocalFavorites,
  set: setLocalFavorites,
};
export default localFavorites;
