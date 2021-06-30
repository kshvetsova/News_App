import React from 'react';
import { useLocation } from 'react-router-dom';
import './Scroll.scss';

export const Scroll = () => {
  const location = useLocation();
  const { pathname, search } = location;

  return (
    <>
      {`${pathname}`.includes('/home') && (
        <a href={`#${pathname}${search}`} className="Scroll">
          Scroll to top&nbsp;
        </a>
      )}
      {pathname.includes('/articles') && (
        <a href={`#${pathname}${search}`} className="ScrollArticles">&nbsp;</a>
      )}
    </>
  );
};
