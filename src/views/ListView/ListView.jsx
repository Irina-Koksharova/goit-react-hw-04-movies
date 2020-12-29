import { useState } from 'react';
import s from './ListView.module.css';
import { fetchSelectedMovies } from '../../services/api-movies';

const ListView = ({ movies }) => {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const imageURL = 'https://image.tmdb.org/t/p/w400';

  const getSelectedMovie = e => {
    e.preventDefault();
    fetchSelectedMovies(e.target.id).then(response =>
      setSelectedMovie(response),
    );
  };

  return (
    <ul className={s.list}>
      {movies.map(({ id, title, poster_path, release_date }) => (
        <li className={s.item} key={id}>
          <a className={s.link} href="/" id={id} onClick={getSelectedMovie}>
            <div className={s.containerImage}>
              <img
                className={s.image}
                src={imageURL + poster_path}
                alt={title}
              />
            </div>
            <div className={s.containerTitle}>
              <p className={s.title}>
                {title + ` (${release_date.slice(0, 4)})`}
              </p>
            </div>
          </a>
        </li>
      ))}
    </ul>
  );
};

export default ListView;
