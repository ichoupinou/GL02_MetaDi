// Fonction pour ajouter une question spécifique à l'examen.
function ajouterQuestionDansExamen(id, questionBank, examQuestions) {
  // Recherche la question dans la banque de questions en utilisant l'ID fourni.
  const question = questionBank.find((q) => q.id === id);

  // Si la question n'est pas trouvée, affiche un message d'erreur et arrête l'exécution de la fonction.
  if (!question) {
    console.log("Question introuvable !");
    return;
  }

  // Vérifie si la question est déjà présente dans l'examen.
  // Si oui, affiche un message d'information et arrête l'exécution.
  if (examQuestions.some((q) => q.id === id)) {
    console.log("Cette question est déjà dans l'examen !");
    return;
  }

  // Ajoute la question à la liste des questions de l'examen.
  examQuestions.push(question);
  console.log("Question ajoutée à l'examen avec succès.");
}

// Fonction pour ajouter toutes les questions de la banque qui ne sont pas déjà dans l'examen.
function ajouterToutesLesQuestions(questionBank, examQuestions) {
  // Filtre les questions qui ne sont pas encore dans l'examen.
  const nouvellesQuestions = questionBank.filter(
    (question) => !examQuestions.some((q) => q.id === question.id) // Compare les IDs pour éviter les doublons.
  );

  // Ajoute toutes les nouvelles questions à l'examen en une seule opération.
  examQuestions.push(...nouvellesQuestions);

  // Affiche combien de questions ont été ajoutées.
  console.log(
    `${nouvellesQuestions.length} questions ajoutées à l'examen.`
  );
}

// Fonction pour afficher toutes les questions actuellement présentes dans l'examen.
function afficherQuestionsExamen(examQuestions) {
  // Vérifie si l'examen est vide.
  if (examQuestions.length === 0) {
    // Si aucune question n'est présente, affiche un message et termine l'exécution.
    console.log("L'examen ne contient aucune question.");
    return;
  }

  // Affiche un titre avant de lister les questions.
  console.log("Questions de l'examen :");

  // Parcourt chaque question de l'examen et l'affiche avec son index.
  // Inclut le type de question et son texte.
  examQuestions.forEach((q, index) =>
    console.log(`${index + 1}. [${q.type}] ${q.text}`)
  );
}

// Exportation des fonctions pour qu'elles soient accessibles dans d'autres fichiers.
// Cela permet de les réutiliser dans d'autres modules ou parties de l'application.
module.exports = {
  ajouterQuestionDansExamen,
  ajouterToutesLesQuestions,
  afficherQuestionsExamen,
};
