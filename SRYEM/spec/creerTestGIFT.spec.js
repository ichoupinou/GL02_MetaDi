const fs = require("fs");
const { creerTestGIFT } = require("../utils/specs_f/creerTestGIFT");

describe("Fonction creerTestGIFT", () => {
    beforeEach(() => {
        // Espionne fs.writeFileSync pour intercepter les appels et éviter de créer réellement le fichier
        spyOn(fs, "writeFileSync");
        // Espionne console.log pour vérifier les messages affichés
        spyOn(console, "log");
    });

    it("devrait générer un fichier GIFT correctement formaté", () => {
        const examQuestions = [
            {
                id: "q1",
                text: "Quelle est la capitale de la France ?",
                options: ["Paris", "Lyon", "Marseille", "Nice"],
                correct: ["Paris"]
            },
            {
                id: "q2",
                text: "Quelle est la couleur du ciel ?",
                options: ["Bleu", "Vert", "Rouge"],
                correct: ["Bleu"]
            }
        ];

        creerTestGIFT(examQuestions);

        const expectedContent = `::q1:: Quelle est la capitale de la France ? {=Paris ~Lyon ~Marseille ~Nice}
::q2:: Quelle est la couleur du ciel ? {=Bleu ~Vert ~Rouge}`;

        const expectedPath = "./examen.gift";

        // Vérifie que fs.writeFileSync a été appelé avec les bons arguments
        expect(fs.writeFileSync).toHaveBeenCalledWith(expectedPath, expectedContent);
        // Vérifie que le message de confirmation est affiché
        expect(console.log).toHaveBeenCalledWith(`Examen généré avec succès : ${expectedPath}`);
    });

    it("devrait afficher un message d'erreur si l'examen est vide", () => {
        const examQuestions = [];

        creerTestGIFT(examQuestions);

        // Vérifie que fs.writeFileSync n'est pas appelé
        expect(fs.writeFileSync).not.toHaveBeenCalled();
        // Vérifie que le message d'erreur est affiché
        expect(console.log).toHaveBeenCalledWith("L'examen ne contient aucune question.");
    });
});
