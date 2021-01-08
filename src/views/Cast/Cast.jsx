import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import s from './Cast.module.css';
import { fetchCast } from '../../services/api-movies';
import { scrollElement } from '../../services/scroll';
import TitleEditionalInfo from '../../components/TitleEditionalInfo';
import ActorCard from '../../components/ActorCard';

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
          <TitleEditionalInfo title={title} movie={movie} />
          <ul className={s.container}>
            {cast.map(({ id, profile_path, original_name, character }) => (
              <li className={s.item} key={id}>
                <ActorCard
                  image={profile_path}
                  name={original_name}
                  character={character}
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default Cast;
