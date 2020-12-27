const KEY = '4e322550b5c9960e34a834ce1dfdbedc';

const fetchTrendingMovies = () => {
  const TrendingURL = `https://api.themoviedb.org/3/trending/movie/day?api_key=${KEY}`;
  return fetch(TrendingURL).then(response => response.json());
};

const fetchMovies = id => {
  const MovieURL = `https://api.themoviedb.org/3/movie/${id}?api_key=${KEY}&language=en-US`;
  return fetch(MovieURL).then(response => response.json());
};

export { fetchTrendingMovies, fetchMovies };
