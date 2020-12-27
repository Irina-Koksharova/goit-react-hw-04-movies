import { useState, useEffect } from 'react';
import Container from '../Container';
import Navigation from '../Navigation';
import Section from '../Section';
import TrendingList from '../TrendingList';
import { fetchMovies } from '../../services/api-movies';
import FilmCard from '../FilmCard';

const App = () => {
  const [trendingList, setTrendingList] = useState([]);

  useEffect(() => {
    fetchMovies().then(({ results }) => setTrendingList(results));
  }, []);

  return (
    <Container>
      <Navigation />

      <Section>
        {/* {trendingList && <TrendingList movies={trendingList} />} */}
        <FilmCard movies={trendingList} />
      </Section>
    </Container>
  );
};

export default App;
