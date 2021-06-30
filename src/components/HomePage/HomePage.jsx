
import React, { useMemo, useCallback, useContext } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { NewsContext } from '../../NewsProvider';
import './HomePage.scss';

export const HomePage = ({ newsTrending, newsCategory, setArticlePreview }) => {
  const location = useLocation('');
  const searchParams = new URLSearchParams(location.search);
  const history = useHistory();
  const category = searchParams.get('category');
  const { appliedQuery, setNewsRead, setPath } = useContext(NewsContext);

  const visiblePreview = useMemo(() => (
    (category ? newsCategory : newsTrending)
      .find(item => (
        item.title.toLowerCase()
          .includes(appliedQuery.toLowerCase())))
  ), [category, newsCategory, newsTrending, appliedQuery]);

  const getArticlePreview = useCallback(() => {
    setArticlePreview(visiblePreview);
  }, [visiblePreview]);

  const getArticle = useCallback((item) => {
    setArticlePreview(item);
  }, []);

  return (
    <div className="HomePage">
      {(visiblePreview && appliedQuery) && (
        <div className={classNames('HomePage-Preview Preview', {
          is_visible: {},
        })}
        >
          <div className="Preview-Content">
            <h2 className="Preview-Title">
              {`${visiblePreview.title.slice(0, 67)}...`}
            </h2>
            <p className="Preview-Description">
              {`${visiblePreview.description.slice(0, 220)}...`}
            </p>
            <div className="Preview-Read">
              <p className="Preview-Date">
                {new Date(visiblePreview.publishedAt
                  .slice(0, 10)).toString().slice(4, 15)}
              </p>
              <button
                type="button"
                className="Preview-Button"
                onClick={() => {
                  getArticlePreview();
                  setNewsRead(true);
                  history.push('/articles');
                }}
              >
                Read more
              </button>
            </div>
          </div>
          <div className="Preview-Image">
            <img
              className="image-preview"
              src={visiblePreview.image}
              height="300"
              alt="Foto"
            />
          </div>
        </div>
      )}

      <div className="HomePage-Container">
        {(category ? newsCategory : newsTrending).map((item, index) => (
          <div
            className="HomePage-ContentNews News"
            key={`${item.title + index}`}
          >
            <img
              className="News-Image"
              src={item.image || '../images/no_image.jpeg'}
              height="183"
              alt="Foto"
            />
            <div className="News-Content">
              <h3 className="News-Title">
                {`${item.title.slice(0, 50)}...`}
              </h3>
              <p className="News-Description">
                {`${item.description.slice(0, 125)}...`}
              </p>
              <div className="News-Read">
                <p className="News-Date">
                  {new Date(item.publishedAt
                    .slice(0, 10)).toString().slice(4, 15)}
                </p>
                <button
                  type="button"
                  className="News-Button"
                  onClick={() => {
                    getArticle(item);
                    setNewsRead(true);
                    history.push('/articles');
                    setPath('/articles');
                  }}
                >
                  Read more
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const newsPropTypes = PropTypes.arrayOf({
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
}.isRequired);

HomePage.propTypes = {
  newsTrending: newsPropTypes.isRequired,
  newsCategory: newsPropTypes,
  setArticlePreview: PropTypes.func.isRequired,
};

HomePage.defaultProps = {
  newsCategory: [],
};
