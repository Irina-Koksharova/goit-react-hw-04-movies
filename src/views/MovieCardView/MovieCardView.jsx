import { useState, useEffect } from 'react';
import { useParams, NavLink, useRouteMatch, Route } from 'react-router-dom';
import s from './MovieCardView.module.css';
import { fetchSelectedMovies } from '../../services/api-movies';
import { getGenresNames } from '../../services/getGenresNames';
import CastView from '../CastView';
import defaultFoto from '../../error.jpg';

const MovieCardView = () => {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const { movieId } = useParams();
  const { url } = useRouteMatch();
  const imageURL = 'https://image.tmdb.org/t/p/w400';
  const links = {
    cast: 'cast',
    reviews: 'reviews',
  };

  useEffect(() => {
    fetchSelectedMovies(movieId).then(setSelectedMovie);
  }, [movieId]);

  return (
    <>
      {selectedMovie && (
        <div className={s.container}>
          <div className={s.containerImage}>
            <img
              className={s.image}
              src={
                selectedMovie.poster_path
                  ? imageURL + selectedMovie.poster_path
                  : defaultFoto
              }
              alt={selectedMovie.title}
            />
          </div>
          <div>
            <h2 className={s.title}>
              {selectedMovie.title +
                ` (${selectedMovie.release_date.slice(0, 4)})`}
            </h2>
            <h3 className={s.subtitle}>{`User score: ${
              selectedMovie.vote_average * 10
            }%`}</h3>
            <h3 className={s.subtitle}>Overview</h3>
            <p className={s.text}>{selectedMovie.overview}</p>
            <h3 className={s.subtitle}>Genres</h3>
            <p className={s.text}>{getGenresNames(selectedMovie.genres)}</p>
            <h3 className={s.subtitle}>Editional information</h3>
            <ul className={s.list}>
              <li>
                <NavLink
                  className={s.link}
                  activeClassName={s.activeLink}
                  to={`${url}/${links.cast}`}
                  exact
                >
                  {links.cast}
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={s.link}
                  activeClassName={s.activeLink}
                  to={`${url}/${links.reviews}`}
                  exact
                >
                  {links.reviews}
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      )}
      <Route path="/movies/:movieId/cast">
        <CastView title={links.cast} movie={selectedMovie} />
      </Route>
    </>
  );
};

export default MovieCardView;
