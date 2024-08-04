import { CardNews } from '../CardNews';
import { News } from '../../types';
import './CardsNewsList.scss';

type Props = {
  newsList: News[];
}

export const CardsNewsList: React.FC<Props> = ({ newsList }) => (
  <div className="CardsNewsList">
    {newsList.map((item) => <CardNews key={item.id} news={item}/>)}
  </div>
)