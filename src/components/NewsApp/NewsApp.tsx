import { NewsProvider } from '../../NewsContext';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import { Footer } from '../Footer';
import { Header } from '../Header/Header';
import { PageContent } from '../PageContent';

import './NewsApp.scss';

export const NewsApp = () => {
  const {detailId} = useParams();

  return (
    <NewsProvider>
      <div className="NewsApp NewsApp">
        <div className="NewsApp-Header">
          <Header />
        </div>

        <main className={classNames("NewsApp-Main", {
            "NewsApp-Main_detail": !!detailId,
          })}
        >
          <PageContent />
        </main>

        <div className="NewsApp-Footer">
          <Footer />
        </div>
      </div>
    </NewsProvider>
    
  )
}