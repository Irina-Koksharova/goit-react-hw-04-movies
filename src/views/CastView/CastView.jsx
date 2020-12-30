import { useState, useEffect } from 'react';
import s from './CastView.module.css';
import { fetchCast } from '../../services/api-movies';
import defaultFoto from '../../error.jpg';

const CastView = ({ title, id }) => {
  const [cast, setCast] = useState(null);
  const imageURL = 'https://image.tmdb.org/t/p/w400';

  useEffect(() => {
    fetchCast(id).then(response => setCast(response.cast));
  }, [id]);

  return (
    <>
      <h4>{title}</h4>
      {cast && (
        <ul>
          {cast.map(actor => (
            <li key={actor.id}>
              <img
                src={
                  actor.profile_path
                    ? imageURL + actor.profile_path
                    : defaultFoto
                }
                alt={actor.original_name}
              />
              <p>{actor.original_name}</p>
              <p>{`Character: ${actor.character}`}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default CastView;
