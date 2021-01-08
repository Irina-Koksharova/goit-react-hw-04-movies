import { useState, useEffect, lazy, Suspense } from 'react';
import {
  useParams,
  useRouteMatch,
  Route,
  Switch,
  useHistory,
  useLocation,
} from 'react-router-dom';
import { fetchSelectedShow } from '../../services/api-movies';
import { links } from '../../data/editional-info-data';
import ButtonGoBack from '../../components/ButtonGoBack';
import MovieCard from '../../components/MovieCard';

const Cast = lazy(() => import('../Cast' /* webpackChunkName: "cast-page" */));
const Reviews = lazy(() =>
  import('../Reviews' /* webpackChunkName: "reviews-page" */),
);

const TVDetailsPage = () => {
  const [selectedTV, setSelectedTV] = useState(null);
  const { tvId } = useParams();
  const { url, path } = useRouteMatch();
  const history = useHistory();
  const location = useLocation();
  const [locationFrom, setLocationFrom] = useState(
    () => location?.state?.from?.location ?? '/',
  );

  useEffect(() => {
    fetchSelectedShow('tv', tvId).then(setSelectedTV);
  }, [tvId]);

  return (
    <>
      {selectedTV && (
        <>
          <ButtonGoBack
            name={`<< back to ${url.slice(1, 3)}`}
            onClick={() => history.push(locationFrom)}
          />
          <MovieCard movie={selectedTV} url={url} />
        </>
      )}
      <Suspense fallback={<h1>ЗАГРУЖАЕМ...</h1>}>
        <Switch>
          <Route path={`${path}/${links[0]}`}>
            <Cast title={links[0]} movie={selectedTV} />
          </Route>
          <Route path={`${path}/${links[1]}`}>
            <Reviews title={links[1]} movie={selectedTV} />
          </Route>
        </Switch>
      </Suspense>
    </>
  );
};
export default TVDetailsPage;
