import { useContext, useEffect, useState } from 'react';
import { NewsContext } from '../../NewsContext';
import {useParams, useSearchParams } from 'react-router-dom';
import { CardsNewsList } from '../CardsNewsList';
import { Detail } from '../Detail'
import { Preview } from '../Preview';
import { Loader } from '../Loader';
import { ScrollTop } from '../ScrollTop';
import { News, NewsList } from '../../types';
import { checkUrl, getArticle, getTrendingsNews } from '../../services/api';
import { setId } from '../../services/date';

import './PageContent.scss';

export const PageContent = () => {
  const [newsList, setNewsList] = useState<NewsList | null>(null);
  const [articlesList, setArticlesList] = useState<News[] | []>([]);
  const [article, setArticle] = useState<News | null>(null);
  const [newsPreview, setNewsPreview] = useState<News | null>(null);
  const {loading, setLoading, error, setError} = useContext(NewsContext);

  const [searchParams] = useSearchParams();
  const { detailId } = useParams();
  const category = searchParams.get('category') || 'General';
  const title = searchParams.get('title');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [category, detailId, newsPreview]);

  useEffect (() => {
    if (!newsList || !(category in newsList)) {
      setLoading(true);
      setError('');

      getTrendingsNews(category)
        .then((res) => {
          if (res.length) {
            const newsResult = res.map((item, index) => ({
              ...item,
              id: `${category}-${(newsList ? +(setId(newsList) as string) : 0) + index + 1}`,
              category: category,
            }));

            setNewsList({ ...newsList, [category]: newsResult });
          }
        })
        .catch(() => {
          setLoading(false);
          setError('Something went wrong')}
        )
        .finally(() => setLoading(false));
    }
  }, [newsList, category]);

  useEffect(() => {
    if(title && newsList) {
      const result = newsList[category].find(item => item.title.toLowerCase().includes(title.toLowerCase()));
      setNewsPreview(result || null);
    } else {
      setNewsPreview(null);
    }
  }, [title])
  
  useEffect(() => {
    if (detailId && newsList && newsList[category]) {
      setLoading(true);

      const articleFromList = articlesList.find(item => item.id === detailId);
      if (articleFromList) {
        setArticle(articleFromList);
        setLoading(false);

      } else {
        const articleFromNews = newsList[detailId.split('-')[0]]
          .find(item => item.id === detailId) as News;

        const url = checkUrl(articleFromNews.url);

        getArticle(url)
          .then((res) => {
            const resultArticle = { ...res, id: detailId};
            setArticle(resultArticle);
            setArticlesList([ ...articlesList, resultArticle ]);
          })
          .catch(() => setError('Something went wrong'))
          .finally(() => setLoading(false));
      }
    }
  }, [detailId]);

  return (
    <div className="PageContent">
      {loading && <Loader />}

      {!detailId && !loading && !error && (
        <>
          {!newsList && <div className="PageContent-Empty">No news on server</div>}
          {newsList && newsList[category] && (
            <>
              {newsPreview && <Preview news={newsPreview} />}
              <CardsNewsList newsList={newsList[category]} />
            </>
            
          )}
          {newsList && !newsList[category] && (
            <div className="PageContent-Empty">No news on server</div>)}
        </>
      )}

      {detailId && article && !loading && !error && (
        <Detail article={article} />
      )}

      {newsList && newsList[category] && !loading && !error && (
        <div className="PageContent-ScrollTop">
          <ScrollTop />
        </div>
      )}

      {!loading && error && (
        <div className="PageContent-Error">{error}</div>
      )}
    </div>
  )
}