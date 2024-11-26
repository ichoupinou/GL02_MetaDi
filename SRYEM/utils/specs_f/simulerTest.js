const readline = require("readline");

// Initialize readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function simulerTest(examQuestions) {
  if (examQuestions.length === 0) {
    console.log("Aucun test disponible pour la simulation.");
    rl.close(); // Close readline interface if no questions are available
    return;
  }

  let score = 0; // User's score
  let currentQuestion = 0; // Index of the current question

  const askQuestion = () => {
    if (currentQuestion < examQuestions.length) {
      const question = examQuestions[currentQuestion];

      // Display the question
      console.log(`\nQuestion ${currentQuestion + 1}: ${question.text}`);

      // Display options
      if (question.options && question.options.length > 0) {
        question.options.forEach((opt, i) => {
          console.log(`${i + 1}. ${opt}`);
        });
      } else {
        console.log("Aucune option disponible pour cette question !");
      }

      // Prompt for user input
      rl.question("Votre réponse (numéro) : ", (answer) => {
        const selectedOption = question.options[Number(answer) - 1]; // Map user input to option
        if (selectedOption && question.correct.includes(selectedOption)) {
          console.log("Bonne réponse !");
          score++;
        } else {
          console.log(
            `Mauvaise réponse. La bonne réponse était : ${question.correct.join(", ")}`
          );
        }

        currentQuestion++; // Move to the next question
        askQuestion(); // Recursively call the function to ask the next question
      });
    } else {
      console.log(`\nSimulation terminée. Score total : ${score}/${examQuestions.length}`);
      rl.close(); // Close readline interface after all questions
    }
  };

  askQuestion(); // Start asking questions
}

module.exports = { simulerTest };
