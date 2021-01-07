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
import s from './TVDetailsPage.module.css';
import { fetchSelectedShow } from '../../services/api-movies';
import { getGenresNames } from '../../services/getGenresNames';
import { dateConversion } from '../../services/date-conversion';
import { imageURL } from '../../data/url-data';
import { links } from '../../data/editional-info-data';
import defaultFoto from '../../images/error.jpg';

const Cast = lazy(() => import('../Cast' /* webpackChunkName: "cast-page" */));
const Reviews = lazy(() =>
  import('../Reviews' /* webpackChunkName: "reviews-page" */),
);

const TVDetailsPage = () => {
  const [selectedTV, setSelectedTV] = useState(null);
  const { tvId } = useParams();
  const { url, path } = useRouteMatch();
  const history = useHistory();
  const location = useLocation();
  const [locationFrom, setLocationFrom] = useState(() =>
    location?.state?.from?.location
      ? location?.state?.from?.location
      : url.slice(0, 3),
  );

  useEffect(() => {
    fetchSelectedShow('tv', tvId).then(setSelectedTV);
  }, [tvId]);

  const onGoBack = () => {
    history.push(locationFrom ?? url.slice(0, 3));
  };

  return (
    <>
      {selectedTV && (
        <>
          <button type="button" onClick={onGoBack}>
            {`Go back to ${url.slice(1, 3)} list`}
          </button>
          <div className={s.container}>
            <div className={s.containerImage}>
              <img
                className={s.image}
                src={
                  selectedTV.poster_path
                    ? imageURL + selectedTV.poster_path
                    : defaultFoto
                }
                alt={selectedTV.original_name}
              />
            </div>
            <div>
              <h2 className={s.title}>
                {selectedTV.original_name +
                  ` ${dateConversion(selectedTV.first_air_date)}`}
              </h2>
              <h3 className={s.subtitle}>{`User score: ${
                selectedTV.vote_average * 10
              }%`}</h3>
              <h3 className={s.subtitle}>Overview</h3>
              <p className={s.text}>{selectedTV.overview}</p>
              <h3 className={s.subtitle}>Genres</h3>
              <p className={s.text}>{getGenresNames(selectedTV.genres)}</p>
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
            <Cast title={links[0]} movie={selectedTV} />
          </Route>
          <Route path={`${path}/${links[1]}`}>
            <Reviews title={links[1]} movie={selectedTV} />
          </Route>
        </Switch>
      </Suspense>
    </>
  );
};
export default TVDetailsPage;
