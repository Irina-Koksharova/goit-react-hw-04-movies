import PropTypes from 'prop-types';
import s from './ButtonSmall.module.css';

const ButtonSmall = ({ name, onClick }) => {
  return (
    <button className={s.button} type="button" onClick={onClick}>
      {name}
    </button>
  );
};

ButtonSmall.propTypes = {
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ButtonSmall;
