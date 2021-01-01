import { Link } from 'react-router-dom';
import s from './ListView.module.css';
import defaultFoto from '../../error.jpg';

const ListView = ({ movies }) => {
  const imageURL = 'https://image.tmdb.org/t/p/w400';

  return (
    <ul className={s.list}>
      {movies.map(({ id, title, poster_path, release_date }) => (
        <li className={s.item} key={id}>
          <Link className={s.link} to={`/movies/${id}`}>
            <div className={s.containerImage}>
              <img
                className={s.image}
                src={poster_path ? imageURL + poster_path : defaultFoto}
                alt={title}
              />
            </div>
            <div className={s.containerTitle}>
              <p className={s.title}>
                {title + ` (${release_date.slice(0, 4)})`}
              </p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default ListView;
