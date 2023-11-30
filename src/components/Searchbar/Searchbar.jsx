import React, { useState } from 'react';
import { Icon } from '@iconify/react';

export const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(query);
    setQuery('');
  };

  return (
    <header className="Searchbar">
      <form className="SearchForm " onSubmit={handleSubmit}>
        <button type="submit" className="SearchForm-button">
          <Icon icon="mdi:magnify" width="28" height="28" />
          <span className="SearchForm-button-label">Search</span>
        </button>

        <input
          className="SearchForm-input"
          type="text"
          value={query}
          onChange={handleChange}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

