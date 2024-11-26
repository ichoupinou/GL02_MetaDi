const { analyserFichierGIFT } = require("../utils/dataLoader");

const cheminFichier = "./data/sample.gift";
const parsedQuestions = analyserFichierGIFT(cheminFichier);

console.log(JSON.stringify(parsedQuestions, null, 2));
