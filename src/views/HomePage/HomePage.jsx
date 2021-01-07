import { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import s from './HomePage.module.css';
import { fetchTrendingShow } from '../../services/api-movies';
import { scrollTo } from '../../services/scroll';
import { options } from '../../data/selector-data';
import SortSelector from '../../components/SortSelector';
import MoviesList from '../../components/MoviesList';
import PaginationElement from '../../components/PaginationElement';

const HomePage = () => {
  const [trendingList, setTrendingList] = useState(null);
  const [totalPages, setTotalPages] = useState(null);
  const [page, setPage] = useState(1);
  const history = useHistory();
  const location = useLocation();
  const currentSelector =
    new URLSearchParams(location.search).get('selected') ?? options[0];

  useEffect(() => {
    if (location.search === '') {
      history.push({
        ...location,
        search: `selected=${options[0]}`,
      });
    }
    fetchTrendingShow(currentSelector.slice(0, 5), page).then(
      ({ results, total_pages }) => {
        setTrendingList(results);
        setTotalPages(total_pages);
      },
    );
    scrollTo();
    return () => {
      setTrendingList(null);
      setTotalPages(null);
    };
  }, [currentSelector, history, location, page]);

  const onChangeSelector = e => {
    history.push({
      ...location,
      search: `selected=${e.target.value}`,
    });
    setPage(1);
  };

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
      {trendingList && <MoviesList movies={trendingList} />}
      {totalPages && (
        <PaginationElement
          count={totalPages}
          page={page}
          onChange={value => setPage(value)}
        />
      )}
    </>
  );
};

export default HomePage;
