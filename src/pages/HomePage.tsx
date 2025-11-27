import React from 'react';

export default function HomePage() {
  // Données fictives pour simuler une API ou un CMS
  const posts = [
    {
      id: 1,
      title: "Introduction à React 19",
      excerpt: "Découvrez les nouvelles fonctionnalités comme le compilateur automatique et les actions serveurs.",
      date: "27 Nov 2025",
      category: "Développement",
      imageUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1000&auto=format&fit=crop"
    },
    {
      id: 2,
      title: "Le futur du CSS",
      excerpt: "Comment les variables CSS et les conteneurs de requêtes changent la façon dont nous designons.",
      date: "25 Nov 2025",
      category: "Design",
      imageUrl: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?q=80&w=1000&auto=format&fit=crop"
    },
    {
      id: 3,
      title: "Productivité pour les dévs",
      excerpt: "Une liste d'outils essentiels pour booster votre workflow quotidien sans vous épuiser.",
      date: "20 Nov 2025",
      category: "Lifestyle",
      imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1000&auto=format&fit=crop"
    }
  ];

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
          {posts.map((post) => (
            <article key={post.id} className="card post-card">
              <img 
                src={post.imageUrl} 
                alt={post.title} 
                className="post-image" 
                loading="lazy"
              />
              <div className="post-content">
                <div className="post-meta">
                  {post.category} • {post.date}
                </div>
                <h3 className="post-title">{post.title}</h3>
                <p className="post-excerpt">{post.excerpt}</p>
                <a href={`/post/${post.id}`} className="read-more">
                  Lire l'article →
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}