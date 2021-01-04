import { Switch, Route } from 'react-router-dom';
import Container from '../Container';
import Navigation from '../Navigation';
import Section from '../Section';
import HomePage from '../../views/HomePage';
import MoviesPage from '../../views/MoviesPage';
import TVPage from '../../views/TVPage';
import MovieDetailsPage from '../../views/MovieDetailsPage';
import TVDetailsPage from '../../views/TVDetailsPage';

const App = () => {
  return (
    <Container>
      <Navigation />

      <Section>
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
            <TVPage />
          </Route>

          <Route path="/tv/:tvId">
            <TVDetailsPage />
          </Route>
        </Switch>
      </Section>
    </Container>
  );
};

export default App;
