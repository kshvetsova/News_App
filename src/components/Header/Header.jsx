import React, { useState, useContext } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { NewsContext } from '../../NewsProvider';
import './Header.scss';
import { Categories } from '../Categories';

export const Header = () => {
  const location = useLocation();
  const { pathname, search } = location;
  const [menu, setMenu] = useState(true);
  const {
    query,
    setQuery,
    applyQuery,
    setNewsRead,
    setPath,
  } = useContext(NewsContext);

  return (
    <header className="Header" id="/articles">
      <div className="container-headerNav">
        <form className="Header-Form form">
          <button
            type="button"
            className="button-search"
            onClick={() => setQuery('')}
          />
          <input
            type="text"
            className="form-input"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              applyQuery(e.target.value);
            }}
            placeholder="Search..."
          />
          {query && (
            <button
              type="button"
              className="button-clear"
              onClick={() => {
                setQuery('');
                applyQuery('');
                setNewsRead(false);
              }}
            >
              {}
            </button>
          )}
        </form>
        <div className="container-nav">
          <nav className="Header-Nav Nav">
            <NavLink
              to={pathname.includes('/home')
                ? `${pathname}${search}` || '/home'
                : '/home'}
              className="Nav-Link"
              onClick={() => {
                setPath('/home');
                setNewsRead(false);
              }}
            >
              Home
            </NavLink>
            <NavLink
              to={pathname.includes('/articles')
                ? `${pathname}${search}` || '/articles'
                : '/articles'}
              className="Nav-Link"
              onClick={() => {
                setPath('/articles');
                setNewsRead(false);
              }}
            >
              Articles
            </NavLink>
          </nav>
          <div className="container-links">
            <a href="http://insagram.com" className="Header-Instagram link">
              {}
            </a>
            <a href="http://twitter.com" className="Header-Twitter link">
              {}
            </a>
            <a href="http://linkedin.com" className="Header-LinkedIn link">
              {}
            </a>
          </div>
        </div>
      </div>
      <div className={classNames('container', {
        container_menu: menu,
      })}
      >
        <a
          className={classNames('Header-Logo', {
            logo_visible: !menu,
          })}
          href="/#/"
        >
          News App
        </a>

        <div className="Header-Menu Menu">
          <div className={classNames('container-category', {
            menu_visible: !menu,
          })}
          >
            <NavLink
              to={pathname.includes('categories')
                ? `${pathname}${search}`
                : `${pathname}/categories`}
              className="Menu-Link"
              onClick={() => <Categories />}
            >
              Categories
            </NavLink>
            {pathname.includes('categories') && <Categories />}
          </div>
          <button
            type="button"
            className={classNames('button-menu', {
              menu_open: menu,
              menu_cross: !menu,
            })}
            onClick={() => setMenu(!menu)}
          />
        </div>
      </div>
    </header>
  );
};
