import { useEffect, useState } from "react"
import type { Article } from "../components/Article/Article";
import { Link } from "react-router-dom";

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>();

  useEffect(() => {
    fetch('http://localhost:3001/articles')
      .then((res) => res.json())
      .then((res) => setArticles(res))
  }, [])

  if (articles == undefined) return <p>Aucun article a été trouvé.</p>

  return (
    <main>
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
  )
}
