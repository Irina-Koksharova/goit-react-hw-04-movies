import { useState, useEffect } from 'react';
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import { useQuery } from 'react-query';
import s from './Reviews.module.css';
import { fetchReviews } from '../../services/api-movies';
import { scrollElement, scrollToParams } from '../../services/scroll';
import {
  noReviews,
  showNotification,
  serverError,
} from '../../services/notification/notification';
import Section from '../../components/Section';
import TitleEditionalInfo from '../../components/TitleEditionalInfo';
import ReviewsCard from '../../components/ReviewsCard';
import ButtonSmall from '../../components/ButtonSmall';
import ButtonGoBack from '../../components/ButtonGoBack';
import Spinner from '../../components/Loader';
import Notification from '../../components/Notification';

const Reviews = ({ sectionTitle, movie }) => {
  const [reviewsLength, setReviewsLength] = useState(null);
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
    ['reviews', getPath(title), id],
    () => fetchReviews(getPath(title), id),
  );

  useEffect(() => {
    if (data) {
      scrollToParams();
      const content = data.results
        .map(({ author, content }) => author + content)
        .join('').length;
      if (content === 0) {
        showNotification(noReviews);
        history.push(location?.state?.from?.location ?? '/');
      } else {
        setReviewsLength(content);
      }
    }
  }, [data, history, location?.state?.from?.location]);

  const onButtonClick = e => {
    switch (buttonName) {
      case 'Show more':
        e.target.previousSibling.style.display = 'inline-block';
        setButtonName('Hide');
        scrollElement(movie.id);
        break;
      case 'Hide':
        e.target.previousSibling.style.display = '-webkit-box';
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
        {data.results.length > 0 && (
          <>
            <TitleEditionalInfo title={sectionTitle} movie={movie} />
            <ul className={s.container}>
              {data.results.map(({ id, author, content }) => (
                <li key={id}>
                  <ReviewsCard author={author} content={content} />
                </li>
              ))}
            </ul>
            {reviewsLength > 2000 && (
              <ButtonSmall name={buttonName} onClick={onButtonClick} />
            )}
            <div className={s.buttonContainer}>
              <ButtonGoBack
                name={`<< back to ${getButtonName()}`}
                onClick={onButtonGoBackClick}
              />
            </div>
          </>
        )}
      </Section>
    );
  }
};

export default Reviews;
