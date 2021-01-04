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

export default SortSelector;
