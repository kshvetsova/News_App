import React, { ReactNode, useMemo, useState } from "react";

type Context = {
  loading: boolean,
  setLoading(par: boolean): void,
  error: string,
  setError(par: string): void,
  querySearch: string,
  setQuerySearch(par: string): void,
}

export const NewsContext = React.createContext<Context>({
  loading: true,
  setLoading: () => {},
  error: '',
  setError: () => {},
  querySearch: '',
  setQuerySearch: () => {},
});

type Props = {
  children: ReactNode;
}

export const NewsProvider: React.FC<Props> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [querySearch, setQuerySearch] = useState('');

  const value = useMemo(() => {
    return {
      loading,
      setLoading,
      error,
      setError,
      querySearch,
      setQuerySearch,
    }
  }, [loading, error, querySearch]);
  
  return (
    <NewsContext.Provider value={value}>
      {children}
    </NewsContext.Provider>
  )
}