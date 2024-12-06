Voici un exemple de fichier **README.md** pour votre projet :

---

# SRYEM

## Description
SRYEM est un projet permettant de générer et d'analyser des fichiers GIFT pour des examens. Vous pouvez exécuter ce projet dans le terminal pour interagir avec les données ou sur une page web pour une interface visuelle.

---

## Installation

1. **Cloner le dépôt**  
   Assurez-vous de cloner le projet sur votre machine locale :

   ```bash
   git clone <URL_DU_DEPOT>
   ```

2. **Naviguer dans le dossier du projet**  
   Déplacez-vous dans le dossier du projet :

   ```bash
   cd SRYEM
   ```

3. **Installer les dépendances**  
   Installez les dépendances nécessaires avec la commande suivante :

   ```bash
   npm i
   ```

---

## Lancer le projet

### 1. **Exécuter dans le terminal**
   Pour exécuter le projet dans le terminal, utilisez la commande suivante :

   ```bash
   node main
   ```

   Cela affichera les résultats directement dans le terminal.

### 2. **Exécuter avec une page web**
   Pour exécuter le projet dans une page web, utilisez la commande suivante :

   ```bash
   node server
   ```

   Ensuite, ouvrez votre navigateur et rendez-vous à l'adresse :

   ```
   http://localhost:3000
   ```

---

## Structure du projet

Voici un aperçu des principaux fichiers et dossiers de ce projet :

- **`main.js`** : Point d'entrée pour exécuter le projet dans le terminal.
- **`server.js`** : Serveur web pour afficher les résultats dans un navigateur.
- **`utils/`** : Contient les fonctions utilitaires pour analyser et gérer les fichiers GIFT.
- **`spec/`** : Contient les tests Jasmine pour vérifier le fonctionnement du projet.
- **`examen.gift`** : Exemple de fichier GIFT utilisé dans le projet.

---

## Tests

Pour exécuter les tests unitaires, utilisez la commande suivante :

```bash
npm test
```

Cela permettra de vérifier que toutes les fonctionnalités fonctionnent comme prévu.

---

## Technologies utilisées

- **Node.js** : Pour exécuter le projet.
- **Jasmine** : Pour les tests unitaires.
- **Express** (si utilisé) : Pour le serveur web.
- **HTML** (si utilisé) : Pour l'interface web.