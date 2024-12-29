// Importation du module readline pour interagir avec l'utilisateur via la console.
const readline = require("readline");

// Initialisation de l'interface readline.
const rl = readline.createInterface({
  input: process.stdin, // Définit l'entrée standard comme source d'entrée.
  output: process.stdout, // Définit la sortie standard comme destination de sortie.
});

// Fonction pour simuler un test interactif basé sur les questions d'un examen.
function simulerTest(examQuestions, callback) {
  if (examQuestions.length === 0) {
    console.log("Aucun test disponible pour la simulation.");
    rl.close();
    return;
  }

  let score = 0;
  let currentQuestion = 0;
  console.log("--- Comment répondre aux questions? --- \n Pour répondre aux questions, entrez le numéro correspondant à la bonne réponse selon vous \n Pour les réponses multiples, entrez uniquement un des réponses, sinon la réponse sera fausse.");
  const askQuestion = () => {
    if (currentQuestion < examQuestions.length) {
      const question = examQuestions[currentQuestion];
      console.log(`\nQuestion ${currentQuestion + 1}: ${question.text} \n`);

      // Affichage des options pour QCM et Vrai/Faux
      if (question.options && question.options.length > 0) {
        question.options.forEach((opt, i) => {
          console.log(`${i + 1}. ${opt}`);
        });
        console.log("\n");
        rl.question("Votre réponse (numéro) : ", (answer) => {
          const selectedOption = question.options[Number(answer) - 1];
          if (selectedOption && question.correct.includes(selectedOption)) {
            console.log("Bonne réponse !");
            score++;
          } else {
            console.log(`Mauvaise réponse. La bonne réponse était : ${question.correct.join(", ")}`);
          }
          currentQuestion++;
          askQuestion();
        });
      } else if (question.type === "Ouverte") {
        // Gestion des questions ouvertes
        rl.question("Votre réponse (texte) : ", (answer) => {
          if (
            question.correct.some(
              (correctAnswer) => correctAnswer.toLowerCase() === answer.trim().toLowerCase()
            )
          ) {
            console.log("Bonne réponse !");
            score++;
          } else {
            console.log(`Mauvaise réponse. La bonne réponse était : ${question.correct.join(", ")}`);
          }

          currentQuestion++;
          askQuestion();
        });
      } else {
        console.log("Aucune option disponible pour cette question !");
        currentQuestion++;
        askQuestion();
      }
    } else {
      console.log("\n===================== FIN DU TEST =====================")
      console.log(`Simulation terminée. Score total : ${score}/${examQuestions.length}`);
      console.log("=======================================================\n");
      if (callback) callback();
      rl.close();
    }
  };

  askQuestion();
}

module.exports = { simulerTest };
