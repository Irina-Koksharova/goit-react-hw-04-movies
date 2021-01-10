import PropTypes from 'prop-types';
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

ActorCard.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string.isRequired,
  character: PropTypes.string.isRequired,
};

export default ActorCard;
