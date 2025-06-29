import { api } from './rest-client';
import sendStateChanges from '../unitls/send_state_changes';
import localFavorites from '../local_favorites';

const getFilters = async (group, page = 1, limit = 12) => {
  // Get Filters for Exercises by Group
  return api.get(`/filters`, {
    query: {
      filter: group,
      page,
      limit,
    },
  });
};

const getQuoteOfDay = async () => {
  // Get Quote of the Day
  return api.get('/quote');
};

const getExercises = async (query = {}) => {
  // Get Exercises By Filters
  return api.get('/exercises', {
    query: {
      bodypart: query.bodypart,
      muscles: query.muscles,
      equipment: query.equipment,
      keyword: query.keyword,
      page: query.page || 1,
      limit: query.limit || 10,
    },
  });
};

const addExerciseRating = async (id, query) => {
  // Add Exercise's Rating
  return api.patch(`/exercises/${id}/rating`, {
    body: {
      rate: query.rate,
      email: query.email,
      review: query.review,
    },
  });
};

const getExerciseById = async id => {
  // Get Exercise By Id
  return api.get(`/exercises/${id}`);
};

const subscribe = async email => {
  // Subscribe
  return api.post('/subscription', {
    body: { email },
  });
};

const addToFavorites = async id => {
  // // Add Exercise to Favorites
  const item = await getExerciseById(id);

  localFavorites.set([...localFavorites.get(), item.data]);
  const favorites = localFavorites.get();
  sendStateChanges('favorites', favorites);
};

const removeFromFavorites = async id => {
  // Remove Exercise from Favorites
  const favorites = localFavorites.get().filter(item => item._id !== id);
  localFavorites.set(favorites);
  sendStateChanges('favorites', favorites);
};

export default {
  getFilters,
  getQuoteOfDay,
  getExercises,
  addExerciseRating,
  getExerciseById,
  subscribe,
  addToFavorites,
  removeFromFavorites,
};
