const { analyserFichierGIFT } = require("../utils/preparationDonnes");

const fichiersGIFT = [
  "./data/sample.gift"
];

// Charger toutes les questions des fichiers GIFT
const banqueQuestions = fichiersGIFT.flatMap((fichier) => analyserFichierGIFT(fichier));


let questionsExamen = []; // Liste mutable pour les questions sélectionnées dans un examen

function reinitialiserExamen() {
  questionsExamen = [];
}

module.exports = { banqueQuestions, questionsExamen, reinitialiserExamen };
