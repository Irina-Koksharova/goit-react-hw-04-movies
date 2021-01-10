import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Pagination, PaginationItem } from '@material-ui/lab';
import s from './PaginationElement.module.css';

const useStyles = makeStyles(theme => ({
  item: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 50,
    height: 50,
    margin: 5,
    color: 'rgb(85, 83, 83)',
    fontSize: 20,
  },
  selected: {
    border: '2px solid rgb(248, 100, 14)',
    borderRadius: 8,
    color: 'white',
    background: 'linear-gradient(45deg, #f8640e 30%, #f8640e 90%)',
  },
}));

const PaginationElement = ({ count, page, onChange }) => {
  const classes = useStyles();

  const onHandlePageChange = (e, value) => {
    onChange(value);
  };

  return (
    <Pagination
      count={count}
      page={page}
      defaultPage={1}
      boundaryCount={1}
      onChange={onHandlePageChange}
      shape="rounded"
      showFirstButton
      showLastButton
      classes={{ root: `${s.paginationNav}` }}
      renderItem={item => (
        <PaginationItem
          {...item}
          classes={{ root: classes.item, selected: classes.selected }}
        />
      )}
    />
  );
};

PaginationElement.propTypes = {
  count: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default PaginationElement;
