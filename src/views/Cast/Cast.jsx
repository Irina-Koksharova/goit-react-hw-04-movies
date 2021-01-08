import { useState, useEffect } from 'react';
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import s from './Cast.module.css';
import { fetchCast } from '../../services/api-movies';
import { scrollElement } from '../../services/scroll';
import Section from '../../components/Section';
import TitleEditionalInfo from '../../components/TitleEditionalInfo';
import ActorCard from '../../components/ActorCard';
import ButtonSmall from '../../components/ButtonSmall';
import ButtonGoBack from '../../components/ButtonGoBack';

const Cast = ({ title, movie }) => {
  const [cast, setCast] = useState(null);
  const [buttonName, setButtonName] = useState('Show more');
  const history = useHistory();
  const location = useLocation();
  const { url } = useRouteMatch();

  useEffect(() => {
    if (!movie) {
      return;
    }
    const { id, title } = movie;
    const getPath = value => {
      return value
        ? location.pathname.slice(1, 6)
        : location.pathname.slice(1, 3);
    };

    fetchCast(getPath(title), id).then(({ cast }) => {
      setCast(cast);
      scrollElement(id);
    });
  }, [location.pathname, movie]);

  const onButtonClick = e => {
    console.log(cast.length);
    switch (buttonName) {
      case 'Show more':
        e.target.previousSibling.style.overflow = 'visible';
        e.target.previousSibling.style.height = 'auto';
        setButtonName('Hide');
        scrollElement(movie.id);
        break;
      case 'Hide':
        e.target.previousSibling.style.overflow = 'hidden';
        e.target.previousSibling.style.height = '700px';
        setButtonName('Show more');
        scrollElement(movie.id);
        break;
      default:
        return;
    }
  };

  const onButtonGoBackClick = () => {
    history.push(location?.state?.from?.location ?? '/');
  };

  const getButtonName = () => {
    return movie.title ? url.slice(1, 6) : url.slice(1, 3);
  };

  return (
    <>
      {cast && (
        <Section style={{ padding: '25px 0px 0px', textAlign: 'center' }}>
          <div className={s.buttonContainer} id={movie.id}>
            <ButtonGoBack
              name={`<< back to ${getButtonName()}`}
              onClick={onButtonGoBackClick}
            />
          </div>
          <TitleEditionalInfo title={title} movie={movie} />
          <ul className={s.container}>
            {cast.map(({ id, profile_path, original_name, character }) => (
              <li className={s.item} key={id}>
                <ActorCard
                  image={profile_path}
                  name={original_name}
                  character={character}
                />
              </li>
            ))}
          </ul>
          {cast.length >= 10 && (
            <ButtonSmall name={buttonName} onClick={onButtonClick} />
          )}
          <div className={s.buttonContainer}>
            <ButtonGoBack
              name={`<< back to ${getButtonName()}`}
              onClick={onButtonGoBackClick}
            />
          </div>
        </Section>
      )}
    </>
  );
};

export default Cast;
