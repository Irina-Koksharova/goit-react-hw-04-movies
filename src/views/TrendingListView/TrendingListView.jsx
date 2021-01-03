import s from './TrendingListView.module.css';
import SortSelector from '../../components/SortSelector';
import ListView from '../../views/ListView';

const TrendingList = ({ movies }) => {
  const options = ['all', 'movie', 'tv'];
  return (
    <>
      <h2 className={s.title}>Trending today</h2>
      <SortSelector options={options} />
      <ListView movies={movies} />
    </>
  );
};

export default TrendingList;
