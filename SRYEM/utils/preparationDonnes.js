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
  // Lit le contenu du fichier GIFT
  const contenu = fs.readFileSync(cheminFichier, "utf-8");
  const questions = []; // Liste des questions extraites du fichier
  const lignes = contenu.split("\n"); // Sépare le contenu du fichier en lignes

  let questionActuelle = null; // Variable pour stocker la question en cours de traitement
  let compteurQuestions = 0; // Compteur pour l'index des questions
  // Utilise le nom du fichier (sans extension) comme préfixe pour les identifiants des questions
  const prefixeFichier = cheminFichier
    .split("/")
    .pop()
    .replace(".gift", "")
    .replace(/[^a-zA-Z0-9]/g, "_");

  // Parcours chaque ligne du fichier GIFT
  lignes.forEach((ligne) => {
    // Ignore les lignes vides
    if (!ligne.trim()) return;

    // Vérifie si la ligne commence par "::", indiquant le début d'une question
    if (ligne.startsWith("::")) {
      // Si une question est en cours de traitement, on la termine et l'ajoute à la liste des questions
      if (questionActuelle) {
        questionActuelle.keywords = genererMotsCles(questionActuelle); // Génère les mots-clés pour la question
        questions.push(questionActuelle); // Ajoute la question à la liste
      }

      // Incrémente le compteur de questions
      compteurQuestions++;
      const parts = ligne.split("::"); // Divise la ligne en parties, la question commence après "::"
      const opt = ligne.split("{"); // Vérifie s'il y a des options
      if (opt.length > 1) {
        // Si des options existent, on extrait les options de la question
        const optionsPart = opt[1].split("}")[0]; // Récupère les options entre les accolades
        const options = optionsPart
          .split("~") // Divise les options par "~"
          .map((opt) => opt.trim()) // Supprime les espaces avant et après chaque option
          .filter((opt) => opt !== ""); // Supprime les chaînes vides

        const parsedOptions = []; // Liste des options extraites
        const correctOptions = []; // Liste des réponses correctes

        // Traite chaque option pour identifier les réponses correctes (indiquées par "=")
        options.forEach((opt) => {
          if (opt.startsWith("=")) {
            const correctOption = opt.replace("=", "").trim(); // Enlève le caractère "=" et ajoute l'option correcte
            parsedOptions.push(correctOption);
            correctOptions.push(correctOption); // Ajoute cette option à la liste des bonnes réponses
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

        // Crée un objet représentant la question avec son ID, son texte, ses options et ses bonnes réponses
        questionActuelle = {
          id: `${prefixeFichier}_Q${compteurQuestions}`.toLowerCase(), // Génère un ID unique pour la question
          text: parts[2].split("{")[0].trim(), // Extrait le texte de la question (avant les options)
          options: parsedOptions, // Liste des options extraites
          correct: correctOptions, // Liste des bonnes réponses
          type: null, // Le type de la question sera déterminé après
        };
      } else {
        // Si aucune option n'existe, crée une question sans options
        questionActuelle = {
          id: `${prefixeFichier}_Q${compteurQuestions}`.toLowerCase(),
          text: parts[2].split("{")[0].trim(),
          options: [],
          correct: [],
          type: null,
        };
      }

      // Si des réponses correctes existent, le type de la question est "QCM", sinon il est "Unknown"
      questionActuelle.type = questionActuelle.correct.length > 0 ? "QCM" : "Unknown";
    }
  });

  // Ajoute la dernière question (si elle existe)
  if (questionActuelle) {
    questionActuelle.keywords = genererMotsCles(questionActuelle); // Génère les mots-clés pour la question
    questions.push(questionActuelle); // Ajoute la question à la liste
  }

  return questions; // Retourne la liste des questions extraites
}

// Exporte la fonction pour l'utiliser dans d'autres modules
module.exports = { analyserFichierGIFT };
