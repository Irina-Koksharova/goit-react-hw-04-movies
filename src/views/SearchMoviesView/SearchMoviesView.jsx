import { useState } from 'react';
import SearchBar from '../SearchBar';
import ListView from '../../views/ListView';
import { fetchSearchingMovie } from '../../services/api-movies';

const SearchMoviesView = () => {
  const [query, setQuery] = useState(null);

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
