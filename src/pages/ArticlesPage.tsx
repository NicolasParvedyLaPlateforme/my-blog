import { useEffect, useState } from "react"
import type { Article } from "../components/Article/Article";
import { Link } from "react-router-dom";
import type { ChangeEvent } from "react";

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>();
  const [articlesFilter, setArticlesFilter] = useState<Article[]>();
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch('http://localhost:3001/articles')
      .then((res) => res.json())
      .then((res) => {
        setArticles(res)
        setArticlesFilter(res);
      })
  }, [])
  
  useEffect(() => {
    setArticlesFilter(articles);

    if (articles == undefined){
      return;
    }

    setArticlesFilter(articles.filter((e) => e.title.toLowerCase().includes(search.toLowerCase()) || e.content.toLowerCase().includes(search.toLowerCase()) || e.excerpt.toLowerCase().includes(search.toLowerCase())));
  }, [search])

  if (articlesFilter == undefined) return <p>Aucun article a été trouvé.</p>

  return (
    <main>
      <section>
        <h2>Articles récents</h2>
        <input className="form-input mb-2" value={ search } onChange={(e) => setSearch(e.target.value)}/>
        <div className="blog-grid">
          {articlesFilter.map((article) => (
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
