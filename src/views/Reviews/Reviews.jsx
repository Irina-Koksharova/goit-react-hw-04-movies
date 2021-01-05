import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import s from './Reviews.module.css';
import { fetchReviews } from '../../services/api-movies';
import { scrollElement } from '../../services/scroll';

const Reviews = ({ title, movie }) => {
  const [reviews, setReviews] = useState(null);
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
                <p className={s.text}>{content}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default Reviews;
