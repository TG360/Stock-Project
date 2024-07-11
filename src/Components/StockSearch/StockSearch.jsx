// SearchBar.jsx
import React from 'react';
import './StockSearch.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const StockSearch = ({ query, onInputChange, onSubmit }) => {
  return (
    <div className="search-container">
      <form onSubmit={onSubmit}>
        <div className="search-bar">
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
          <input
            type="text"
            value={query}
            onChange={onInputChange}
            placeholder="Enter a Ticker"
            className="search-input"
          />
        </div>
      </form>
    </div>
  );
};

export default StockSearch;
