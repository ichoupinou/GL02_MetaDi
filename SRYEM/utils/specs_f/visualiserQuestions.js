// Importation du module `fs` pour gérer les opérations sur les fichiers.
const fs = require("fs");

function visualiserQuestions(question) {
    let type_question = {

    }

    for (let i = 0; i < question.length; i++) {
        if (type_question[question[i].type] === undefined) {
            type_question[question[i].type] = 1;
        } else {
            type_question[question[i].type] += 1;
        }
    }

    return type_question;
}

module.exports = { visualiserQuestions };