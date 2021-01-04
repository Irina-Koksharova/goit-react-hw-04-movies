import { useState, useEffect } from 'react';
import { useParams, NavLink, useRouteMatch, Route } from 'react-router-dom';
import s from './TVDetailsPage.module.css';
import { fetchSelectedShow } from '../../services/api-movies';
import { getGenresNames } from '../../services/getGenresNames';
import { dateConversion } from '../../services/date-conversion';
import { imageURL } from '../../data/url-data';
import { links } from '../../data/editional-info-data';
import Cast from '../Cast';
import defaultFoto from '../../images/error.jpg';

const TVDetailsPage = () => {
  const [selectedTV, setSelectedTV] = useState(null);
  const { tvId } = useParams();
  const { url, path } = useRouteMatch();
  const { cast, reviews } = links;

  useEffect(() => {
    fetchSelectedShow('tv', tvId).then(setSelectedTV);
  }, [tvId]);

  return (
    <>
      {selectedTV && (
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
              <li className={s.item}>
                <NavLink
                  className={s.link}
                  activeClassName={s.activeLink}
                  to={`${url}/${cast}`}
                  exact
                >
                  {cast}
                </NavLink>
              </li>
              <li className={s.item}>
                <NavLink
                  className={s.link}
                  activeClassName={s.activeLink}
                  to={`${url}/${reviews}`}
                  exact
                >
                  {reviews}
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      )}
      <Route path={`${path}/${cast}`}>
        <Cast title={cast} movie={selectedTV} />
      </Route>
    </>
  );
};

export default TVDetailsPage;
