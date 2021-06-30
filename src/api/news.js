// eslint-disable-next-line max-len
const NEWS_URL = `https://gnews.io/api/v4/top-headlines?lang=en&token=c4bb229fb339ad141a104c0c61bf5eb2&max=10`;

const request = url => (
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw Error`${response.status} - ${response.statusText}`;
      }

      return response.json();
    })
    // eslint-disable-next-line no-console
    .catch(error => console.warn('Error: ', error))
);

export const getNews = async() => {
  const result = await request(NEWS_URL);

  return result;
};

export const getNewsCategory = async(category) => {
  const result = await request(`${NEWS_URL}&topic=${category}`);

  return result;
};
