import { useNavigate, useParams } from "react-router-dom"
import type { Article } from "../components/Article/Article"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

export default function ArticlesDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [like, setLike] = useState("💔")

  const [article, setArticle] = useState<Article>();

  function handleLike(){
    if (like == "💔")
    {
      setLike("❤️")
    }else {
      setLike("💔")
    }
  }

  useEffect(() => {
    fetch('http://localhost:3000/articles/' + id)
      .then((res) => res.json())
      .then(res => setArticle(res))
  }, [id])

  if (article == undefined) {
    return <p>Article introuvable</p>
  }

  function handleDelete(){
    fetch('http://localhost:3001/articles/' + id, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) toast('Une erreur de serveur est survenu')
        return res.json();
      })
      .then(() => {
        toast("L'article a bien été supprimé");
        navigate('/articles/');
      })
  }

  return (
    <div className="article-container">
      {/* En-tête */}
      <header className="article-header">
        <span className="article-category-badge">{article.category}</span>
        <h1 className="article-title">{article.title}</h1>
        <div className="article-meta">
          Publié le {article.date} par <strong>Nicolas Parvedy</strong>
        </div>
      </header>

      {/* Image principale */}
      <img 
        src={article.imageUrl} 
        alt={article.title} 
        className="article-cover-image"
      />

      {/* Contenu de l'article */}
      <div className="article-content">
        {/* On split le texte par saut de ligne pour simuler des paragraphes */}
        {article.content.split('\n').map((paragraph, index) => (
          paragraph.trim() && <p key={index}>{paragraph}</p>
        ))}
        <p>Vous aimez l'article ? <button onClick={handleLike}>{ like }</button></p>
      </div>

      {/* Actions Admin */}
      <div className="article-actions">
        <Link to={"/articles/update/" + article.id} className="btn-edit">
          ✏️ Modifier l'article
        </Link>
        <button onClick={handleDelete} className="btn-delete">
          🗑️ Supprimer l'article
        </button>
      </div>
    </div>
  )
}
