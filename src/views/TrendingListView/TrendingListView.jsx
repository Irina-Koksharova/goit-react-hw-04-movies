import s from './TrendingListView.module.css';
import ListView from '../../views/ListView';

const TrendingList = ({ movies }) => {
  return (
    <>
      <h2 className={s.title}>Trending today</h2>
      <ListView movies={movies} />
    </>
  );
};

export default TrendingList;
