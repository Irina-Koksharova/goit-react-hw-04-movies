import s from './TrendingList.module.css';

const TrendingList = ({ movies, onSelect }) => {
  return (
    <>
      <h2 className={s.title}>Trending today</h2>
      <ul>
        {movies.map(({ id, title }) => (
          <li key={id}>
            <a className={s.link} href="/" id={id} onClick={onSelect}>
              {title}
            </a>
          </li>
        ))}
      </ul>
    </>
  );
};

export default TrendingList;
