import React, { useCallback } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import classNames from 'classnames';
import './Categories.scss';

export const Categories = () => {
  const location = useLocation();
  const history = useHistory();
  const searchParams = new URLSearchParams(location.search);
  const category = searchParams.get('category');
  const categoryListFirst = ['Sports', 'World', 'Business', 'Entertainment'];
  const categoryListSecond = ['Science', 'Health', 'Nation', 'Technology'];

  const handleClick = useCallback((item) => {
    searchParams.set('category', `${item.toLowerCase()}`);
    history.push(`?${searchParams}`);
  }, [searchParams, history]);

  return (
    <div className="Categories">
      <ul className="Categories-categoryList list">
        {categoryListFirst.map(item => (
          <li className="Categories-Item" key={item}>
            <button
              type="button"
              className={classNames('Categories-Link', {
                is_active: item.toLowerCase() === category,
              })}
              onClick={() => handleClick(item)}
            >
              {item}
            </button>
          </li>
        ))}
      </ul>

      <ul className="Categories-categoryListSecond list">
        {categoryListSecond.map(item => (
          <li
            className="Categories-Item"
            key={item}
          >
            <button
              type="button"
              className={classNames('Categories-Link', {
                is_active: item.toLowerCase() === category,
              })}
              onClick={() => handleClick(item)}
            >
              {item}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
