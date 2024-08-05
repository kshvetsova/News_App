export const getSearchWith = (data: string[], search: URLSearchParams | null) => {
  const [key, value] = data;
  const newParams = new URLSearchParams(search?.toString());

  if (!value) {
    newParams.delete(key);
  } else {
    newParams.set(key, value);
  }

  return newParams.toString();
}