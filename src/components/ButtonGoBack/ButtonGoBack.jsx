import s from './ButtonGoBack.module.css';

const ButtonGoBack = ({ name, onClick }) => {
  return (
    <button className={s.button} type="button" onClick={onClick}>
      {name}
    </button>
  );
};

export default ButtonGoBack;
