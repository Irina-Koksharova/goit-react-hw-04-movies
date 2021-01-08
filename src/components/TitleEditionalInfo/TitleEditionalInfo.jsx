import s from './TitleEditionalInfo.module.css';

const TitleEditionalInfo = ({ title, movie }) => {
  return (
    <h2 className={s.title} id={movie.id}>{`${title} of "${
      movie.title ?? movie.original_name
    }"`}</h2>
  );
};

export default TitleEditionalInfo;
