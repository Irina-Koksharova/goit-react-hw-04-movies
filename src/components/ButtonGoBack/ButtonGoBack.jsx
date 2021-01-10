import PropTypes from 'prop-types';
import s from './ButtonGoBack.module.css';

const ButtonGoBack = ({ name, onClick }) => {
  return (
    <button className={s.button} type="button" onClick={onClick}>
      {name}
    </button>
  );
};

ButtonGoBack.propTypes = {
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ButtonGoBack;
