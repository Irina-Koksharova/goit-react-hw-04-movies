import PropTypes from 'prop-types';
import s from './SortSelector.module.css';

const SortSelector = ({ options, onChange, value }) => {
  return (
    <select className={s.select} value={value} onChange={onChange}>
      {options.map(option => (
        <option key={option}>{option}</option>
      ))}
    </select>
  );
};

SortSelector.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default SortSelector;
