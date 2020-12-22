import s from './TrendingList.module.css';

const TrendingList = () => {
  return (
    <>
      <h2 className={s.title}>Trending today</h2>
      <ul>
        <li>
          <a className={s.link} href="/">
            Film
          </a>
        </li>
        <li>
          <a className={s.link} href="/">
            Film
          </a>
        </li>
        <li>
          <a className={s.link} href="/">
            Film
          </a>
        </li>
      </ul>
    </>
  );
};

export default TrendingList;
