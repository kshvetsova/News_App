import { Link } from 'react-router-dom';
import { NewsContext } from '../../NewsContext';
import { setNewsCardDate } from '../../services/date';
import { URL_IMAGE_NEWS } from '../../services/api';
import { useContext } from 'react';
import { News } from '../../types';

import './CardNews.scss';


type Props = {
  news: News;
}

export const CardNews: React.FC<Props> = ({ news }) => {
  const {id, date, excerpt, thumbnail, title } = news;
  const { setQuerySearch } = useContext(NewsContext);

  return (
    <div className="CardNews">
      <div className="CardNews-ImageContainer">
        <img
          className="CardNews-Image"
          src={thumbnail}
          alt="News foto"
          onError={(e) => e.currentTarget.src = URL_IMAGE_NEWS}
        />
      </div>
      <div className="CardNews-Content">
        <h3 className="CardNews-Title">{title}</h3>
        <p className="CardNews-Description">{excerpt}</p>
        <div className="CardNews-Info">
          <p className="CardNews-Date">{setNewsCardDate(date)}</p>
          <Link
            to={`${id}`}
            className="CardNews-Link link"
            onClick={() => setQuerySearch('')}
          >
            Read more
          </Link>
        </div>
      </div>
    </div>
  )
}