import s from './Navigation.module.css';

const Navigation = () => {
  return (
    <nav>
      <ul className={s.list}>
        <li>
          <a className={s.link} href="/">
            Home
          </a>
        </li>
        <li>
          <a className={s.link} href="/">
            Movies
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
