import { News } from "../types";

export const URL_IMAGE_NEWS = "https://www.teagames.com/wp-content/themes/myarcadetheme/images/noimg.png";

export const URL_IMAGE_ARTICLE = "https://des.com.qa/Admin/PublishingImages/Default%20Image/No%20Image%20picture.png";

export const URL_ICON_ARTICLE = "https://www.svgrepo.com/show/340721/no-image.svg";

const date = new Date().toISOString().slice(0, 10);

const URL_ARTICLE = 'https://news-api14.p.rapidapi.com/v2/article?type=plaintext&url=';

const URL_TRENDINGS_NEWS = `https://news-api14.p.rapidapi.com/v2/trendings?date=${date}&language=en&topic=`;

const options = {
  method: 'GET',
  headers: {
    'x-rapidapi-key': '43f5b0b1b7msh98b68ce351846cdp1fe9bdjsn077a7897ccfa',
    'x-rapidapi-host': 'news-api14.p.rapidapi.com'
  }
};

export const getArticle = async(url: string): Promise<News> => {
  const response = await fetch(`${URL_ARTICLE}${url}`, options);
  const result = await response.json();

  return result.data;
}

export const getTrendingsNews = async(category: string): Promise<News[]> => {
  const response = await fetch(`${URL_TRENDINGS_NEWS}${category}`, options);
  const result = await response.json();

  return result.data;
}

export const checkUrl = (url: string) => {
  const resultUrl = url.endsWith('html') || url.endsWith('/') ? url : url + '/';

  return resultUrl;
}

