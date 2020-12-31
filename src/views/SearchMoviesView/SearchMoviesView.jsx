import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SearchBar from '../SearchBar';
import ListView from '../../views/ListView';
import { fetchSearchingMovie } from '../../services/api-movies';

const SearchMoviesView = () => {
  const [query, setQuery] = useState('');
  const location = useLocation();
  const queryUrl = new URLSearchParams(location.search).get('query') ?? '';

  useEffect(() => {
    if (queryUrl === '') {
      return;
    }
    fetchSearchingMovie(queryUrl).then(({ results }) => setQuery(results));
  }, [queryUrl]);

  const onFormSubmit = query => {
    fetchSearchingMovie(query).then(({ results }) => setQuery(results));
  };

  return (
    <>
      <SearchBar onSubmit={onFormSubmit} />
      {query && <ListView movies={query} />}
    </>
  );
};

export default SearchMoviesView;
