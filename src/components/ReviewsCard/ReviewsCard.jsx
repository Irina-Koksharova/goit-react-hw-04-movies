import PropTypes from 'prop-types';
import s from './ReviewsCard.module.css';

const ReviewsCard = ({ author, content }) => {
  return (
    <>
      <h3 className={s.subtitle}>Author: {author}</h3>
      <p className={s.text}>{content}</p>
    </>
  );
};

ReviewsCard.propTypes = {
  author: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

export default ReviewsCard;
