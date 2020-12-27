import s from './FilmCard.module.css';
import { getGenresNames } from '../../services/getGenresNames';
import { genres } from '../../services/genres';

const FilmCard = ({ movies }) => {
  const genre_ids = [99, 35, 16, 18, 80];

  return (
    <>
      <img className={s.image} src={movies.poster_path} alt={movies.title} />
      <h2 className={s.titleMain}>{movies.title}</h2>
      <h3 className={s.title}>Overview</h3>
      <p className={s.text}>{movies.overview}</p>
      <h3 className={s.title}>Genres</h3>
      <p>{getGenresNames(genre_ids, genres)}</p>
    </>
  );
};

export default FilmCard;
