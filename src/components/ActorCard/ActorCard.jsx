import s from './ActorCard.module.css';
import { imageURL } from '../../data/url-data';
import defaultFoto from '../../images/error.jpg';

const ActorCard = ({ image, name, character }) => {
  return (
    <>
      <div className={s.imageContainer}>
        <img
          className={s.image}
          src={image ? imageURL + image : defaultFoto}
          alt={name}
        />
      </div>
      <p className={s.name}>{name}</p>
      <p className={s.text}>{`Character: ${character}`}</p>
    </>
  );
};

export default ActorCard;
