const KEY = '4e322550b5c9960e34a834ce1dfdbedc';

const fetchTrendingMovies = () => {
  const TrendingURL = `https://api.themoviedb.org/3/trending/movie/day?api_key=${KEY}`;
  return fetch(TrendingURL).then(response => response.json());
};

const fetchSelectedMovies = id => {
  const SelectedMovieURL = `https://api.themoviedb.org/3/movie/${id}?api_key=${KEY}&language=en-US`;
  return fetch(SelectedMovieURL).then(response => response.json());
};

const fetchSearchingMovie = searchQuery => {
  const searchingMovieURL = `https://api.themoviedb.org/3/search/movie?api_key=${KEY}&language=en-US&query=${searchQuery}&page=1&include_adult=false`;
  return fetch(searchingMovieURL).then(response => response.json());
};

const fetchCast = id => {
  const castSelectedMovieURL = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${KEY}&language=en-US`;
  // https://api.themoviedb.org/3/movie/10588/credits?api_key=4e322550b5c9960e34a834ce1dfdbedc&language=en-US
  return fetch(castSelectedMovieURL).then(response => response.json());
};

export {
  fetchTrendingMovies,
  fetchSelectedMovies,
  fetchSearchingMovie,
  fetchCast,
};
