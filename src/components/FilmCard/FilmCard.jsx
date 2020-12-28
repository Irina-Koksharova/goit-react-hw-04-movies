import s from './FilmCard.module.css';
import { getGenresNames } from '../../services/getGenresNames';

const FilmCard = ({ movie }) => {
  const imageURL = 'https://image.tmdb.org/t/p/w400';
  console.log(movie);

  return (
    <>
      <div className={s.container}>
        <div className={s.containerImage}>
          <img
            className={s.image}
            src={imageURL + movie.poster_path}
            alt={movie.title}
          />
        </div>
        <div>
          <h2>{movie.title + ` (${movie.release_date.slice(0, 4)})`}</h2>
          <h3>{`User score: ${Math.round(movie.vote_average)}%`}</h3>
          <h3>Overview</h3>
          <p>{movie.overview}</p>
          <h3>Genres</h3>
          <p>{getGenresNames(movie.genres)}</p>
          <h3>Editional information</h3>
          <ul>
            <li>
              <a href="/">Cast</a>
            </li>
            <li>
              <a href="/">Reviews</a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default FilmCard;
