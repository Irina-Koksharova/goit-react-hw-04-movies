import s from './ButtonSmall.module.css';

const ButtonSmall = ({ name, onClick }) => {
  return (
    <button className={s.button} type="button" onClick={onClick}>
      {name}
    </button>
  );
};

export default ButtonSmall;
