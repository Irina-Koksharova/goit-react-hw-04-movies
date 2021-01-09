import s from './Notification.module.css';

const Notification = ({ message }) => {
  return <h1 className={s.notification}>{message}</h1>;
};

export default Notification;
