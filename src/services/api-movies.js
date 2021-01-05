const KEY = '4e322550b5c9960e34a834ce1dfdbedc';

const fetchTrendingShow = selector => {
  const TrendingURL = `https://api.themoviedb.org/3/trending/${selector}/day?api_key=${KEY}`;
  return fetch(TrendingURL).then(response => response.json());
};

const fetchSelectedShow = (kind, id) => {
  const SelectedMovieURL = `https://api.themoviedb.org/3/${kind}/${id}?api_key=${KEY}&language=en-US`;
  return fetch(SelectedMovieURL).then(response => response.json());
};

const fetchSearchingShow = (kind, searchQuery) => {
  const searchingShowURL = `https://api.themoviedb.org/3/search/${kind}?api_key=${KEY}&language=en-US&query=${searchQuery}&page=1&include_adult=false`;
  return fetch(searchingShowURL).then(response => response.json());
};

const fetchCast = (kind, id) => {
  const castSelectedMovieURL = `https://api.themoviedb.org/3/${kind}/${id}/credits?api_key=${KEY}&language=en-US`;
  return fetch(castSelectedMovieURL).then(response => response.json());
};

const fetchReviews = (kind, id) => {
  const reviewsSelectedMovieURL = `https://api.themoviedb.org/3/${kind}/${id}/reviews?api_key=${KEY}&language=en-US&page=1`;
  return fetch(reviewsSelectedMovieURL).then(response => response.json());
};

export {
  fetchTrendingShow,
  fetchSelectedShow,
  fetchSearchingShow,
  fetchCast,
  fetchReviews,
};
