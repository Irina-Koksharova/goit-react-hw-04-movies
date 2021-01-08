import s from './ReviewsCard.module.css';

const ReviewsCard = ({ author, content }) => {
  return (
    <>
      <h3 className={s.subtitle}>Author: {author}</h3>
      <p className={s.text}>{content}</p>
    </>
  );
};

export default ReviewsCard;
