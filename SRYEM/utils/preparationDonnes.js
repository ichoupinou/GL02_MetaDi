// Importation du module fs pour lire des fichiers dans le système.
const fs = require("fs");

// Fonction pour générer des mots-clés à partir d'une question
function genererMotsCles(question) {
  const motsCles = []; // Liste pour stocker les mots-clés générés
  const stopWords = ["the", "and", "for", "with", "that", "this", "a", "of", "in", "to", "is"]; // Liste de mots à ignorer

  // Ajoute le type de la question (s'il existe) comme mot-clé
  if (question.type) motsCles.push(question.type);

  // Divise le texte de la question en mots, ignore les mots de moins de 3 caractères et ceux présents dans la liste de mots à ignorer
  const motsTexte = question.text
    .split(/\s+/) // Sépare la question en mots
    .filter((mot) => mot.length > 3 && !stopWords.includes(mot.toLowerCase())); // Filtrage par longueur et mots à ignorer

  // Ajoute les mots extraits du texte de la question à la liste des mots-clés
  motsCles.push(...motsTexte);

  // Si la question contient des options, on les ajoute également comme mots-clés
  if (question.options) motsCles.push(...question.options);

  // Retourne un tableau de mots-clés uniques, tous en minuscules et sans le caractère "="
  return [...new Set(motsCles.map((mot) => mot.toLowerCase().replace("=", "")))];
}

// Fonction pour analyser un fichier GIFT et en extraire les questions
function analyserFichierGIFT(cheminFichier) {
  const contenu = fs.readFileSync(cheminFichier, "utf-8");
  const questions = [];
  const lignes = contenu.split("\n");

  let questionActuelle = null;
  let compteurQuestions = 0;
  const prefixeFichier = cheminFichier
    .split("/").pop()
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
        const optionsPart = opt[1].split("}")[0].trim(); // Récupère la partie des options de la question en divisant par les accolades
        console.log(optionsPart);

        // Si la question n'a pas d'option (question ouverte)
        if (optionsPart.includes(">")) {
          questionActuelle = {
            id: `${prefixeFichier}_Q${compteurQuestions}`.toLowerCase(),
            text: parts[2].split("{")[0].trim(),
            options: [], // Option Ouverte
            correct: [optionsPart.split(">")[1].trim()],
            type: "Ouverte", // Type spécifique
          };
        } else if (optionsPart === "False" || optionsPart === "True") {
          // Vérification spécifique pour les questions Vrai/Faux
          questionActuelle = {
            id: `${prefixeFichier}_Q${compteurQuestions}`.toLowerCase(),
            text: parts[2].split("{")[0].trim(),
            options: ["True", "False"], // Options Vrai/Faux
            correct: [optionsPart], // Réponse correcte 
            type: "Vrai/Faux", // Type spécifique
          };
        } else {
          // Si la question contient des options, il s'agit d'une question QCM
          const options = optionsPart.split("~").map((opt) => opt.trim());
          const parsedOptions = [];
          const correctOptions = [];

          options.forEach((opt) => {
            if (opt.startsWith("=")) {
              const correctOption = opt.replace("=", "").trim();
              parsedOptions.push(correctOption);
              correctOptions.push(correctOption);
            } else if (opt.includes("=")) {
              const parts = opt.split("="); // Divise l'option en deux parties (si elle contient "=")
              parsedOptions.push(parts[0].trim()); // Ajoute la première partie de l'option
              const correctOption = parts[1].trim();
              parsedOptions.push(correctOption); // Ajoute la partie correcte
              correctOptions.push(correctOption); // Ajoute la partie correcte à la liste des bonnes réponses
            } else {
              parsedOptions.push(opt); // Si l'option n'est pas correcte, on l'ajoute simplement
            }
          });

          questionActuelle = {
            id: `${prefixeFichier}_Q${compteurQuestions}`.toLowerCase(),
            text: parts[2].split("{")[0].trim(),
            options: parsedOptions,
            correct: correctOptions,
            type: correctOptions.length > 0 ? "QCM" : "Unknown",
          };
        }
      } else {
        questionActuelle = {
          id: `${prefixeFichier}_Q${compteurQuestions}`.toLowerCase(),
          text: parts[2].split("{")[0].trim(),
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
