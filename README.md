# cybertask (Application de gestion des taches)

## Table des Matières
- [Introduction](#introduction)
- [Installation](#installation)
- [Gestion des Tâches](#gestion-des-tâches)
- [Dashboard et Statistiques](#dashboard-et-statistiques)
- [Dockerisation](#dockerisation)
- [Déploiement sur Vercel ou Netlify](#déploiement-sur-vercel-ou-netlify)
- [Architecture du Projet](#architecture-du-projet)
- [API Backend](#api-backend)

---

## Introduction
Ce projet est une application de gestion des tâches développée avec Vue.js. L'application se connecte à une API backend en utilisant OAuth2 pour l'authentification. Elle permet aux utilisateurs de gérer leurs tâches et de visualiser des statistiques à l'aide de graphiques.

---


## Installation

### Prérequis
- Node.js (v14+)
- Docker (optionnel, pour le déploiement)

### Étapes pour installer le projet en local :

1. **Cloner le projet** :
   ```bash
    git clone https://github.com/haroldhang/cybertask.git
    cd cybertask
   ```
2. **Installer les dependances** :
   ```bash
    npm install
   ```

3. **Configurer les variables d'environnement** :
   ```bash
    VITE_API_URL=http://example.com/api # url de l'api backend
   ```

4. **Lancer le projet en mode développement**
    ```bash
    npm run dev
    ```

5. **Accéder à l'application**
    Ouvrez http://localhost:5173 dans votre navigateur

6. **Vous authentifier**
    Aller sur la page http://localhost:5173 et authentifer vous avec vos identifiants

---

## Gestion des Tâches

L'utilisateur peut :

*   Créer de nouvelles tâches.
    
*   Modifier des tâches existantes.
    
*   Supprimer ou marquer des tâches comme complétées.
    

Les tâches sont gérées via l’API /tasks.

---

## Dashboard et Statistiques

Le tableau de bord affiche des statistiques de base :

*   Nombre total de tâches.
    
*   Tâches complétées.
    
*   Tâches en attente.
    

Les graphiques sont générés à l'aide de la librairie **Chart.js** pour une représentation visuelle des données.

---

## Dockerisation
### Dockerfile
Le Dockerfile containerise l'application frontend

### Docker Compose
Un fichier docker-compose.yml permet de lancer facilement le frontend et le backend ensemble

### Lancer avec Docker Compose
    ```bash
    docker-compose up --build
    ```

---

## Déploiement sur Vercel ou Netlify

### Déployer sur Vercel :

1.  Connectez-vous à [Vercel](https://vercel.com/).
    
2.  Connectez votre dépôt GitHub.
    
3.  Configurez les variables d'environnement sur Vercel.
    
4.  Lancez le déploiement.
    

### Déployer sur Netlify :

1.  Connectez-vous à [Netlify](https://www.netlify.com/).
    
2.  Sélectionnez "New site from Git" et connectez votre dépôt GitHub.
    
3.  Configurez les variables d'environnement.
    
4.  Lancez le déploiement.

---

## Architecture du Projet
Voici la structure globale du projet :

```bash
├── public/              # Fichiers publics
├── src/                 
│   ├── assets/          # Images, Css et fichier statiques
│   ├── components/      # Composants Vue réutilisables
│   ├── layouts/         # Les layouts de l'application
│   ├── router/          # Configuration du routage
│   ├── services/        # Les fichiers de gestion des apis
│   ├── stores/          # Gestion de l'état (Pinia ici)
│   ├── views/           # Pages (Accueil, Dashboard, Login, etc.)
│   └── App.vue          # Composant racine
│   └── main.ts          # Configuration de l'application
├── Dockerfile           # Dockerfile pour containeriser le frontend
├── docker-compose.yml   # Fichier Docker Compose pour connecter le frontend au backend
└── README.md            # Documentation du projet
```

---

## API Backend

L'API backend offre les endpoints suivants :

*   **POST** /login : Authentification, renvoie un token JWT.
    
*   **GET** /tasks : Récupérer la liste des tâches.
    
*   **POST** /tasks : Créer une nouvelle tâche.
    
*   **PUT** /tasks/:id : Modifier une tâche.
    
*   **DELETE** /tasks/:id : Supprimer une tâche.

*   **PATCH** /tasks/:id/complete : Marquer une tache comme etant termine.

*   **GET** /tasks/stats : Recuperer les statistiques des tâches.

