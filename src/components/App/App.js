import { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import Container from '../Container';
import Navigation from '../Navigation';
import Section from '../Section';

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

const App = () => {
  return (
    <Container>
      <Navigation />

      <Section>
        <Suspense fallback={<h1>ЗАГРУЖАЕМ...</h1>}>
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
          </Switch>
        </Suspense>
      </Section>
    </Container>
  );
};

export default App;
