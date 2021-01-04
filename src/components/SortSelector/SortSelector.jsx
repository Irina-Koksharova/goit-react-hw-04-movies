import s from './SortSelector.module.css';

const SortSelector = ({ options, onChange }) => {
  return (
    <select className={s.select} onChange={onChange}>
      {options.map(option => (
        <option key={option}>{option}</option>
      ))}
    </select>
  );
};

export default SortSelector;
