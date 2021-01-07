import { useState, useEffect, lazy, Suspense } from 'react';
import {
  useParams,
  NavLink,
  useRouteMatch,
  Route,
  Switch,
  useHistory,
  useLocation,
} from 'react-router-dom';
import s from './MovieDetailsPage.module.css';
import { fetchSelectedShow } from '../../services/api-movies';
import { getGenresNames } from '../../services/getGenresNames';
import { dateConversion } from '../../services/date-conversion';
import { imageURL } from '../../data/url-data';
import { links } from '../../data/editional-info-data';
import ButtonSmall from '../../components/ButtonSmall';
import defaultFoto from '../../images/error.jpg';

const Cast = lazy(() => import('../Cast' /* webpackChunkName: "cast-page" */));
const Reviews = lazy(() =>
  import('../Reviews' /* webpackChunkName: "reviews-page" */),
);

const MovieDetailsPage = () => {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const { movieId } = useParams();
  const { url, path } = useRouteMatch();
  const history = useHistory();
  const location = useLocation();
  const [locationFrom, setLocationFrom] = useState(
    () => location?.state?.from?.location ?? url.slice(0, 7),
  );

  useEffect(() => {
    fetchSelectedShow('movie', movieId).then(setSelectedMovie);
  }, [movieId]);

  const onGoBack = () => {
    history.push(locationFrom);
  };

  return (
    <>
      {selectedMovie && (
        <>
          <ButtonSmall
            name={`<< back to ${url.slice(1, 7)}`}
            onClick={onGoBack}
          />
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
        </>
      )}
      <Suspense fallback={<h1>ЗАГРУЖАЕМ...</h1>}>
        <Switch>
          <Route path={`${path}/${links[0]}`}>
            <Cast title={links[0]} movie={selectedMovie} />
          </Route>
          <Route path={`${path}/${links[1]}`}>
            <Reviews title={links[1]} movie={selectedMovie} />
          </Route>
        </Switch>
      </Suspense>
    </>
  );
};

export default MovieDetailsPage;
