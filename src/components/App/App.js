import { useState, useEffect } from 'react';
import Container from '../Container';
import Navigation from '../Navigation';
import Section from '../Section';
import TrendingList from '../TrendingList';
import { fetchTrendingMovies, fetchMovies } from '../../services/api-movies';
import FilmCard from '../FilmCard';

const App = () => {
  const [trendingList, setTrendingList] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    fetchTrendingMovies().then(({ results }) => setTrendingList(results));
  }, []);

  const getSelectedMovie = e => {
    e.preventDefault();
    fetchMovies(e.target.id).then(response => setSelectedMovie(response));
  };

  return (
    <Container>
      <Navigation />

      <Section>
        {trendingList && (
          <TrendingList movies={trendingList} onSelect={getSelectedMovie} />
        )}
      </Section>

      <Section>{selectedMovie && <FilmCard movie={selectedMovie} />}</Section>
    </Container>
  );
};

export default App;
