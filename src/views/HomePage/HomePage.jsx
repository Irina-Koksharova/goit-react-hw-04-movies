import { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useQuery } from 'react-query';
import s from './HomePage.module.css';
import { fetchTrendingShow } from '../../services/api-movies';
import { scrollTo } from '../../services/scroll';
import { options } from '../../data/selector-data';
import SortSelector from '../../components/SortSelector';
import MoviesList from '../../components/MoviesList';
import PaginationElement from '../../components/PaginationElement';
import Spinner from '../../components/Loader';

const HomePage = () => {
  const [page, setPage] = useState(1);
  const history = useHistory();
  const location = useLocation();
  const currentSelector =
    new URLSearchParams(location.search).get('selected') ?? options[0];
  const currentPage = new URLSearchParams(location.search).get('page') ?? page;

  useEffect(() => {
    setPage(Number(currentPage));
    if (location.search === '') {
      history.push({
        ...location,
        search: `selected=${options[0]}&page=${page}`,
      });
    }
  }, [currentPage, history, location, page]);

  const { isLoading, isError, isSuccess, error, data } = useQuery(
    ['movies', currentSelector, page],
    () => fetchTrendingShow(currentSelector.slice(0, 5), page),
    { keepPreviousData: true },
  );

  const onChangeSelector = e => {
    history.push({
      ...location,
      search: `selected=${e.target.value}&page=1`,
    });
    setPage(Number(currentPage));
  };

  const onChangePage = value => {
    setPage(value);
    history.push({
      ...location,
      search: `selected=${new URLSearchParams(location.search).get(
        'selected',
      )}&page=${value}`,
    });
  };

  if (isLoading) return <Spinner />;
  if (isError) return <h1>{error}</h1>;
  if (isSuccess) {
    scrollTo();
    return (
      <>
        <h2 className={s.title} id="title">
          Trending today
        </h2>
        <SortSelector
          options={options}
          value={currentSelector}
          onChange={onChangeSelector}
        />
        {data.results && <MoviesList movies={data.results} />}
        {data.total_pages && (
          <PaginationElement
            count={data.total_pages}
            page={page}
            onChange={onChangePage}
          />
        )}
      </>
    );
  }
};
export default HomePage;
