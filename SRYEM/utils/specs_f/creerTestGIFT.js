// Importation du module `fs` pour gérer les opérations sur les fichiers.
const fs = require("fs");

// Fonction pour créer un fichier d'examen au format GIFT.
// Le format GIFT est utilisé pour importer des questions dans des systèmes d'apprentissage comme Moodle.
function creerTestGIFT(examQuestions) {
  // Vérifie si l'examen contient des questions.
  // JALON3 TODO
  // Je pense que c'est ici qu'il faut vérifier la longueur de l'exam
  if (examQuestions.length === 0) {
    // Si aucune question n'est présente, affiche un message d'erreur et termine l'exécution de la fonction.
    console.log("L'examen ne contient aucune question.");
    return;
  }else if (examQuestions.length > 20) {
    // S'il y a trop de questions dans l'examen en cours de création, affiche un message d'erreur et termine l'exécution de la fonction.
    console.log("L'examen contient trop de questions pour générer un test (il en faut entre 15 et 20).");
    return;
  }else if (examQuestions.length < 15) {
    // Si aucune question n'est présente, affiche un message d'erreur et termine l'exécution de la fonction.
    console.log("L'examen ne contient pas assez de questions pour générer un test (il en faut entre 15 et 20).");
    return;
  }

  // Génère le contenu du fichier au format GIFT.
  const contenuGIFT = examQuestions
    .map(
      (q) =>
        // Chaque question est formatée selon la syntaxe GIFT.
        // ::id:: est un identifiant unique pour la question.
        // Le texte de la question est suivi de ses options entre accolades `{}`.
        // Les réponses correctes sont précédées par `=`, et les réponses incorrectes par `~`.
        `::${q.id}:: ${q.text} {${q.options
          .map((opt) => (q.correct.includes(opt) ? `=${opt}` : `~${opt}`)) // Distinction des réponses correctes/incorrectes.
          .join(" ")}}`
    )
    // Chaque question est séparée par une nouvelle ligne dans le fichier.
    .join("\n");

  // Spécifie le chemin où le fichier GIFT sera créé.
  const cheminFichier = "./examen.gift";

  // Écrit le contenu GIFT dans le fichier spécifié.
  // `writeFileSync` crée ou remplace le fichier avec le contenu généré.
  fs.writeFileSync(cheminFichier, contenuGIFT);

  // Affiche un message de confirmation une fois le fichier généré.
  console.log(`Examen généré avec succès : ${cheminFichier}`);
}

// Exporte la fonction `creerTestGIFT` pour qu'elle puisse être utilisée dans d'autres fichiers.
module.exports = { creerTestGIFT };
