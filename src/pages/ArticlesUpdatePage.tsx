import type { Article } from "../components/Article/Article";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { ChangeEvent } from "react";
import { useEffect } from "react";
import { toast } from "sonner";

export default function ArticlesUpdatePage() {
  const { id } = useParams();

  const [article, setArticle] = useState<Article>({
    id: '',
    title: '',
    excerpt: '',
    date: new Date().toISOString().split('T')[0], // Date du jour par défaut
    category: '',
    imageUrl: 'https://picsum.photos/200/300',
    content: ''
  })

  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3001/articles/' + id)
      .then((res) => res.json())
      .then(res => setArticle(res))
  }, [id])

  if (article == undefined) return <p>Article introuvable</p>

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    //On fait un callback qui recupère les anciens données de l'article sauf celui qui est indiqué dans name, et name corresponds à la propriété name de notre input, exemple title, ou content 
    setArticle(prev => ({ ...prev, [name]: value }))
  }


  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    fetch('http://localhost:3001/articles/' + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(article)
    })
      .then((res) => {
        if (!res.ok) toast("Une erreur est survenu");
        return res.json()
      })
      .then((res) => {
        toast("Article : '" + article.title + "' est bien mise à jour")
        navigate('/articles/' + res.id)
      })
  }
  return (
    <div className="form-container card">
      <h1>Modifier l'article : { article.title }</h1>

      <form onSubmit={handleSubmit}>

        {/* Titre */}
        <div className="form-group">
          <label htmlFor="title" className="form-label">Titre de l'article</label>
          <input
            type="text"
            id="title"
            name="title"
            className="form-input"
            placeholder="Ex: Les nouveautés de React 19"
            value={article.title}
            onChange={handleChange}
            required
          />
        </div>

        {/* Catégorie & Date (Groupés sur desktop si voulu, ici simple colonne) */}
        <div className="form-group">
          <label htmlFor="category" className="form-label">Catégorie</label>
          <select
            id="category"
            name="category"
            className="form-select"
            value={article.category}
            onChange={handleChange}

            required
          >
            <option value="">Sélectionner une catégorie</option>
            <option value="Développement">Développement</option>
            <option value="Design">Design</option>
            <option value="Lifestyle">Lifestyle</option>
            <option value="Tutoriel">Tutoriel</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="date" className="form-label">Date de publication</label>
          <input
            type="date"
            id="date"
            name="date"
            className="form-input"
            value={article.date}
            onChange={handleChange}
          />
        </div>

        {/* Image URL */}
        <div className="form-group">
          <label htmlFor="imageUrl" className="form-label">URL de l'image de couverture</label>
          <input
            type="url"
            id="imageUrl"
            name="imageUrl"
            className="form-input"
            placeholder="https://..."
            value={article.imageUrl}
            onChange={handleChange}
          />
        </div>

        {/* Extrait (Court résumé) */}
        <div className="form-group">
          <label htmlFor="excerpt" className="form-label">Extrait (Résumé)</label>
          <textarea
            id="excerpt"
            name="excerpt"
            className="form-textarea"
            style={{ minHeight: '80px' }}
            placeholder="Une brève description qui apparaîtra sur la page d'accueil..."
            value={article.excerpt}
            onChange={handleChange}
            required
          />
        </div>

        {/* Contenu principal */}
        <div className="form-group">
          <label htmlFor="content" className="form-label">Contenu de l'article</label>
          <textarea
            id="content"
            name="content"
            className="form-textarea"
            style={{ minHeight: '300px' }}
            placeholder="Écrivez votre article ici..."
            value={article.content}
            onChange={handleChange}
            required
          />
        </div>

        {/* Bouton d'envoi */}
        <button type="submit" className="btn-submit">
          Modifier l'article
        </button>

      </form>
    </div>
  )
}
