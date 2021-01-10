import PropTypes from 'prop-types';
import s from './Notification.module.css';

const Notification = ({ message }) => {
  return <h1 className={s.notification}>{message}</h1>;
};

Notification.propTypes = {
  message: PropTypes.string.isRequired,
};

export default Notification;
