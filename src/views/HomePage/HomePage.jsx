import { useState, useEffect } from 'react';
import s from './HomePage.module.css';
import { fetchTrendingMovies } from '../../services/api-movies';
import SortSelector from '../../components/SortSelector';
import MoviesList from '../../components/MoviesList';
import { options } from '../../data/selector-data';

const HomePage = () => {
  const [selector, setSelector] = useState(options[0]);
  const [trendingList, setTrendingList] = useState(null);

  useEffect(() => {
    fetchTrendingMovies(selector).then(({ results }) =>
      setTrendingList(results),
    );
  }, [selector]);

  return (
    <>
      <h2 className={s.title}>Trending today</h2>
      <SortSelector
        options={options}
        onChange={e => {
          setSelector(e.target.value);
        }}
      />
      {trendingList && <MoviesList movies={trendingList} />}
    </>
  );
};

export default HomePage;
