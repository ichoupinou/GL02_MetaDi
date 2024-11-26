const fs = require("fs");

function creerTestGIFT(examQuestions) {
  if (examQuestions.length === 0) {
    console.log("L'examen ne contient aucune question.");
    return;
  }

  const contenuGIFT = examQuestions
    .map(
      (q) =>
        `::${q.id}:: ${q.text} {${q.options
          .map((opt) => (q.correct.includes(opt) ? `=${opt}` : `~${opt}`))
          .join(" ")}}`
    )
    .join("\n");

  const cheminFichier = "./examen.gift";
  fs.writeFileSync(cheminFichier, contenuGIFT);
  console.log(`Examen généré avec succès : ${cheminFichier}`);
}

module.exports = { creerTestGIFT };
