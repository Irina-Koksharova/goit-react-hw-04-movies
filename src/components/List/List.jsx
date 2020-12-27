import s from './List.module.css';

const List = ({ movies }) => {
  return (
    <ul>
      {movies.map(({ id, title }) => (
        <li key={id}>
          <a className={s.link} href="/">
            {title}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default List;
