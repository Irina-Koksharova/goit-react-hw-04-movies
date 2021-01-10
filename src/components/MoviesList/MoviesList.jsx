import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import s from './MoviesList.module.css';
import MoviesListItem from '../MoviesListItem';
import {
  clientErrorInvalidQuery,
  showError,
} from '../../services/notification/notification';

const MoviesList = ({ movies }) => {
  const location = useLocation();

  useEffect(() => {
    if (movies.length === 0) {
      showError(clientErrorInvalidQuery);
    }
  }, [movies.length]);

  const getPathName = value => {
    return value ? 'movies' : 'tv';
  };

  return (
    <ul className={s.list}>
      {movies.map(
        ({
          id,
          original_title,
          original_name,
          poster_path,
          release_date,
          first_air_date,
        }) => (
          <li className={s.item} key={id}>
            <Link
              className={s.link}
              to={{
                pathname: `/${getPathName(original_title)}/${id}`,
                state: {
                  from: {
                    location,
                  },
                },
              }}
            >
              <MoviesListItem
                image={poster_path}
                movieTitle={original_title}
                tvTitle={original_name}
                movieReleaseDate={release_date}
                tvReleaseDate={first_air_date}
              />
            </Link>
          </li>
        ),
      )}
    </ul>
  );
};

export default MoviesList;
