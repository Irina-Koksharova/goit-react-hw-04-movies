import { useState, useEffect } from 'react';
import { useParams, NavLink, useRouteMatch, Route } from 'react-router-dom';
import s from './MovieDetailsPage.module.css';
import { fetchSelectedShow } from '../../services/api-movies';
import { getGenresNames } from '../../services/getGenresNames';
import { dateConversion } from '../../services/date-conversion';
import { imageURL } from '../../data/url-data';
import { links } from '../../data/editional-info-data';
import Cast from '../Cast';
import Reviews from '../Reviews';
import defaultFoto from '../../images/error.jpg';

const MovieDetailsPage = () => {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const { movieId } = useParams();
  const { url, path } = useRouteMatch();

  useEffect(() => {
    fetchSelectedShow('movie', movieId).then(setSelectedMovie);
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
                `${dateConversion(selectedMovie.release_date)}`}
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
              {links.map(link => (
                <li className={s.item} key={link}>
                  <NavLink
                    className={s.link}
                    activeClassName={s.activeLink}
                    to={`${url}/${link}`}
                    exact
                  >
                    {link}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
      <Route path={`${path}/${links[0]}`}>
        <Cast title={links[0]} movie={selectedMovie} />
      </Route>
      <Route path={`${path}/${links[1]}`}>
        <Reviews title={links[1]} movie={selectedMovie} />
      </Route>
    </>
  );
};

export default MovieDetailsPage;
