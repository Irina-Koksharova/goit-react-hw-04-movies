import PropTypes from 'prop-types';
import s from './TitleEditionalInfo.module.css';

const TitleEditionalInfo = ({ title, movie }) => {
  return (
    <h2 className={s.title} id={movie.id}>{`${title} of "${
      movie.title ?? movie.original_name
    }"`}</h2>
  );
};

TitleEditionalInfo.propTypes = {
  title: PropTypes.string.isRequired,
  movie: PropTypes.object.isRequired,
};

export default TitleEditionalInfo;
