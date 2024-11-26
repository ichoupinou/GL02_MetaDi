const fs = require("fs");

// Function to generate keywords
function genererMotsCles(question) {
  const motsCles = [];
  const stopWords = ["the", "and", "for", "with", "that", "this", "a", "of", "in", "to", "is"];

  if (question.type) motsCles.push(question.type);

  const motsTexte = question.text
    .split(/\s+/)
    .filter((mot) => mot.length > 3 && !stopWords.includes(mot.toLowerCase()));
  motsCles.push(...motsTexte);

  if (question.options) motsCles.push(...question.options);

  return [...new Set(motsCles.map((mot) => mot.toLowerCase().replace("=", "")))];
}

// Function to analyze a GIFT file
function analyserFichierGIFT(cheminFichier) {
  const contenu = fs.readFileSync(cheminFichier, "utf-8");
  const questions = [];
  const lignes = contenu.split("\n");

  let questionActuelle = null;
  let compteurQuestions = 0;
  const prefixeFichier = cheminFichier
    .split("/")
    .pop()
    .replace(".gift", "")
    .replace(/[^a-zA-Z0-9]/g, "_");

  lignes.forEach((ligne) => {
    if (!ligne.trim()) return; // Ignore empty lines

    if (ligne.startsWith("::")) {
      if (questionActuelle) {
        questionActuelle.keywords = genererMotsCles(questionActuelle);
        questions.push(questionActuelle);
      }

      compteurQuestions++;
      const parts = ligne.split("::");
      const opt = ligne.split("{");
      if (opt.length > 1) {
        const optionsPart = opt[1].split("}")[0];
        const options = optionsPart
          .split("~") // Split options by "~"
          .map((opt) => opt.trim()) // Remove leading/trailing spaces
          .filter((opt) => opt !== ""); // Remove empty strings

        const parsedOptions = [];
        const correctOptions = [];

        options.forEach((opt) => {
          if (opt.startsWith("=")) {
            const correctOption = opt.replace("=", "").trim();
            parsedOptions.push(correctOption); // Add to options
            correctOptions.push(correctOption); // Add to correct
          } else if (opt.includes("=")) {
            const parts = opt.split("=");
            parsedOptions.push(parts[0].trim());
            const correctOption = parts[1].trim();
            parsedOptions.push(correctOption); // Add both parts to options
            correctOptions.push(correctOption); // Add correct part
          } else {
            parsedOptions.push(opt); // Add to options
          }
        });

        questionActuelle = {
          id: `${prefixeFichier}_Q${compteurQuestions}`.toLowerCase(),
          text: parts[2].split("{")[0].trim(),
          options: parsedOptions,
          correct: correctOptions,
          type: null,
        };
      } else {
        questionActuelle = {
          id: `${prefixeFichier}_Q${compteurQuestions}`.toLowerCase(),
          text: parts[2].split("{")[0].trim(),
          options: [],
          correct: [],
          type: null,
        };
      }

      questionActuelle.type = questionActuelle.correct.length > 0 ? "QCM" : "Unknown";
    }
  });

  if (questionActuelle) {
    questionActuelle.keywords = genererMotsCles(questionActuelle);
    questions.push(questionActuelle);
  }

  return questions;
}

module.exports = { analyserFichierGIFT };
