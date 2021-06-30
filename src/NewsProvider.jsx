import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';

export const debounce = (f, delay) => {
  let timerId;

  return (...args) => {
    clearTimeout(timerId);
    timerId = setTimeout(f, delay, ...args);
  };
};

export const NewsContext = React.createContext({
  query: '',
  setQuery: () => {},
  appliedQuery: '',
  setAppliedQuery: () => {},
  newsRead: false,
  setNewsRead: () => {},
  path: '',
  setPath: () => {},
  applyQuery: () => {},
});

export const NewsProvider = ({ children }) => {
  const [query, setQuery] = useState('');
  const [appliedQuery, setAppliedQuery] = useState('');
  const applyQuery = useCallback(debounce(setAppliedQuery, 1000), []);
  const [newsRead, setNewsRead] = useState(false);
  const [path, setPath] = useState('');

  const contextValue = {
    query,
    setQuery,
    appliedQuery,
    setAppliedQuery,
    applyQuery,
    newsRead,
    setNewsRead,
    path,
    setPath,
  };

  return (
    <NewsContext.Provider value={contextValue}>
      {children}
    </NewsContext.Provider>
  );
};

NewsProvider.propTypes = {
  children: PropTypes.shape().isRequired,
};
