import { lazy, Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { ReactQueryDevtools } from 'react-query/devtools';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ToastContainer } from 'react-toastify';
import Container from '../Container';
import Navigation from '../Navigation';
import Section from '../Section';
import Spinner from '../Loader';

const HomePage = lazy(() =>
  import('../../views/HomePage' /* webpackChunkName: "home-page" */),
);
const MoviesPage = lazy(() =>
  import('../../views/MoviesPage' /* webpackChunkName: "movie-page" */),
);
const MovieDetailsPage = lazy(() =>
  import(
    '../../views/MovieDetailsPage' /* webpackChunkName: "movieDetails-page" */
  ),
);
const TVDetailsPage = lazy(() =>
  import(
    '../../views/TVDetailsPage' /* webpackChunkName: "TVDetailsPage-page" */
  ),
);

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Container>
        <Navigation />

        <Section style={{ padding: '25px 0px 0px' }}>
          <Suspense fallback={<Spinner />}>
            <Switch>
              <Route path="/" exact>
                <HomePage />
              </Route>

              <Route path="/movies" exact>
                <MoviesPage />
              </Route>

              <Route path="/movies/:movieId">
                <MovieDetailsPage />
              </Route>

              <Route path="/tv" exact>
                <MoviesPage />
              </Route>

              <Route path="/tv/:tvId">
                <TVDetailsPage />
              </Route>
              <Redirect to="/" />
            </Switch>
          </Suspense>
          <ToastContainer autoClose={3000} />
        </Section>
      </Container>
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  );
};

export default App;
