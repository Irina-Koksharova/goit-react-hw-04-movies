import { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';
import { IconContext } from 'react-icons';
import s from './SearchBar.module.css';

const SearchBar = ({ onSubmit }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const history = useHistory();
  const location = useLocation();

  const handleSubmitForm = e => {
    e.preventDefault();
    onSubmit(searchQuery);
    history.push({
      ...location,
      search: `query=${searchQuery}`,
    });
    setSearchQuery('');
  };

  return (
    <form className={s.form} onSubmit={handleSubmitForm}>
      <label className={s.label}>
        <input
          className={s.input}
          value={searchQuery}
          onChange={e => {
            setSearchQuery(e.target.value);
          }}
        ></input>
      </label>
      <button className={s.button} type="submit">
        <IconContext.Provider value={{ className: `${s.reactIcons}` }}>
          <FiSearch />
        </IconContext.Provider>
        Search
      </button>
    </form>
  );
};

export default SearchBar;
