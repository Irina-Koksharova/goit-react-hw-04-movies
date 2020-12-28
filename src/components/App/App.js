import { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import Container from '../Container';
import Navigation from '../Navigation';
import Section from '../Section';
import TrendingListView from '../../views/TrendingListView';
import { fetchTrendingMovies } from '../../services/api-movies';
import SearchMoviesView from '../../views/SearchMoviesView';

const App = () => {
  const [trendingList, setTrendingList] = useState(null);

  useEffect(() => {
    fetchTrendingMovies().then(({ results }) => setTrendingList(results));
  }, []);

  return (
    <Container>
      <Navigation />

      <Section>
        <Switch>
          <Route path="/" exact>
            {trendingList && <TrendingListView movies={trendingList} />}
          </Route>

          <Route path="/movies">
            <SearchMoviesView />
          </Route>
        </Switch>
      </Section>
    </Container>
  );
};

export default App;
