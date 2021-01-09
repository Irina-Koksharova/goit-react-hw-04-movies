const KEY = '4e322550b5c9960e34a834ce1dfdbedc';

const fetchTrendingShow = (selector, page) => {
  const TrendingURL = `https://api.themoviedb.org/3/trending/${selector}/day?api_key=${KEY}&page=${page}`;
  return fetch(TrendingURL).then(response).then(json);
};

const fetchSelectedShow = (kind, id) => {
  const SelectedMovieURL = `https://api.themoviedb.org/3/${kind}/${id}?api_key=${KEY}&language=en-US`;
  return fetch(SelectedMovieURL).then(response => response.json());
};

const fetchSearchingShow = (kind, searchQuery, page) => {
  const searchingShowURL = `https://api.themoviedb.org/3/search/${kind}?api_key=${KEY}&language=en-US&query=${searchQuery}&page=${page}&include_adult=false`;
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

function response(response) {
  if (response.status !== 200) {
    return Promise.reject(new Error('Network response was not ok'));
  }
  return Promise.resolve(response);
}

function json(response) {
  return response.json();
}

export {
  fetchTrendingShow,
  fetchSelectedShow,
  fetchSearchingShow,
  fetchCast,
  fetchReviews,
};
