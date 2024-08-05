import { URL_ICON_ARTICLE, URL_IMAGE_ARTICLE } from '../../services/api';
import { setArticleDate } from '../../services/date';
import { News } from '../../types';

import './Detail.scss';

type Props = {
  article: News,
}

export const Detail: React.FC<Props> = ({ article }) => {
  const {
    date,
    content,
    title,
    thumbnail,
    authors,
    publisher: {name, url, favicon}
  } = article;

  return (
    <section className="Detail">
      <div className="Detail-ImageContainer">
        <img
          src={thumbnail}
          alt="Article foto"
          className="Detail-Image"
          onError={(e) => e.currentTarget.src = URL_IMAGE_ARTICLE}
        />
      </div>
      <h1 className="Detail-Title">{title}</h1>
      <div className="Detail-Info">
        <div className="Detail-InfoSectionLeft">
          <p className="Detail-Author">Written by {authors[0] || 'an unknouwn author'}</p>
          <p className="Detail-Date">{setArticleDate(date)}</p>
        </div>
        <a href={url} target="_blank" className="Detail-InfoSectionRight">
          <p className="Detail-PublisherName">{name}</p>
          <img
            src={favicon}
            alt="Icon publisher"
            className="Detail-PublisherIcon"
            onError={(e) => {
              e.currentTarget.src = URL_ICON_ARTICLE;
              e.currentTarget.style.backgroundColor = '#e9eef1';
            }}
          />
        </a>
      </div>
      <article className="Detail-Article">{content}</article>
    </section>
  )
}