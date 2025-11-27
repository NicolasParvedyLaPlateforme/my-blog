import { Link } from 'react-router-dom'
import './Header.css'

export default function Header() {
    return (
        <header>
            <nav className="navbar">
                {/* Logo à gauche */}
                <Link to="/" className="navbar-logo">
                    MonBlog
                </Link>

                {/* Liens de navigation au centre/droite */}
                <ul className="navbar-links">
                    <li>
                        <Link to="/" className="nav-link">Accueil</Link>
                    </li>
                    <li>
                        <Link to="/articles" className="nav-link">Articles</Link>
                    </li>
                    <li>
                        <Link to="/articles/add" className="nav-link">Ajout d'un article</Link>
                    </li>
                    <li>
                        {/* Bouton de connexion distinct */}
                        <button className="btn-login" onClick={() => console.log('Connexion...')}>
                            Connexion
                        </button>
                    </li>
                </ul>
            </nav>
        </header>
    )
}
