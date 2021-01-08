import { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { fetchSearchingShow } from '../../services/api-movies';
import { scrollTo } from '../../services/scroll';
import SearchBar from '../../components/SearchBar';
import MoviesList from '../../components/MoviesList';
import PaginationElement from '../../components/PaginationElement';

const MoviesPage = () => {
  const [query, setQuery] = useState(null);
  const [totalPages, setTotalPages] = useState(null);
  const [page, setPage] = useState(1);
  const history = useHistory();
  const location = useLocation();
  const queryUrl = new URLSearchParams(location.search).get('query') ?? '';
  const currentPage = new URLSearchParams(location.search).get('page') ?? page;

  useEffect(() => {
    if (queryUrl === '') {
      return;
    }
    setPage(Number(currentPage));
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
  }, [currentPage, location.pathname, page, queryUrl]);

  const onFormSubmit = query => {
    fetchSearchingShow(
      location.pathname.slice(1, 6),
      query,
    ).then(({ results }) => setQuery(results));
    setPage(1);
  };

  const onChangePage = value => {
    setPage(value);
    history.push({
      ...location,
      search: `query=${new URLSearchParams(location.search).get(
        'query',
      )}&page=${value}`,
    });
  };

  return (
    <>
      <SearchBar onSubmit={onFormSubmit} />
      {query && <MoviesList movies={query} />}
      {totalPages && (
        <PaginationElement
          count={totalPages}
          page={page}
          onChange={onChangePage}
        />
      )}
    </>
  );
};

export default MoviesPage;
