import s from './ReviewsCard.module.css';

const ReviewsCard = ({ id, author, content }) => {
  return (
    <>
      <h3 className={s.subtitle}>Author: {author}</h3>
      <p className={s.text} id={id}>
        {content}
      </p>
    </>
  );
};

export default ReviewsCard;
