import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SearchBar from '../../components/SearchBar';
import MoviesList from '../../components/MoviesList';
import { fetchSearchingShow } from '../../services/api-movies';

const TVPage = () => {
  const [query, setQuery] = useState(null);
  const location = useLocation();
  const queryUrl = new URLSearchParams(location.search).get('query') ?? '';

  useEffect(() => {
    if (queryUrl === '') {
      return;
    }
    fetchSearchingShow('tv', queryUrl).then(({ results }) => setQuery(results));
    return () => setQuery(null);
  }, [queryUrl]);

  const onFormSubmit = query => {
    fetchSearchingShow('tv', query).then(({ results }) => setQuery(results));
  };

  return (
    <>
      <SearchBar onSubmit={onFormSubmit} />
      {query && <MoviesList movies={query} />}
    </>
  );
};

export default TVPage;
