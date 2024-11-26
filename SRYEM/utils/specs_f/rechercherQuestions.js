function rechercherQuestions(motCle, questionBank) {
  const resultats = questionBank.filter((q) =>
    q.keywords.some((mot) => mot.includes(motCle.toLowerCase()))
  );

  if (resultats.length === 0) {
    console.log("Aucune question ne correspond à votre recherche.");
  } else {
    console.log("Résultats de recherche :");
    resultats.forEach((q, index) =>
      console.log(`${index + 1}. [${q.type}] ${q.text}`)
    );
  }
}

module.exports = { rechercherQuestions };
