// Importation du module fs pour lire des fichiers dans le système.
const fs = require("fs");

// Fonction pour générer des mots-clés à partir d'une question
function genererMotsCles(question) {
  const motsCles = [];
  const stopWords = [
    "the",
    "and",
    "for",
    "with",
    "that",
    "this",
    "a",
    "of",
    "in",
    "to",
    "is",
  ];

  // Divise et nettoie le texte de la question
  const motsTexte = question.text
    .replace(/[^\w\s]/g, "") // Supprime les caractères spéciaux
    .toLowerCase() // Convertit en minuscules
    .split(/\s+/) // Divise en mots
    .filter((mot) => mot.length > 3 && !stopWords.includes(mot)); // Filtre les mots courts et les stopwords

  motsCles.push(...motsTexte);

  // Ajoute les options comme mots-clés
  if (question.options) {
    motsCles.push(
      ...question.options.map(
        (opt) => opt.replace(/[^\w\s]/g, "").toLowerCase() // Nettoie et convertit en minuscules
      )
    );
  }

  // Retourne une liste unique de mots-clés
  return [...new Set(motsCles)];
}

// Nettoie et extrait le texte d'une question en supprimant les balises et les caractères superflus
function nettoyerTexteQuestion(texte) {
  return texte.replace(/[{}=~]/g, "").trim();
}

// Fonction pour analyser un fichier GIFT et en extraire les questions
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
    if (!ligne.trim()) return;

    if (ligne.startsWith("::")) {
      if (questionActuelle) {
        questionActuelle.keywords = genererMotsCles(questionActuelle);
        questions.push(questionActuelle);
      }

      compteurQuestions++;
      const parts = ligne.split("::");
      const opt = ligne.split("{");

      if (opt.length > 1) {
        const optionsPart = opt[1].split("}")[0].trim(); // Récupère les options
        const texteQuestion = nettoyerTexteQuestion(
          parts[2].split("{")[0].trim()
        );

        // Traitement des types de questions
        if (optionsPart.includes(">")) {
          questionActuelle = {
            id: `${prefixeFichier}_Q${compteurQuestions}`.toLowerCase(),
            text: texteQuestion,
            options: [],
            correct: [optionsPart.split(">")[1].trim()],
            type: "Ouverte",
          };
        } else if (optionsPart === "False" || optionsPart === "True") {
          questionActuelle = {
            id: `${prefixeFichier}_Q${compteurQuestions}`.toLowerCase(),
            text: texteQuestion,
            options: ["True", "False"],
            correct: [optionsPart],
            type: "Vrai/Faux",
          };
        } else {
          let options = [];
          let option = "";

          // Parcours de la chaîne optionsPart
          for (let i = 0; i < optionsPart.length; i++) {
            const char = optionsPart[i];

            if (char !== "=" && char !== "~") {
              option += char; // Construire l'option caractère par caractère
            } else {
              // Ajouter l'option actuelle si elle n'est pas vide
              option = option.trim();
              if (option.length > 0) {
                options.push(option);
              }

              // Identifier les options correctes ou incorrectes
              if (char === "=") {
                option = "="; // Marquer l'option comme correcte
              } else {
                option = ""; // Préparer pour une nouvelle option incorrecte
              }
            }
          }

          // Ajouter la dernière option après la boucle
          option = option.trim();
          if (option.length > 0) {
            options.push(option);
          }

          // // Diviser les options par `~` et gérer `=` pour identifier les bonnes réponses
          // const options = optionsPart
          //   .split(/~|=/) // Divise par `~` ou `=` pour couvrir les deux cas
          //   .map((opt) => opt.trim()) // Nettoie les espaces autour de chaque option
          //   .filter((opt) => opt.length > 0); // Évite les options vides

          const parsedOptions = [];
          const correctOptions = [];

          options.forEach((opt) => {
            if (opt.startsWith("=")) {
              const correctOption = opt.replace("=", "").trim();
              parsedOptions.push(correctOption);
              correctOptions.push(correctOption);
            } else {
              parsedOptions.push(opt);
            }
          });

          questionActuelle = {
            id: `${prefixeFichier}_Q${compteurQuestions}`.toLowerCase(),
            text: texteQuestion,
            options: parsedOptions,
            correct: correctOptions,
            type: "QCM",
          };
        }
      } else {
        questionActuelle = {
          id: `${prefixeFichier}_Q${compteurQuestions}`.toLowerCase(),
          text: nettoyerTexteQuestion(parts[2].trim()),
          options: [],
          correct: [],
          type: "Unknown",
        };
      }
    }
  });

  if (questionActuelle) {
    questionActuelle.keywords = genererMotsCles(questionActuelle);
    questions.push(questionActuelle);
  }

  return questions;
}

// Exporte la fonction pour l'utiliser dans d'autres modules
module.exports = { analyserFichierGIFT };
