import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import s from './Reviews.module.css';
import { fetchReviews } from '../../services/api-movies';
import { scrollElement } from '../../services/scroll';

const Reviews = ({ title, movie }) => {
  const [reviews, setReviews] = useState(null);
  const [buttonName, setButtonName] = useState('Show more');
  const location = useLocation();

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

    fetchReviews(getPath(title), id).then(({ results }) => {
      setReviews(results);
      scrollElement(id);
    });
  }, [location.pathname, movie]);

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

  return (
    <>
      {reviews && (
        <div className={s.section}>
          <h2 className={s.title} id={movie.id}>{`${title} of "${
            movie.title ?? movie.original_name
          }"`}</h2>
          <ul className={s.container}>
            {reviews.map(({ id, author, content }) => (
              <li className={s.item} key={id}>
                <h3 className={s.subtitle}>Author: {author}</h3>
                <p className={s.text} id={id}>
                  {content}
                </p>
              </li>
            ))}
          </ul>
          <button className={s.button} type="button" onClick={onButtonClick}>
            {buttonName}
          </button>
        </div>
      )}
    </>
  );
};

export default Reviews;
