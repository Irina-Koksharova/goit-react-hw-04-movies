import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchSearchingShow } from '../../services/api-movies';
import { scrollTo } from '../../services/scroll';
import SearchBar from '../../components/SearchBar';
import MoviesList from '../../components/MoviesList';
import PaginationElement from '../../components/PaginationElement';

const MoviesPage = () => {
  const [query, setQuery] = useState(null);
  const [totalPages, setTotalPages] = useState(null);
  const [page, setPage] = useState(1);
  const location = useLocation();
  const queryUrl = new URLSearchParams(location.search).get('query') ?? '';

  useEffect(() => {
    if (queryUrl === '') {
      return;
    }
    fetchSearchingShow(location.pathname.slice(1, 6), queryUrl, page).then(
      ({ results, total_pages }) => {
        setQuery(results);
        setTotalPages(total_pages);
      },
    );
    scrollTo();
    return () => {
      setQuery(null);
      setTotalPages(null);
    };
  }, [location.pathname, page, queryUrl]);

  const onFormSubmit = query => {
    fetchSearchingShow(
      location.pathname.slice(1, 6),
      query,
    ).then(({ results }) => setQuery(results));
    setPage(1);
  };

  return (
    <>
      <SearchBar onSubmit={onFormSubmit} />
      {query && <MoviesList movies={query} />}
      {totalPages && (
        <PaginationElement
          count={totalPages}
          page={page}
          onChange={value => {
            setPage(value);
          }}
        />
      )}
    </>
  );
};

export default MoviesPage;
