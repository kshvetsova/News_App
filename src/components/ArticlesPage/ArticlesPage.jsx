import React, { useContext, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import './ArticlesPage.scss';
import { NewsContext } from '../../NewsProvider';

export const ArticlesPage = ({
  articlePreview,
  newsTrending,
  newsCategory,
}) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const category = searchParams.get('category');
  const { appliedQuery, newsRead } = useContext(NewsContext);

  const visibleArticles = useMemo(() => {
    if (category) {
      return newsCategory;
    }

    if (newsRead && appliedQuery) {
      return [articlePreview];
    }

    if (newsRead) {
      return [articlePreview];
    }

    return newsTrending;
  }, [category, newsCategory, newsTrending,
    articlePreview, newsRead, appliedQuery]);

  return (
    <div className="ArticlesPage">
      {visibleArticles
        .map((item, index) => (
          <div className="article-container" key={`${item.title + index}`}>
            <div
              key={`${item.title + index}`}
              className="ArticlesPage-Article Article"
            >
              <img
                className="Article-Image"
                src={item.image}
                alt="Foto"
              />
              <div className="Article-Content">
                <h1 className="Article-Title">
                  {item.title}
                </h1>
                <div className="Article-Info">
                  <p className="Article-Source">
                    {item.source.name}
                  </p>
                  <p className="Article-Date">
                    {new Date(item.publishedAt.slice(0, 10))
                      .toString().slice(4, 15)
                    }
                  </p>
                </div>
                <div className="Article-Summary">
                  {item.description[(item.description).length - 1] !== '.'
                    ? `${item.description}.`
                    : item.description
                  }
                  <br />
                  {item.content.slice(0, item.content.indexOf('['))}
                </div>
              </div>
            </div>
            {visibleArticles.length > 1 && (
              <div className="line-article">
                {}
              </div>
            )}
          </div>
        ))}
    </div>
  );
};

const newsPropTypes = PropTypes.arrayOf({
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
}.isRequired);

ArticlesPage.propTypes = {
  articlePreview: PropTypes.shape({
    title: PropTypes.string,
    content: PropTypes.string,
    image: PropTypes.string,
    source: PropTypes.shape({
      name: PropTypes.string,
    }),
    publishedAt: PropTypes.string,
  }),
  newsTrending: newsPropTypes.isRequired,
  newsCategory: newsPropTypes,
};

ArticlesPage.defaultProps = {
  newsCategory: [],
  articlePreview: {},
};
