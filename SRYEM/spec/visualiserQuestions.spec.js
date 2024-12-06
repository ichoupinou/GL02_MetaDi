const fs = require("fs");
const vega = require("vega");
const { visualiserQuestions, genererHistogramme } = require("../utils/specs_f/visualiserQuestions");

describe("Fonction visualiserQuestions", () => {
    it("devrait compter correctement les types de questions", () => {
        const questionBank = [
            { id: "q1", text: "Question 1", type: "QCM" },
            { id: "q2", text: "Question 2", type: "Vrai/Faux" },
            { id: "q3", text: "Question 3", type: "QCM" },
            { id: "q4", text: "Question 4", type: "QCM" },
            { id: "q5", text: "Question 5", type: "Vrai/Faux" }
        ];

        const result = visualiserQuestions(questionBank);

        expect(result).toEqual({
            "QCM": 3,
            "Vrai/Faux": 2
        });
    });

    it("devrait retourner un objet vide si aucune question n'est fournie", () => {
        const result = visualiserQuestions([]);
        expect(result).toEqual({});
    });
});

describe("Fonction genererHistogramme", () => {
    const outputFile = "test_output.png";

    beforeEach(() => {
        spyOn(fs, "writeFileSync").and.callFake(() => {});
        spyOn(console, "error");
    });

    it("devrait générer un histogramme sans erreurs", async () => {
        const data = { "QCM": 3, "Vrai/Faux": 2 };

        spyOn(vega.View.prototype, "toCanvas").and.returnValue(
            Promise.resolve({
                toBuffer: () => Buffer.from("fake image data")
            })
        );

        await genererHistogramme(data, outputFile);

        expect(fs.writeFileSync).toHaveBeenCalled();
        expect(fs.writeFileSync).toHaveBeenCalledWith(
            outputFile,
            jasmine.any(Buffer)
        );
    });

    it("devrait gérer les erreurs lors de la génération d'un histogramme", async () => {
        const data = { "QCM": 3, "Vrai/Faux": 2 };

        spyOn(vega.View.prototype, "toCanvas").and.throwError("Erreur de test");

        await genererHistogramme(data, outputFile);

        expect(console.error).toHaveBeenCalledWith(
            jasmine.stringMatching("Erreur lors de la génération de l'histogramme"),
            jasmine.any(Error)
        );
    });
});
