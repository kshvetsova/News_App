interface Publisher {
  name: string,
  url: string,
  favicon: string,
}

export interface News {
  id?: string,
  title: string,
  url: string,
  excerpt: string,
  thumbnail: string,
  language: string,
  content?: string,
  date: string,
  authors: string[],
  publisher: Publisher,
  category?: string,
}

export type Category = ('Sports' | 'World' | 'Science' | 'Business' | 'Politics' | 'Technology' | 'Lifestyle' | 'Entertainment' | 'General');

export type NewsList = {
 [Category: string]: News[],
};
