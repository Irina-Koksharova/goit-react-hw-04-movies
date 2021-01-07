import PropTypes from 'prop-types';
import s from './ButtonLarge.module.css';

const Button = ({ children }) => {
  return (
    <button className={s.button} type="submit">
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.any.isRequired,
};

export default Button;
