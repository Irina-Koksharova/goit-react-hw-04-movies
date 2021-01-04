import { Switch, Route } from 'react-router-dom';
import Container from '../Container';
import Navigation from '../Navigation';
import Section from '../Section';
import HomePage from '../../views/HomePage';
import MoviesPage from '../../views/MoviesPage';
import MovieDetailsPage from '../../views/MovieDetailsPage';

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
        </Switch>
      </Section>
    </Container>
  );
};

export default App;
