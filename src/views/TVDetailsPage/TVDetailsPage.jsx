import { useState, lazy, Suspense } from 'react';
import {
  useParams,
  useRouteMatch,
  Route,
  Switch,
  useHistory,
  useLocation,
} from 'react-router-dom';
import { useQuery } from 'react-query';
import { fetchSelectedShow } from '../../services/api-movies';
import { links } from '../../data/editional-info-data';
import { serverError } from '../../services/notification/notification';
import ButtonGoBack from '../../components/ButtonGoBack';
import MovieCard from '../../components/MovieCard';
import Spinner from '../../components/Loader';
import Notification from '../../components/Notification';

const Cast = lazy(() => import('../Cast' /* webpackChunkName: "cast-page" */));
const Reviews = lazy(() =>
  import('../Reviews' /* webpackChunkName: "reviews-page" */),
);

const TVDetailsPage = () => {
  const { tvId } = useParams();
  const { url, path } = useRouteMatch();
  const history = useHistory();
  const location = useLocation();
  const [locationFrom, setLocationFrom] = useState(
    () => location?.state?.from?.location ?? '/',
  );

  const { isLoading, isError, isSuccess, data } = useQuery(
    ['selectedTV', tvId],
    () => fetchSelectedShow('tv', tvId),
  );

  return (
    <>
      {isLoading && <Spinner />}
      {isError && <Notification message={serverError} />}
      {isSuccess && (
        <>
          <ButtonGoBack
            name={`<< back to ${url.slice(1, 3)}`}
            onClick={() => history.push(locationFrom)}
          />
          <MovieCard movie={data} url={url} />
        </>
      )}
      <Suspense fallback={<Spinner />}>
        <Switch>
          <Route path={`${path}/${links[0]}`}>
            <Cast title={links[0]} movie={data} />
          </Route>
          <Route path={`${path}/${links[1]}`}>
            <Reviews title={links[1]} movie={data} />
          </Route>
        </Switch>
      </Suspense>
    </>
  );
};
export default TVDetailsPage;
