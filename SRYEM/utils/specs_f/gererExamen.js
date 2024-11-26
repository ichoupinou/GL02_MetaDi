function ajouterQuestionDansExamen(id, questionBank, examQuestions) {
  const question = questionBank.find((q) => q.id === id);

  if (!question) {
    console.log("Question introuvable !");
    return;
  }

  if (examQuestions.some((q) => q.id === id)) {
    console.log("Cette question est déjà dans l'examen !");
    return;
  }

  examQuestions.push(question);
  console.log("Question ajoutée à l'examen avec succès.");
}

function ajouterToutesLesQuestions(questionBank, examQuestions) {
  const nouvellesQuestions = questionBank.filter(
    (question) => !examQuestions.some((q) => q.id === question.id)
  );

  examQuestions.push(...nouvellesQuestions);
  console.log(
    `${nouvellesQuestions.length} questions ajoutées à l'examen.`
  );
}

function afficherQuestionsExamen(examQuestions) {
  if (examQuestions.length === 0) {
    console.log("L'examen ne contient aucune question.");
    return;
  }

  console.log("Questions de l'examen :");
  examQuestions.forEach((q, index) =>
    console.log(`${index + 1}. [${q.type}] ${q.text}`)
  );
}

module.exports = {
  ajouterQuestionDansExamen,
  ajouterToutesLesQuestions,
  afficherQuestionsExamen,
};
