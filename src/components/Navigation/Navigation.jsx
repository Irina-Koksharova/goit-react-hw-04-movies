import { NavLink } from 'react-router-dom';
import s from './Navigation.module.css';
import { navigationLinks } from '../../data/navigation-data';

const Navigation = () => {
  return (
    <nav>
      <ul className={s.list}>
        {navigationLinks.map(({ name, link }) => (
          <li key={name}>
            <NavLink
              exact
              to={link}
              className={s.link}
              activeClassName={s.activeLink}
            >
              {name}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
