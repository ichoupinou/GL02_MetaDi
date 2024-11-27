const { banqueQuestions, questionsExamen } = require("./data/banqueQuestions");
const {
  rechercherQuestions,
} = require("./utils/specs_f/rechercherQuestions");
const {
  ajouterQuestionDansExamen,
  ajouterToutesLesQuestions,
  afficherQuestionsExamen,
} = require("./utils/specs_f/gererExamen");
const { creerTestGIFT } = require("./utils/specs_f/creerTestGIFT");
const { simulerTest } = require("./utils/specs_f/simulerTest");

const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false, // Désactive l'écho automatique du terminal
});

// Menu principal
console.log("Bienvenue dans l'outil de gestion d'examens !");
console.log("1. Rechercher une question");
console.log("2. Ajouter une question à l'examen");
console.log("3. Ajouter toutes les questions à l'examen"); 
console.log("4. Afficher les questions de l'examen");
console.log("5. Créer un examen au format GIFT");
console.log("6. Simulate Test Passing");
console.log("7. Quitter");

function main() {
  readline.question("Choisissez une option : ", (option) => {
    switch (option) {
      case "1": // Rechercher une question
        readline.question("Entrez un mot-clé : ", (motCle) => {
          rechercherQuestions(motCle, banqueQuestions);
          main();
        });
        break;

      case "2": // Ajouter une question à l'examen
        readline.question("Entrez l'ID de la question à ajouter : ", (id) => {
          ajouterQuestionDansExamen(id, banqueQuestions, questionsExamen);
          main();
        });
        break;

      case "3": // Ajouter toutes les questions à l'examen
        ajouterToutesLesQuestions(banqueQuestions, questionsExamen);
        main();
        break;

      case "4": // Afficher les questions de l'examen
        afficherQuestionsExamen(questionsExamen);
        main();
        break;

      case "5": // Créer un examen au format GIFT
        creerTestGIFT(questionsExamen);
        main();
        break;

        case "6": // Simulate Test Passing
        simulerTest(questionsExamen);
        main();
        break;

      case "7": // Quitter
        console.log("Au revoir !");
        readline.close();
        break;

      default:
        console.log("Option invalide. Réessayez.");
        main();
    }
  });
}

main();
