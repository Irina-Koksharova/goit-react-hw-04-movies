import { Link } from 'react-router-dom';
import s from './MoviesList.module.css';
import defaultFoto from '../../images/error.jpg';

const MoviesList = ({ movies }) => {
  const imageURL = 'https://image.tmdb.org/t/p/w400';

  const dateConversion = name => {
    if (!name) {
      return;
    }
    return ` (${name.slice(0, 4)})`;
  };

  return (
    <ul className={s.list}>
      {movies.map(
        ({
          id,
          original_title,
          original_name,
          poster_path,
          release_date,
          first_air_date,
        }) => (
          <li className={s.item} key={id}>
            <Link className={s.link} to={`/movies/${id}`}>
              <div className={s.containerImage}>
                <img
                  className={s.image}
                  src={poster_path ? imageURL + poster_path : defaultFoto}
                  alt={original_title ?? original_name}
                />
              </div>
              <div className={s.containerTitle}>
                <p className={s.title}>
                  {original_title
                    ? original_title + dateConversion(release_date)
                    : original_name + dateConversion(first_air_date)}
                </p>
              </div>
            </Link>
          </li>
        ),
      )}
    </ul>
  );
};

export default MoviesList;
