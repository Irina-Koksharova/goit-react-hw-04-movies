import { useState, useEffect } from 'react';
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import { useQuery } from 'react-query';
import s from './Cast.module.css';
import { fetchCast } from '../../services/api-movies';
import { scrollElement, scrollToParams } from '../../services/scroll';
import { serverError } from '../../services/notification/notification';
import Section from '../../components/Section';
import TitleEditionalInfo from '../../components/TitleEditionalInfo';
import ActorCard from '../../components/ActorCard';
import ButtonSmall from '../../components/ButtonSmall';
import ButtonGoBack from '../../components/ButtonGoBack';
import Spinner from '../../components/Loader';
import Notification from '../../components/Notification';

const Cast = ({ sectionTitle, movie }) => {
  const [buttonName, setButtonName] = useState('Show more');
  const history = useHistory();
  const location = useLocation();
  const { url } = useRouteMatch();
  const { title, id } = movie;

  const getPath = value => {
    return value
      ? location.pathname.slice(1, 6)
      : location.pathname.slice(1, 3);
  };

  const { isLoading, isError, isSuccess, data } = useQuery(
    ['cast', getPath(title), id],
    () => fetchCast(getPath(title), id),
  );

  useEffect(() => {
    if (data) {
      scrollToParams();
    }
  }, [data]);

  const onButtonClick = e => {
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

  if (isLoading) return <Spinner />;
  if (isError) return <Notification message={serverError} />;
  if (isSuccess) {
    return (
      <Section style={{ padding: '25px 0px 0px', textAlign: 'center' }}>
        <TitleEditionalInfo title={sectionTitle} movie={movie} />
        <ul className={s.container}>
          {data.cast.map(({ id, profile_path, original_name, character }) => (
            <li className={s.item} key={id}>
              <ActorCard
                image={profile_path}
                name={original_name}
                character={character}
              />
            </li>
          ))}
        </ul>
        {data.cast.length > 10 && (
          <ButtonSmall name={buttonName} onClick={onButtonClick} />
        )}
        <div className={s.buttonContainer}>
          <ButtonGoBack
            name={`<< back to ${getButtonName()}`}
            onClick={onButtonGoBackClick}
          />
        </div>
      </Section>
    );
  }
};

export default Cast;
