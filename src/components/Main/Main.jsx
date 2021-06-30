import React, { useState, useEffect, useMemo } from 'react';
import { Redirect, Route, Switch, useLocation } from 'react-router-dom';
import { getNews, getNewsCategory } from '../../api/news';
import { HomePage } from '../HomePage';
import { ArticlesPage } from '../ArticlesPage';
import { Loader } from '../Loader';
import './Main.scss';

export const Main = () => {
  const [newsTrending, setNewsTrending] = useState([]);
  const [newsCategory, setNewsCategory] = useState({});
  const location = useLocation();
  const { pathname } = location;
  const searchParams = new URLSearchParams(location.search);
  const category = searchParams.get('category');
  const [articlePreview, setArticlePreview] = useState({});
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    getNews().then((res) => {
      if (res) {
        setNewsTrending(res.articles);
        setLoader(false);
      } else {
        setLoader(true);
      }
    });
  }, []);

  useEffect(() => {
    if (!(category in newsCategory) && category) {
      getNewsCategory(category).then((res) => {
        if (res) {
          setNewsCategory({
            ...newsCategory,
            [category]: res.articles,
          });
          setLoader(false);
        } else {
          setLoader(true);
        }
      });
    }
  }, [category]);

  useMemo(() => {
    if (!location.pathname.includes('category') && newsTrending.length > 0) {
      setLoader(false);
    }

    if (!location.pathname.includes('category') && newsTrending.length === 0) {
      setLoader(true);
    }
  }, [pathname]);

  return (
    <div className="Main">
      {loader
        ? <Loader />
        : (
          <Switch>
            <Route path="/articles">
              <ArticlesPage
                articlePreview={articlePreview}
                newsTrending={newsTrending}
                newsCategory={newsCategory[category]}
              />

            </Route>
            <Route path="/home/:par?">
              <HomePage
                newsTrending={newsTrending}
                newsCategory={newsCategory[category]}
                setArticlePreview={setArticlePreview}
              />
            </Route>
            <Redirect path="/" to="/home" />
          </Switch>
        )
      }
    </div>
  );
};
