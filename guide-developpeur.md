# Guide du Développeur - Système de Gestion d'Examens

## 1. Introduction

Le Système de Gestion d'Examens est une application Node.js permettant de :
- Gérer des banques de questions
- Créer des examens personnalisés
- Exporter au format GIFT pour Moodle
- Simuler des tests
- Visualiser des statistiques d'examen

## 2. Organisation du Programme

### Flux de Données
```
main.js
   ├─ banqueQuestions.js (Données) X
   └─ utils/
      ├─preparationDonne.js X
      └─ utils/spec_f/
         ├─ rechercherQuestions.js
         ├─ gererExamen.js
         ├─ creerTestGIFT.js
         ├─ simulerTest.js
         ├─ genererVCard.js
         └─ visualiserQuestions.js
   └─data/
      └─sample.gift X
   └─test_generer/
      └─examen.gift X

```

### Fichiers Principaux
- `banqueQuestions.js` - Gestion centrale et stockage des questions
- `preparationDonnes.js` - Parser GIFT vers objets JS
- `rechercherQuestions.js` - Moteur de recherche par mots-clés
- `gererExamen.js` - Composition et gestion des examens
- `creerTestGIFT.js` - Export format GIFT pour Moodle
- `simulerTest.js` - Test interactif en CLI
- `genererVCard.js` - Création fiches contacts enseignants
- `visualiserQuestions.js` - Statistiques et graphiques des questions

### Fichiers des tests unitaires
*   `analyserFichierGIFT.spec.js`
*   `creerTestGIFT.spec.js`
*   `genererVCard.spec.js`
*   `gererExam.spec.js`
*   `rechercherQuestions.spec.js`
*   `visualiserQuestions.spec.js`

## 3. Fonctionnalités Principales

### Gestion des Questions
- Questions stockées avec : id, texte, type, options, réponses correctes, mots-clés
- Types supportés : QCM, Vrai/Faux, Questions ouvertes

#### exemple structure de banqueQuestion
```
[
 {
   id: "examen_q1",
   text: "What is the capital of France?",
   options: ["Paris", "London", "Berlin"],
   correct: ["Paris"],
   type: "QCM",
   keywords: ["capital", "france", "paris", "london", "berlin"]
 },
 {
   id: "examen_q2", 
   text: "Why is JavaScript popular?",
   options: [],
   correct: ["JavaScript is popular because it's versatile and runs in browsers"],
   type: "Ouverte",
   keywords: ["javascript", "popular", "versatile", "browsers"]
 },
 {
   id: "examen_q3",
   text: "Is JavaScript a compiled language?",
   options: ["True", "False"],
   correct: ["False"],
   type: "Vrai/Faux",
   keywords: ["javascript", "compiled", "language"]
 }
]
```

### Opérations Clés
1. ##### Création de la Banque de Question (`banqueQuestions.js`) :
   appelle fonction `analyserFichierGIFT` se trouvant dans `preparationDonnes.js`
   - Création des variables à l'aide du parser

   *variables et fonction exportées :*
   -> `banqueQuestions` variable
   -> `questionsExamen` variable
   -> `reinitialiserExamen` fonction (inutilisée)

1. ##### Parser GIFT (`preparationDonnes.js`):
   utilise module `fs` pour lire fichier GIFT
   - Analyser des fichiers GIFT et les convertir en structure de données exploitable
   - Nettoyer et formater les données

   *fonction exportée :*
   -> `analyserFichierGIFT` fonction utilisée dans `banqueQuestions.js`

1. ##### Recherche (`rechercherQuestions.js`):
   - Recherche par mots-clés
   - Correspondance insensible à la casse
   - Affichage formaté avec indicateurs correct/incorrect

   *fonction exportée :*
   -> `rechercherQuestions` fonction 

2. ##### Création d'Examen (`gererExamen.js`):
   - Ajout de questions individuelles
   - Ajout en masse
   - Prévention des doublons
   - Prévisualisation

   *fonctions exportées :*
   -> `ajouterQuestionDansExamen` fonction utilisée dans `main.js`
   -> `ajouterToutesLesQuestions` fonction utilisée dans `main.js`
   -> `afficherQuestionsExamen` fonction utilisée dans `main.js`
   -> `afficherToutesLesQuestions`fonction utilisée dans `main.js`

3. ##### Export GIFT (`creerTestGIFT.js`):
   utilise module `fs` pour écrire fichier GIFT
   - Conversion vers format Moodle
   - Gestion des caractères spéciaux
   - Génération fichier structuré

   *fonction exportée :*
   -> `creerTestGIFT`fonction

4. ##### Simulation (`simulerTest.js`):
   - Test interactif en CLI
   - Suivi des scores
   - Support multi-types de questions
   - Retour immédiat

   *fonction exportée :*
   -> `simulerTest` fonction utilisée dans main

5. ##### Génération VCard (`genererVCard.js`):
   utilise module `fs` pour écrire fichier VCard
   - Création de cartes de contact pour enseignants
   - Format VCard 3.0
   - Gestion des informations personnelles et professionnelles
   - Export en fichier .vcf

   *variables exportées :*
   -> `genererVCard`fonction

6. ##### Visualisation (`visualiserQuestions.js`):
   utilise `fs`, `vega` et `vega-lite`pour faire représentation graphique et l'afficher
   - Analyse statistique des types de questions
   - Génération d'histogrammes avec Vega-Lite
   - Export en format PNG
   - Visualisation des distributions de questions

   *fonctions exportées :*
   -> `visualiserQuestions` fonction utilisée dans le `main.js`
   -> `genererHistogramme` fonction utilisée dans le `main.js` 

### Dépendances Externes
- `vega`: Visualisation de données
- `vega-lite`: Création de graphiques
- `fs`: Opérations fichiers

### Liste hiérarchique avec indentation des dépendances
*   main.js
    *   gererExamen.js
    *   simulerTest.js
    *   creerTestGIFT.js
    *   genererVCard.js
    *   visualiserQuestions.js
        *   fs
        *   vega
        *   vega-lite
*   banqueQuestions.js
    *   preparationDonnes.js
        *   fs
*   creerTestGIFT.js
    *   fs
*   genererVCard.js
    *   fs

## 4. Conventions de Code
- camelCase pour nom de fonctions et variables
- Gestion d'erreurs
- Documentation JSDoc

## 5. Pistes d'évolution à court/moyen terme

*   **Amélioration de la recherche**
    *   Problème actuel : La recherche est basée sur des mots-clés.
    *   Solution proposée :
        *   Implémenter la recherche sur le texte des questions en plus des mots-clés.
        *   Utiliser une recherche "fuzzy" (approximative) pour gérer les fautes de frappe ou les variations de mots.
    *   Exemple : Une recherche "capitale pays Europe" trouverait "Quelle est la capitale de la France ?" même sans le mot-clé "France".

*   **Amélioration de la simulation de test**
    *   Problème actuel : Test interactif en CLI (interface en ligne de commande).
    *   Solution proposée :
        *   Ajouter un mode "entraînement" (réponse et explication immédiates).
        *   Permettre la sauvegarde des résultats (CSV/JSON).

*   **Amélioration de la gestion des questions**
    *   Problème actuel : L'édition des questions est impossible sur le programme.
    *   Solution proposée :
        *   Fonction d'ajout de questions depuis le programme
        *   Validation du format des questions avant l'ajout.
        *   Génération automatique d'identifiants uniques pour chaque question.
