// Importation des données et des fonctions nécessaires
// `banqueQuestions` : Contient la banque de toutes les questions disponibles.
// `questionsExamen` : Contient les questions ajoutées à l'examen en cours.
const { banqueQuestions, questionsExamen } = require("./data/banqueQuestions");

// Importation de la fonction pour rechercher des questions dans la banque.
const {
  rechercherQuestions,
} = require("./utils/specs_f/rechercherQuestions");

// Importation des fonctions pour gérer les questions dans l'examen.
// Inclut l'ajout de questions individuelles ou multiples, et l'affichage des questions.
const {
  ajouterQuestionDansExamen,
  ajouterToutesLesQuestions,
  afficherQuestionsExamen,
} = require("./utils/specs_f/gererExamen");

// Importation de la fonction pour créer un fichier au format GIFT.
// Ce format est utilisé pour exporter les questions d'un examen.
const { creerTestGIFT } = require("./utils/specs_f/creerTestGIFT");

// Importation de la fonction pour simuler un test basé sur les questions d'examen.
const { simulerTest } = require("./utils/specs_f/simulerTest");

// Configuration de l'interface de ligne de commande pour interagir avec l'utilisateur.
// `readline` permet de lire les entrées utilisateur depuis le terminal.
const readline = require("readline").createInterface({
  input: process.stdin, // Flux d'entrée : généralement le clavier.
  output: process.stdout, // Flux de sortie : généralement l'affichage terminal.
  terminal: false, // Désactive l'écho automatique des entrées (utile pour ne pas afficher les caractères saisis).
});

// Fonction qui affiche le menu et gère les choix de l'utilisateur
function afficherMenu() {
  console.log("--------------------------------------------------");
  console.log("Bienvenue dans l'outil de gestion d'examens !");
  console.log("1. Rechercher une question");
  console.log("2. Ajouter une question à l'examen");
  console.log("3. Ajouter toutes les questions à l'examen");
  console.log("4. Afficher les questions de l'examen");
  console.log("5. Créer un examen au format GIFT");
  console.log("6. Simuler un test");
  console.log("7. Quitter");
  console.log("--------------------------------------------------");
}

// Fonction principale qui gère la logique du menu.
function menuPrincipal() {
  afficherMenu(); // Affiche le menu principal

  // Attente de l'entrée utilisateur pour choisir une option du menu.
  readline.question("Choisissez une option (ou tapez 'exit' pour quitter) : ", (option) => {
    if (option === 'exit') {
      console.log("Au revoir !");
      readline.close(); // Ferme l'interface readline pour quitter le programme.
      return;
    }

    // Gestion des différentes options possibles selon le choix de l'utilisateur.
    switch (option) {
      case "1": // Rechercher une question dans la banque.
        console.log("Entrez un mot-clé : ")
        readline.question("> ", (motCle) => {
          // Appelle la fonction pour rechercher les questions correspondant au mot-clé.
          console.log("\n");
          rechercherQuestions(motCle, banqueQuestions);
          console.log("\n");
          menuPrincipal(); // Retourne au menu principal après l'exécution.
        });
        break;

      case "2": // Ajouter une question spécifique à l'examen.
        console.log("Ajout d'une question à l'examen : ");
        readline.question("> ", (id) => {
          // Appelle la fonction pour ajouter une question à partir de son ID.
          console.log("\n");
          ajouterQuestionDansExamen(id, banqueQuestions, questionsExamen);
          console.log("\n");
          menuPrincipal(); // Retourne au menu principal après l'exécution.
        });
        break;

      case "3": // Ajouter toutes les questions de la banque à l'examen.
        // Appelle la fonction qui transfère toutes les questions de la banque à l'examen.
        console.log("\n");
        ajouterToutesLesQuestions(banqueQuestions, questionsExamen);
        console.log("\n");
        menuPrincipal(); // Retourne au menu principal après l'exécution.
        break;

      case "4": // Afficher les questions déjà ajoutées à l'examen.
        // Appelle la fonction pour afficher toutes les questions contenues dans l'examen.
        console.log("\n");
        afficherQuestionsExamen(questionsExamen);
        console.log("\n");
        menuPrincipal(); // Retourne au menu principal après l'exécution.
        break;

      case "5": // Créer un fichier d'examen au format GIFT.
        // Appelle la fonction qui génère un fichier GIFT contenant les questions de l'examen.
        console.log("\n");
        creerTestGIFT(questionsExamen);
        console.log("\n");
        menuPrincipal(); // Retourne au menu principal après l'exécution.
        break;

        case "6":
        console.log("\n");
        simulerTest(questionsExamen, menuPrincipal); // Appelle menu() une fois que simulerTest est terminé.
        break;

      case "7": // Quitter le programme.
        console.log("Au revoir !");
        readline.close(); // Ferme l'interface readline, terminant ainsi le programme.
        break;

      default: // Gestion des cas où l'utilisateur entre une option invalide.
        console.log("Option invalide. Réessayez.");
        menuPrincipal(); // Retourne au menu principal pour permettre une nouvelle saisie.
    }
  });
}

// Lancement du programme en appelant la fonction principale pour afficher le menu et traiter les choix.
menuPrincipal();
