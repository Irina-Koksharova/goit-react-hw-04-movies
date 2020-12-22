import Container from '../Container';
import Navigation from '../Navigation';
import Section from '../Section';
import TrendingList from '../TrendingList';

const App = () => {
  return (
    <Container>
      <Navigation />

      <Section>
        <TrendingList />
      </Section>
    </Container>
  );
};

export default App;
