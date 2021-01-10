import PropTypes from 'prop-types';
import s from './TitleMain.module.css';

const TitleMain = ({ title }) => {
  return (
    <h2 className={s.title} id="title">
      {title}
    </h2>
  );
};

TitleMain.propTypes = {
  title: PropTypes.string.isRequired,
};

export default TitleMain;
