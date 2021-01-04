import { useState, useEffect } from 'react';
import s from './Cast.module.css';
import { fetchCast } from '../../services/api-movies';
import defaultFoto from '../../images/error.jpg';

const Cast = ({ title, movie }) => {
  const [cast, setCast] = useState(null);
  const imageURL = 'https://image.tmdb.org/t/p/w400';

  useEffect(() => {
    if (!movie) {
      return;
    }
    fetchCast(movie.id).then(({ cast }) => setCast(cast));
  }, [movie]);

  return (
    <>
      {cast && (
        <div className={s.section}>
          <h2 className={s.title}>{`${title} of "${movie.title}"`}</h2>
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
                <p
                  className={s.text}
                >{`Character: ${character} / ${movie.title}`}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default Cast;
