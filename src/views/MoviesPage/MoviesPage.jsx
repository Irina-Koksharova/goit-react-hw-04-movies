import { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useQuery } from 'react-query';
import { fetchSearchingShow } from '../../services/api-movies';
import { scrollTo } from '../../services/scroll';
import {
  clientErrorEmptyQuery,
  serverError,
  showError,
} from '../../services/notification/notification';
import SearchBar from '../../components/SearchBar';
import MoviesList from '../../components/MoviesList';
import PaginationElement from '../../components/PaginationElement';
import Spinner from '../../components/Loader';
import Notification from '../../components/Notification';

const MoviesPage = () => {
  const [page, setPage] = useState(1);
  const history = useHistory();
  const location = useLocation();
  const queryUrl = new URLSearchParams(location.search).get('query') ?? null;
  const currentPage = new URLSearchParams(location.search).get('page') ?? page;

  useEffect(() => {
    if (queryUrl === '') {
      return;
    }
    setPage(Number(currentPage));
  }, [currentPage, queryUrl]);

  const { isLoading, isError, isSuccess, data } = useQuery(
    ['searchMovies', location.pathname, queryUrl, currentPage],
    () =>
      fetchSearchingShow(location.pathname.slice(1, 6), queryUrl, currentPage),
    { enabled: !!queryUrl },
  );

  const onFormSubmit = query => {
    if (query.trim() === '') {
      showError(clientErrorEmptyQuery);
    }
    history.push({
      ...location,
      search: `query=${query.trim()}&page=1`,
    });
  };

  const onChangePage = value => {
    scrollTo();
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
      {isLoading && <Spinner />}
      {isError && <Notification message={serverError} />}
      {isSuccess && (
        <>
          <MoviesList movies={data.results} />
          {data.results.length > 0 && (
            <PaginationElement
              count={data.total_pages}
              page={page}
              onChange={onChangePage}
            />
          )}
        </>
      )}
    </>
  );
};

export default MoviesPage;
