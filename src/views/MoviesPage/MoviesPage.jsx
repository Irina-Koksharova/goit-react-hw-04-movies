import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SearchBar from '../../components/SearchBar';
import MoviesList from '../../components/MoviesList';
import { fetchSearchingShow } from '../../services/api-movies';

const MoviesPage = () => {
  const [query, setQuery] = useState(null);
  const location = useLocation();
  const queryUrl = new URLSearchParams(location.search).get('query') ?? '';

  useEffect(() => {
    if (queryUrl === '') {
      return;
    }
    fetchSearchingShow(location.pathname.slice(1, 6), queryUrl).then(
      ({ results }) => {
        setQuery(results);
      },
    );
    return () => setQuery(null);
  }, [location.pathname, queryUrl]);

  const onFormSubmit = query => {
    fetchSearchingShow(
      location.pathname.slice(1, 6),
      query,
    ).then(({ results }) => setQuery(results));
  };

  return (
    <>
      <SearchBar onSubmit={onFormSubmit} />
      {query && <MoviesList movies={query} />}
    </>
  );
};

export default MoviesPage;
