import s from './MoviesItem.module.css';
import { imageURL } from '../../data/url-data';
import { dateConversion } from '../../services/date-conversion';
import defaultFoto from '../../images/error.jpg';

const MoviesItem = ({
  image,
  movieTitle,
  tvTitle,
  movieReleaseDate,
  tvReleaseDate,
}) => {
  return (
    <>
      <div className={s.containerImage}>
        <img
          className={s.image}
          src={image ? imageURL + image : defaultFoto}
          alt={movieTitle ?? tvTitle}
        />
      </div>
      <div className={s.containerTitle}>
        <p className={s.title}>
          {movieTitle
            ? movieTitle + dateConversion(movieReleaseDate)
            : tvTitle + dateConversion(tvReleaseDate)}
        </p>
      </div>
    </>
  );
};

export default MoviesItem;
