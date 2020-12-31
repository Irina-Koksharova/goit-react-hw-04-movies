import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import s from './MovieCardView.module.css';
import { fetchSelectedMovies } from '../../services/api-movies';
import { getGenresNames } from '../../services/getGenresNames';
import CastView from '../CastView';
import defaultFoto from '../../error.jpg';

const MovieCardView = () => {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const { movieId } = useParams();
  const imageURL = 'https://image.tmdb.org/t/p/w400';

  useEffect(() => {
    fetchSelectedMovies(movieId).then(response => setSelectedMovie(response));
  }, [movieId]);

  return (
    <>
      {selectedMovie && (
        <div className={s.container}>
          <div className={s.containerImage}>
            <img
              className={s.image}
              src={
                selectedMovie.poster_path
                  ? imageURL + selectedMovie.poster_path
                  : defaultFoto
              }
              alt={selectedMovie.title}
            />
          </div>
          <div>
            <h2 className={s.title}>
              {selectedMovie.title +
                ` (${selectedMovie.release_date.slice(0, 4)})`}
            </h2>
            <h3 className={s.subtitle}>{`User score: ${
              selectedMovie.vote_average * 10
            }%`}</h3>
            <h3 className={s.subtitle}>Overview</h3>
            <p className={s.text}>{selectedMovie.overview}</p>
            <h3 className={s.subtitle}>Genres</h3>
            <p className={s.text}>{getGenresNames(selectedMovie.genres)}</p>
            <h3 className={s.subtitle}>Editional information</h3>
            <ul>
              <li>
                <Link to="/">
                  Cast
                  <CastView
                    title="Cast"
                    bookTitle={selectedMovie.title}
                    id={selectedMovie.id}
                  />
                </Link>
                {/* <a href="/">Cast</a> */}
              </li>
              {/* <li>
                            <Link>
                                <CastView />
                            </Link>
                            <a href="/">Reviews</a>
                        </li> */}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default MovieCardView;
