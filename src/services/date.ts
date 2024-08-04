import { Category, NewsList } from "../types";

export const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Satuday'];

const setDate = (date: string) => {
  switch (date) {
    case '01':
    case '21':
    case '31':
      return date + 'st';

    case '02':
    case '22':
      return date + 'nd';

    case '03':
    case '23':
      return date + 'rd';

      default:
      return date + 'th'
  }
}

export const setNewsCardDate = (dateServer: string) => {
  const [, month, date, year] = new Date(dateServer).toString().split(' ', 4);

  return `${month} ${setDate(date)} ${year}`;
}

export const setArticleDate = (dateServer: string) => {
  const dateNews = new Date(dateServer);
  const [, month, date] = dateNews.toString().split(' ', 3);

  return `${weekdays[dateNews.getDay()]} ${month} ${date}`;
}

export const setId = (obj: NewsList): string | undefined => {
  const keys = Object.keys(obj);
  const index = keys.at(-1) as Category;

  return obj[index].at(-1)?.id?.split('-')[1];
}
