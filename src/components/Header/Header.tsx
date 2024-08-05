import { useCallback, useContext } from 'react';
import { NewsContext } from '../../NewsContext';
import { Link, useSearchParams, useParams } from 'react-router-dom';
import classNames from 'classnames';
import debounce from 'lodash.debounce';
import { categoriesList } from '../../services/dataContent';
import { getSearchWith } from '../../utils/searchHelper';

import './Header.scss';

export const Header = () => {
  const { querySearch, setQuerySearch } = useContext(NewsContext);
  const { detailId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get('category');

  const setSearchWith = useCallback((data: [string, string], search: URLSearchParams) => {
    setSearchParams(getSearchWith(data, search));
  }, [setSearchParams]);

  const setTitle = useCallback(debounce(setSearchWith, 1000), []);

  return (
    <header className="Header">
      <div className={classNames("Header-ContainerLeft", {
         "Header-ContainerLeft_detail": !!detailId,
        })}
      >
        <Link to="/news" className="Header-Logo">News&nbsp;App</Link>

        <div className="Header-Container">
          {!detailId && (
            <label className="Header-SearchContainer">
              <input
                className="Header-Search"
                type="text"
                placeholder="Search news title"
                value={querySearch}
                onChange={({ target }) => {
                  setQuerySearch(target.value);
                  setTitle(['title', target.value], searchParams);
                }}
              />
              {querySearch && (
                <div
                  className="Header-SearchClose"
                  onClick={() => {
                    setQuerySearch('');
                    setSearchParams(getSearchWith(['title', ''], searchParams));
                  }}
                >
                  {}
                </div>
              )}

            </label>
          )}

          <nav className={classNames("Header-Nav Nav", {
              "Header-Nav_detail": !!detailId,
            })}
          >
            <div className="Nav-Categories">
              <div className="Nav-TitleList nav-link">Categories</div>

              <ul className="Nav-List List">
                {categoriesList.map(item => (
                  <li
                    key={item}
                    className={classNames("List-Item", {
                      "List-Item_active": category === item,
                    })}
                  >
                    <Link
                      key={item}
                      to={{
                        pathname: '/news',
                        search: getSearchWith(['category', item], null)
                      }}
                      className="List-Link link"
                      onClick={() => setQuerySearch('')}
                    >
                      {item}
                    </Link>
                  </li>
                ))}
                </ul>
            </div>

            <Link
              to="/news"
              className="Nav-TrendingLink nav-link link"
              onClick={() => setQuerySearch('')}
            >
              ⚡️&nbsp;Trending&nbsp;news
            </Link>
          </nav>
        </div>
      </div>

      <label className="Header-ToggleMenu ToggleMenu">
        <input type="checkbox" className="ToggleMenu-Input" defaultChecked />
        <span className="ToggleMenu-Image"></span>
      </label>
    </header>
  )
}