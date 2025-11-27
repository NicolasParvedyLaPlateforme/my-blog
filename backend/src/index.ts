import express, { Request, Response } from 'express';
import fs from 'fs/promises'
import path from 'path';
import { Article, Database } from './types'; // On importe nos types
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware pour comprendre le JSON envoyé par le client (important pour les POST plus tard)
app.use(express.json());
app.use(cors());

// Chemin vers ton fichier JSON
// path.join assure que ça marche sur Windows et Mac
const dbPath = path.join(__dirname, './data/db.json');

// --- ROUTES ---

// 1. Récupérer tous les articles (GET)
app.get('/articles', async (req: Request, res: Response) => {
  try {
    // 1. On lit le fichier
    const data = await fs.readFile(dbPath, 'utf-8');
    // 2. On le transforme en objet JS typé
    const db: Database = JSON.parse(data);
    
    // 3. On renvoie la liste
    res.json(db.articles);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la lecture des données" });
  }
});

// 2. Récupérer un seul article par ID (GET)
app.get('/articles/:id', async (req: Request, res: Response) => {
  try {
    const data = await fs.readFile(dbPath, 'utf-8');
    const db: Database = JSON.parse(data);
    
    // .find() est une méthode JS standard sur les tableaux
    const article = db.articles.find(art => art.id === req.params.id);

    if (!article) {
       // Si pas trouvé, on renvoie 404
       res.status(404).json({ message: "Article non trouvé" });
       return; // Important de return pour arrêter la fonction
    }

    res.json(article);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});

app.post('/articles', async (req: Request, res: Response) => {
  try {
    // 1. On affiche UNIQUEMENT le corps de la requête (les données envoyées)
    console.log("Données reçues :", req.body);

    // 2. IMPORTANT : On renvoie une réponse au client pour dire "C'est bon !"
    // Le return ici sert juste à arrêter la fonction, c'est une bonne pratique.
    res.status(200).json({ 
      message: "Bravo, données bien reçues par le serveur",
      data_received: req.body 
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});