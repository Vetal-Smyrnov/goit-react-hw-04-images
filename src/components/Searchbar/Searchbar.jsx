import { useState } from 'react';
import 'font-awesome/css/font-awesome.min.css';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';

const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = ({ target }) => {
    setQuery(target.value.trim());
  };

  const handelSubmit = event => {
    event.preventDefault();
    onSubmit(query);
  };

  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={handelSubmit}>
        <button type="submit" className={css['SearchForm-button']}>
          <i className="fa fa-search"></i>
          <span className={css['SearchForm-button-label']}>Search</span>
        </button>

        <input
          className={css['SearchForm-input']}
          value={query}
          onChange={handleInputChange}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
