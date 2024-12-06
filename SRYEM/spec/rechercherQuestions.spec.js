const { rechercherQuestions } = require("../utils/specs_f/rechercherQuestions");

describe("Fonction rechercherQuestions", () => {
    const questionBank = [
        {
            id: "q1",
            text: "What is the capital of France?",
            options: ["Paris", "London", "Berlin", "Madrid"],
            correct: ["Paris"],
            type: "QCM",
            keywords: ["what", "capital", "france", "paris", "london", "berlin", "madrid"]
        },
        {
            id: "q2",
            text: "Which of the following is not a programming language?",
            options: ["Python", "Java", "HTML", "None of these"],
            correct: ["None of these"],
            type: "QCM",
            keywords: ["not", "programming", "language", "python", "java", "html"]
        },
        {
            id: "q3",
            text: "Select the primary colors:",
            options: ["Green", "Orange", "Red", "Blue", "Yellow"],
            correct: ["Red", "Blue", "Yellow"],
            type: "QCM",
            keywords: ["primary", "colors", "red", "blue", "yellow", "green", "orange"]
        },
        {
            id: "q4",
            text: "True or False: The Earth is flat?",
            options: ["True", "False"],
            correct: ["False"],
            type: "Vrai/Faux",
            keywords: ["true", "false", "earth", "flat"]
        }
    ];

    it("devrait retourner les questions correspondant à un mot-clé", () => {
        const resultats = rechercherQuestions("capital", questionBank);

        expect(resultats.length).toBe(1);
        expect(resultats[0]).toEqual(questionBank[0]);
    });

    it("devrait ignorer la casse lors de la recherche", () => {
        const resultats = rechercherQuestions("PrOgRaMmInG", questionBank);

        expect(resultats.length).toBe(1);
        expect(resultats[0]).toEqual(questionBank[1]);
    });

    it("devrait retourner plusieurs résultats si plusieurs questions correspondent au mot-clé", () => {
        const resultats = rechercherQuestions("red", questionBank);

        expect(resultats.length).toBe(1);
        expect(resultats[0]).toEqual(questionBank[2]);
    });

    it("devrait afficher un message si aucune question ne correspond", () => {
        spyOn(console, "log");
        const resultats = rechercherQuestions("unrelatedKeyword", questionBank);

        expect(resultats.length).toBe(0);
        expect(console.log).toHaveBeenCalledWith("Aucune question ne correspond à votre recherche.");
    });

    it("devrait retourner les résultats et les afficher correctement", () => {
        spyOn(console, "log");
        const resultats = rechercherQuestions("flat", questionBank);

        expect(resultats.length).toBe(1);
        expect(console.log).toHaveBeenCalledWith("Résultats de recherche :");
        expect(console.log).toHaveBeenCalledWith(`1. [${resultats[0].type}] ${resultats[0].text}`);
    });
});