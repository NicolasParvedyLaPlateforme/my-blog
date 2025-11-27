import { useState } from "react"
import type { ChangeEvent } from "react";
import type { Article } from "../components/Article/Article"
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

type ArticleAdd = Omit<Article, 'id'>;

export default function ArticlesAddPage() {

  const [article, setArticle] = useState<ArticleAdd>({
    title: '',
    excerpt: '',
    date: new Date().toISOString().split('T')[0], // Date du jour par défaut
    category: '',
    imageUrl: 'https://picsum.photos/800/400',
    content: ''
  })

  const navigate = useNavigate();

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>){
    const { name, value } = e.target;
    //On fait un callback qui recupère les anciens données de l'article sauf celui qui est indiqué dans name, et name corresponds à la propriété name de notre input, exemple title, ou content 
    setArticle(prev => ({...prev, [name]: value}))
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault();

    fetch('http://localhost:3000/articles', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(article)
    })
      .then((res) => {
        if (!res.ok) toast("Une erreur est survenu");
        console.log(res);
        return res.json()
      })
      .then((res) => {
        console.log(res);
        // navigate('/articles/' + res.id)
      })
  }
  return (
    <div className="form-container card">
      <h1>Ajouter un nouvel article</h1>

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
          Envoyer l'article
        </button>

      </form>
    </div>
  )
}
