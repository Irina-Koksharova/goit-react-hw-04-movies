import s from './CastView.module.css';
import defaultFoto from '../../error.jpg';

const CastView = ({ title, movie, cast }) => {
  const imageURL = 'https://image.tmdb.org/t/p/w400';

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

export default CastView;
