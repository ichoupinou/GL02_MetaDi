const fs = require("fs");
const { analyserFichierGIFT } = require("../utils/preparationDonnes");

// Simule un fichier GIFT pour les tests
const sampleGIFTContent = `
::Q1:: What is the capital of France? {=Paris ~London ~Berlin ~Madrid}
::Q2:: Which of the following is not a programming language? {~Python ~Java ~HTML =None of these}
::Q3:: Select the primary colors: {~Green ~Orange =Red =Blue =Yellow}
::Q4:: True or False: The Earth is flat? {False}
`;

describe("Fonction analyserFichierGIFT", () => {
    beforeEach(() => {
        // Espionne la méthode fs.readFileSync pour retourner un contenu simulé
        spyOn(fs, "readFileSync").and.returnValue(sampleGIFTContent);
    });

    it("devrait extraire correctement les questions et leurs métadonnées", () => {
        const questions = analyserFichierGIFT("sample.gift");

        // Vérifie la première question
        expect(questions[0]).toEqual({
            id: "sample_q1",
            text: "What is the capital of France?",
            options: ["Paris", "London", "Berlin", "Madrid"],
            correct: ["Paris"],
            type: "QCM",
            keywords: ["what", "capital", "france", "paris", "london", "berlin", "madrid"]
        });

        // Vérifie une question Vrai/Faux
        expect(questions[3]).toEqual({
            id: "sample_q4",
            text: "True or False: The Earth is flat?",
            options: ["True", "False"],
            correct: ["False"],
            type: "Vrai/Faux",
            keywords: ["true", "false", "earth", "flat"]
        });

        console.log("Test des métadonnées des questions : Succès !");
    });

    it("devrait générer correctement les mots-clés pour les questions", () => {
        const questions = analyserFichierGIFT("sample.gift");

        const expectedKeywords = [
            "what",
            "capital",
            "france",
            "paris",
            "london",
            "berlin",
            "madrid"
        ];

        // Vérifie les mots-clés de la première question
        expect(questions[0].keywords).toEqual(expectedKeywords);

        console.log("Test de génération des mots-clés : Succès !\n\n");
    });
});
