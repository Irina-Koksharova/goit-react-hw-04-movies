import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import s from './Cast.module.css';
import { fetchCast } from '../../services/api-movies';
import { scrollElement } from '../../services/scroll';
import { imageURL } from '../../data/url-data';
import defaultFoto from '../../images/error.jpg';

const Cast = ({ title, movie }) => {
  const [cast, setCast] = useState(null);
  const location = useLocation();

  useEffect(() => {
    if (!movie) {
      return;
    }
    const { id, title } = movie;
    const getPath = value => {
      return value
        ? location.pathname.slice(1, 6)
        : location.pathname.slice(1, 3);
    };

    fetchCast(getPath(title), id).then(({ cast }) => {
      setCast(cast);
      scrollElement(id);
    });
  }, [location.pathname, movie]);

  return (
    <>
      {cast && (
        <div className={s.section}>
          <h2 className={s.title} id={movie.id}>{`${title} of "${
            movie.title ?? movie.original_name
          }"`}</h2>
          <ul className={s.container}>
            {cast.map(({ id, profile_path, original_name, character }) => (
              <li className={s.item} key={id}>
                <div className={s.imageContainer}>
                  <img
                    className={s.image}
                    src={profile_path ? imageURL + profile_path : defaultFoto}
                    alt={original_name}
                  />
                </div>
                <p className={s.name}>{original_name}</p>
                <p className={s.text}>{`Character: ${character}`}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default Cast;
