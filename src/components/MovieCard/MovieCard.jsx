import PropTypes from 'prop-types';
import { NavLink, useLocation } from 'react-router-dom';
import s from './MovieCard.module.css';
import { imageURL } from '../../data/url-data';
import defaultFoto from '../../images/error.jpg';
import { dateConversion } from '../../services/date-conversion';
import { getGenresNames } from '../../services/getGenresNames';
import { links } from '../../data/editional-info-data';

const MovieCard = ({ movie, url }) => {
  const location = useLocation();
  const {
    poster_path,
    title,
    original_name,
    release_date,
    first_air_date,
    vote_average,
    overview,
    genres,
  } = movie;

  return (
    <div className={s.container}>
      <div className={s.containerImage}>
        <img
          className={s.image}
          src={poster_path ? imageURL + poster_path : defaultFoto}
          alt={title ?? original_name}
        />
      </div>
      <div>
        <h2 className={s.title}>
          {title
            ? title + `${dateConversion(release_date)}`
            : original_name + `${dateConversion(first_air_date)}`}
        </h2>
        <h3 className={s.subtitle}>{`User score: ${vote_average * 10}%`}</h3>
        <h3 className={s.subtitle}>Overview</h3>
        <p className={s.text}>{overview}</p>
        <h3 className={s.subtitle}>Genres</h3>
        <p className={s.text}>{getGenresNames(genres)}</p>
        <h3 className={s.subtitle}>Editional information</h3>
        <ul className={s.list}>
          {links.map(link => (
            <li className={s.item} key={link}>
              <NavLink
                className={s.link}
                activeClassName={s.activeLink}
                to={{
                  pathname: `${url}/${link}`,
                  state: {
                    from: {
                      location,
                    },
                  },
                }}
                exact
              >
                {link}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.object.isRequired,
  url: PropTypes.string.isRequired,
};

export default MovieCard;
