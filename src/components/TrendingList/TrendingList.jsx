// import { useState, useEffect } from 'react';
import s from './TrendingList.module.css';
// import { fetchMovies } from '../../services/api-movies';
import List from '../List';

const TrendingList = ({ movies }) => {
  return (
    <>
      <h2 className={s.title}>Trending today</h2>
      <List movies={movies} />
    </>
  );
};

export default TrendingList;
