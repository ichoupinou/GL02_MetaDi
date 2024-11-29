// Importation du module readline pour interagir avec l'utilisateur via la console.
const readline = require("readline");

// Initialisation de l'interface readline.
const rl = readline.createInterface({
  input: process.stdin, // Définit l'entrée standard comme source d'entrée.
  output: process.stdout, // Définit la sortie standard comme destination de sortie.
});

// Fonction pour simuler un test interactif basé sur les questions d'un examen.
function simulerTest(examQuestions,callback) {
  // Vérifie si l'examen contient des questions.
  if (examQuestions.length === 0) {
    console.log("Aucun test disponible pour la simulation.");
    rl.close(); // Ferme l'interface readline si aucune question n'est disponible.
    return; // Termine la fonction.
  }

  let score = 0; // Initialise le score de l'utilisateur.
  let currentQuestion = 0; // Index pour suivre la question actuelle.

  // Fonction récursive pour poser les questions une par une.
  const askQuestion = () => {
    // Vérifie s'il reste des questions à poser.
    if (currentQuestion < examQuestions.length) {
      // Récupère la question actuelle.
      const question = examQuestions[currentQuestion];

      // Affiche le texte de la question.
      console.log(`\nQuestion ${currentQuestion + 1}: ${question.text}`);

      // Affiche les options disponibles, si elles existent.
      if (question.options && question.options.length > 0) {
        question.options.forEach((opt, i) => {
          console.log(`${i + 1}. ${opt}`); // Numérote chaque option pour faciliter la sélection.
        });
      } else {
        console.log("Aucune option disponible pour cette question !");
      }

      // Invite l'utilisateur à saisir sa réponse.
      rl.question("Votre réponse (numéro) : ", (answer) => {
        // Convertit la réponse utilisateur en index d'option.
        const selectedOption = question.options[Number(answer) - 1];

        // Vérifie si l'option choisie est correcte.
        if (selectedOption && question.correct.includes(selectedOption)) {
          console.log("Bonne réponse !");
          score++; // Incrémente le score en cas de bonne réponse.
        } else {
          // Affiche la ou les réponses correctes en cas d'erreur.
          console.log(
            `Mauvaise réponse. La bonne réponse était : ${question.correct.join(", ")}`
          );
        }

        currentQuestion++; // Passe à la question suivante.
        askQuestion(); // Appelle récursivement la fonction pour poser la question suivante.
      });
    } else {
      // Toutes les questions ont été posées : affiche le score total.
      console.log(`\nSimulation terminée. Score total : ${score}/${examQuestions.length}`);
      if (callback) callback();
      rl.close(); // Ferme l'interface readline après la fin du test.
    }
  };

  // Démarre la simulation en posant la première question.
  askQuestion();
}

// Exporte la fonction pour qu'elle puisse être utilisée dans d'autres modules.
module.exports = { simulerTest };
