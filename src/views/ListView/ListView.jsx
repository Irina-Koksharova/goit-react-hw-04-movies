import { useState } from 'react';
import s from './ListView.module.css';
import { fetchSelectedMovies } from '../../services/api-movies';

const ListView = ({ movies }) => {
  const [selectedMovie, setSelectedMovie] = useState(null);

  const getSelectedMovie = e => {
    e.preventDefault();
    fetchSelectedMovies(e.target.id).then(response =>
      setSelectedMovie(response),
    );
  };

  return (
    <ul>
      {movies.map(({ id, title }) => (
        <li key={id}>
          <a className={s.link} href="/" id={id} onClick={getSelectedMovie}>
            {title}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default ListView;
