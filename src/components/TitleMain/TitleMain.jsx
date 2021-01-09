import s from './TitleMain.module.css';

const TitleMain = ({ title }) => {
  return (
    <h2 className={s.title} id="title">
      {title}
    </h2>
  );
};

export default TitleMain;
