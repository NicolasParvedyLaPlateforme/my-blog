// src/types.ts

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  imageUrl: string;
  content: string;
}

export interface Database {
  articles: Article[];
}