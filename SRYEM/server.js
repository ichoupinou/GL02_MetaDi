const express = require('express');
const path = require('path');
const app = express();

// Importation des fonctions nécessaires
const { banqueQuestions, questionsExamen } = require("./data/banqueQuestions");
const { rechercherQuestions } = require("./utils/specs_f/rechercherQuestions");
const { ajouterQuestionDansExamen, afficherQuestionsExamen } = require("./utils/specs_f/gererExamen");
const { visualiserQuestions } = require("./utils/specs_f/visualiserQuestions");

// Servir les fichiers statiques depuis le dossier 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Route principale : renvoie la page HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API : Rechercher une question dans la banque
app.get('/api/rechercher/:motCle', (req, res) => {
    const motCle = req.params.motCle;
    const resultats = rechercherQuestions(motCle, banqueQuestions);
    res.json(resultats);
});

// API : Ajouter une question à l'examen
app.get('/api/ajouter/:id', (req, res) => {
    const id = req.params.id;
    const resultat = ajouterQuestionDansExamen(id, banqueQuestions, questionsExamen);
    console.log("appel de la fonction ajouterQuestionDansExamen");
    console.log(resultat);
    res.json(resultat); // Renvoie un message de confirmation ou d'erreur.
});

// API : Afficher les questions de l'examen
app.get('/api/questions-examen', (req, res) => {
    res.json(questionsExamen);
});

// API : Visualiser le profil d’un examen
app.get('/api/profil-examen', (req, res) => {
    const profil = visualiserQuestions(questionsExamen);
    res.json(profil);
});

// Démarrage du serveur
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
