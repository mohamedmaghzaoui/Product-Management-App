# 🚀 **Projet Fullstack - Gestion des Produits et Catégories** 

## 📜 **Préambule**

Bienvenue dans ma solution au test technique pour le poste d’alternant développeur full-stack chez Teach’r !

Ce projet a pour objectif de démontrer mes compétences en **React.js** et **Symfony**. Il implique la création d'une application fullstack permettant de gérer des produits et des catégories via une API Symfony côté backend et un frontend en React.js.

---

## 🎯 **Objectif**

L'application permet de :
1. **Gérer les produits** : Créer, lire, mettre à jour et supprimer des produits.
2. **Gérer les catégories** : Créer, lire, mettre à jour et supprimer des catégories.
3. **Frontend React** : Consommer l'API Symfony et gérer l'affichage des données dans une interface utilisateur.
4. **Backend Symfony** : Fournir une API RESTful pour la gestion des produits et des catégories.

---

## ⚙️ **Choix Techniques**

### **Backend - Symfony** 

J'ai choisi **Symfony** pour le backend car il est l'un des frameworks PHP les plus robustes et mature pour créer des API RESTful. Il facilite la gestion des routes, la validation des données et l'intégration de la base de données. 

### **Frontend - React.js avec Vite**

J'ai utilisé **React.js** pour le frontend car c'est une bibliothèque moderne, performante et flexible pour créer des interfaces utilisateur dynamiques et réactives. 

J'ai opté pour **Vite** comme outil de développement pour React pour les raisons suivantes :
- **Temps de démarrage ultra-rapide** : Vite utilise *esbuild*, ce qui permet un démarrage presque instantané et une mise à jour rapide des fichiers modifiés.
- **Simplicité de configuration** : Vite nécessite peu de configuration, ce qui m'a permis de me concentrer sur le développement sans perdre de temps avec des réglages complexes.
### **Tailwind CSS**
J'ai aussi utilisé **Tailwind** pour la mise en page, ce qui permet de styliser l'application de manière modulaire et réutilisable 
### **Redux**
Pour gérer l'état global de l'application et assurer une synchronisation entre les différentes vues, j'ai utilisé **Redux**. Cela permet de centraliser la gestion de l'état des produits et des catégories, tout en facilitant la gestion des interactions utilisateur à travers l'application.
## 🛠  **Instructions d'Installation**
### Prérequis
Avant de commencer, assurez-vous d'avoir installé les éléments suivants sur votre machine :

**Node.js** (version 14 ou supérieure) : Vous pouvez télécharger Node.js ici : https://nodejs.org/
**PHP** (version 8.0 ou supérieure) : Téléchargez PHP à partir de https://www.php.net/downloads.php.
**Composer** : Le gestionnaire de dépendances PHP, nécessaire pour **Symfony**. Installez-le depuis https://getcomposer.org/download/.

### Étapes d'Installation
#### 1. Clonez le projet
```bash
git clone https://github.com/mohamedmaghzaoui/Product-Management-App.git
cd product-app
```
#### 2. Backend - Installation de Symfony
Accédez au dossier backend et installez les dépendances Symfony :
```bash
cd backend
composer install
```
#### 3. Frontend - Installation de React
Accédez au dossier frontend et installez les dépendances de React avec Vite :
```bash
cd frontend
npm install
```
#### 4. Lancer l'Application
**Backend** : Démarrez le serveur Symfony :
```bash
cd backend
symfony server:start
```
**Frontend** : Démarrez l'application React avec Vite :
```bash
cd frontend
npm run dev
```

L'application frontend sera accessible sur http://localhost:5173, et l'API backend sera disponible à http://localhost:8000.

## 🧑‍💻 **Description des Routes API**

### **Produits**

- **POST** `/products`: Crée un nouveau produit.
  - **Body**:
    ```json
    { 
      "name": "Nom du produit", 
      "description": "Description du produit", 
      "price": 99.99, 
      "category": 1 
    }
    ```
  - **Response**: `201 Created` en cas de succès.

- **GET** `/products`: Récupère tous les produits.
  - **Response**: 
    ```json
    [
      {
        "id": 1,
        "name": "Produit 1",
        "description": "Description du produit 1",
        "price": 99.99,
        "category": 1,
        "createdAt": "2024-12-04T12:00:00"
      },
      {
        "id": 2,
        "name": "Produit 2",
        "description": "Description du produit 2",
        "price": 49.99,
        "category": 2,
        "createdAt": "2024-12-04T12:05:00"
      }
    ]
    ```

- **PUT** `/products/{id}`: Modifie un produit existant.
  - **Body**:
    ```json
    { 
      "name": "Produit mis à jour", 
      "description": "Nouvelle description du produit", 
      "price": 129.99, 
      "category": 1 
    }
    ```
  - **Response**: `200 OK` en cas de succès.

- **DELETE** `/products/{id}`: Supprime un produit.
  - **Response**: `200 OK` en cas de succès.

### **Catégories**

- **POST** `/categories`: Crée une nouvelle catégorie.
  - **Body**:
    ```json
    { 
      "name": "Catégorie 1" 
    }
    ```
  - **Response**: `201 Created` en cas de succès.

- **GET** `/categories`: Récupère toutes les catégories.
  - **Response**: 
    ```json
    [
      {
        "id": 1,
        "name": "Catégorie 1"
      },
      {
        "id": 2,
        "name": "Catégorie 2"
      }
    ]
    ```

- **PUT** `/categories/{id}`: Modifie une catégorie existante.
  - **Body**:
    ```json
    { 
      "name": "Catégorie mise à jour" 
    }
    ```
  - **Response**: `200 OK` en cas de succès.

- **DELETE** `/categories/{id}`: Supprime une catégorie.
  - **Response**: `200 OK` en cas de succès.
