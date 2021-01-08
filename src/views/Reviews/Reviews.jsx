import { useState, useEffect } from 'react';
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import s from './Reviews.module.css';
import { fetchReviews } from '../../services/api-movies';
import { scrollElement } from '../../services/scroll';
import TitleEditionalInfo from '../../components/TitleEditionalInfo';
import ReviewsCard from '../../components/ReviewsCard';
import ButtonSmall from '../../components/ButtonSmall';
import ButtonGoBack from '../../components/ButtonGoBack';

const Reviews = ({ title, movie }) => {
  const [reviews, setReviews] = useState(null);
  const [reviewsLength, setReviewsLength] = useState(null);
  const [buttonName, setButtonName] = useState(null);
  const history = useHistory();
  const location = useLocation();
  const { url } = useRouteMatch();

  useEffect(() => {
    if (!movie || reviewsLength) {
      return;
    }
    const { id, title } = movie;
    const getPath = value => {
      return value
        ? location.pathname.slice(1, 6)
        : location.pathname.slice(1, 3);
    };

    fetchReviews(getPath(title), id).then(({ results }) => {
      const content = results
        .map(({ author, content }) => author + content)
        .join('').length;
      setReviewsLength(content);
      setReviews(results);
      scrollElement(id);
    });
  }, [location.pathname, movie, reviewsLength]);

  useEffect(() => {
    if (!reviewsLength) {
      return;
    }
    reviewsLength < 1200 ? setButtonName('Hide') : setButtonName('Show more');
  }, [reviewsLength]);

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

  return (
    <>
      {reviews && (
        <div className={s.section}>
          <ButtonGoBack
            name={`<< back to ${getButtonName()}`}
            onClick={onButtonGoBackClick}
          />
          <TitleEditionalInfo title={title} movie={movie} />
          <ul className={s.container}>
            {reviews.map(({ id, author, content }) => (
              <li className={s.item} key={id}>
                <ReviewsCard id={id} author={author} content={content} />
              </li>
            ))}
          </ul>
          <ButtonSmall name={buttonName} onClick={onButtonClick} />
          <ButtonGoBack
            name={`<< back to ${getButtonName()}`}
            onClick={onButtonGoBackClick}
          />
        </div>
      )}
    </>
  );
};

export default Reviews;
