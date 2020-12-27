const KEY = '4e322550b5c9960e34a834ce1dfdbedc';
const URL = `https://api.themoviedb.org/3/trending/movie/day?api_key=${KEY}`;

const fetchMovies = () => {
  return fetch(URL).then(response => response.json());
};

export { fetchMovies };
