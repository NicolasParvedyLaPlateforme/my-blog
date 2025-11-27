export interface Article {
    id: string;
    title: string;
    excerpt: string;
    date: string;
    category: string;
    imageUrl: string;
    content: string;
}

/*
title: '',
    excerpt: '',
    date: new Date().toISOString().split('T')[0], // Date du jour par défaut
    category: '',
    imageUrl: '',
    content: ''
    */

export default function Article() {
  return (
    <div>Article</div>
  )
}
