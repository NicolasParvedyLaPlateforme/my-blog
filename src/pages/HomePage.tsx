import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import type { Article } from '../components/Article/Article';
import { Link } from 'react-router-dom';

export default function HomePage() {

  const [articles, setArticles] = useState<Article[]>();

  useEffect(() => {
    fetch('http://localhost:3000/articles')
      .then((res) => {
        if (!res.ok) toast('Une erreur serveur est survenu')
          return res.json();
      })
      .then((res) => setArticles(res))
  })

  if (articles == undefined) return <p>Aucun article pour le moment.</p>

  return (
    <main>
      {/* Section Hero : L'accroche du blog */}
      <section className="hero-section">
        <h1>Bienvenue sur Mon TechBlog</h1>
        <p>
          Explorons ensemble les dernières tendances du développement web, 
          du design UI/UX et de la technologie moderne.
        </p>
        <button onClick={() => console.log('S abonner')}>
          S'abonner à la newsletter
        </button>
      </section>

      {/* Section Articles Récents */}
      <section>
        <h2>Articles récents</h2>
        <div className="blog-grid">
          {articles.map((article) => (
            <article key={article.id} className="card post-card">
              <img 
                src={article.imageUrl} 
                alt={article.title} 
                className="post-image" 
                loading="lazy"
              />
              <div className="post-content">
                <div className="post-meta">
                  {article.category} • {article.date}
                </div>
                <h3 className="post-title">{article.title}</h3>
                <p className="post-excerpt">{article.excerpt}</p>
                <Link to={`/articles/${article.id}`} className="read-more">
                  Lire l'article →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}