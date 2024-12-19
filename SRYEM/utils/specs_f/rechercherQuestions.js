// Fonction pour rechercher des questions dans la banque en fonction d'un mot-clé.
function rechercherQuestions(motCle, questionBank) {
  // Filtre les questions de la banque pour ne garder que celles contenant le mot-clé dans leurs mots-clés (`keywords`).
  const resultats = questionBank.filter((q) =>
    // Vérifie si l'un des mots-clés de la question contient le mot-clé recherché (en ignorant la casse).
    q.keywords.some((mot) => mot.includes(motCle.toLowerCase()))
  );

  // Si aucun résultat n'est trouvé, affiche un message indiquant qu'aucune correspondance n'a été trouvée.
  if (resultats.length === 0) {
    console.log("Aucune question ne correspond à votre recherche.");
  } else {
    // Si des résultats sont trouvés, affiche un message avec la liste des questions correspondantes.
    console.log("Résultats de recherche :");

    // Parcourt chaque question trouvée et l'affiche avec son index (numérotation humaine).
    resultats.forEach((q, index) => {
      console.log(`${index + 1}. [${q.type}] ${q.text} ; id : ${q.id}`)

      // NOUVEAU: Ajout de l'affichage des réponses
      console.log("   Réponses possibles :");
      if (q.options) {
        q.options.forEach((option, optIndex) => {
          const isCorrect = q.correct.includes(option) ? "✓" : "✗";
          console.log(`   ${String.fromCharCode(97 + optIndex)}. ${option} ${isCorrect}`);
        });
      }
      // NOUVEAU: Ajout d'une ligne vide pour la lisibilité
      console.log("");
    });
  }

  return resultats;
}

// Exportation de la fonction pour qu'elle puisse être utilisée dans d'autres modules.
module.exports = { rechercherQuestions };
