import { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import s from './HomePage.module.css';
import { fetchTrendingShow } from '../../services/api-movies';
import SortSelector from '../../components/SortSelector';
import MoviesList from '../../components/MoviesList';
import { options } from '../../data/selector-data';

const HomePage = () => {
  const [trendingList, setTrendingList] = useState(null);
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
    fetchTrendingShow(currentSelector).then(({ results }) =>
      setTrendingList(results),
    );
  }, [currentSelector, history, location]);

  const onChangeSelector = e => {
    history.push({
      ...location,
      search: `selected=${e.target.value}`,
    });
  };

  return (
    <>
      <h2 className={s.title}>Trending today</h2>
      <SortSelector
        options={options}
        value={currentSelector}
        onChange={onChangeSelector}
      />
      {trendingList && <MoviesList movies={trendingList} />}
    </>
  );
};

export default HomePage;
