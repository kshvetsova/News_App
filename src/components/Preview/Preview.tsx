import { Link } from 'react-router-dom';
import { setNewsCardDate } from '../../services/date';
import { URL_IMAGE_NEWS } from '../../services/api';
import { News } from '../../types';

import './Preview.scss';

type Props = {
  news: News;
}

export const Preview: React.FC<Props> = ({ news }) => {
  const {id, date, excerpt, thumbnail, title } = news;

  return (
    <div className="Preview">
      <div className="Preview-ImageContainer">
        <img
          className="Preview-Image"
          src={thumbnail}
          alt="News foto"
          onError={(e) => e.currentTarget.src = URL_IMAGE_NEWS }
        />
      </div>
      <div className="Preview-ContentContainer">
        <div className='Preview-Content'>
          <h3 className="Preview-Title">{title}</h3>
          <p className="Preview-Description">{excerpt}</p>
          <div className="Preview-Info">
            <p className="Preview-Date">{setNewsCardDate(date)}</p>
            <Link to={`${id}`} className="Preview-Link link">Read more</Link>
          </div>
        </div>
      </div>
    </div>
  )
}