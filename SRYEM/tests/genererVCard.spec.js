const fs = require("fs");
const { genererVCard } = require("../utils/specs_f/genererVCard");

describe("Fonction genererVCard", () => {
    beforeEach(() => {
        spyOn(fs, "writeFileSync");
    });

    it("devrait générer le contenu correct pour un enseignant avec toutes les propriétés", () => {
        const enseignant = {
            nom: "Jean Dupont",
            email: "jean.dupont@example.com",
            telephone: "1234567890",
            adresse: {
                rue: "12 Rue des Lilas",
                ville: "Paris",
                pays: "France",
                codePostal: "75000"
            }
        };

        genererVCard(enseignant);

        const expectedContent = `BEGIN:VCARD
VERSION:3.0
FN:Jean Dupont
EMAIL:jean.dupont@example.com
TEL:1234567890
ADR:;;12 Rue des Lilas;Paris;France;75000
END:VCARD`;

        const expectedPath = "../VCARD/Jean_Dupont_contact.vcf";

        expect(fs.writeFileSync).toHaveBeenCalledWith(expectedPath, expectedContent);
    });

    it("devrait gérer un enseignant sans adresse", () => {
        const enseignant = {
            nom: "Marie Curie",
            email: "marie.curie@example.com",
            telephone: "0987654321",
            adresse: null
        };

        genererVCard(enseignant);

        const expectedContent = `BEGIN:VCARD
VERSION:3.0
FN:Marie Curie
EMAIL:marie.curie@example.com
TEL:0987654321
ADR:
END:VCARD`;

        const expectedPath = "../VCARD/Marie_Curie_contact.vcf";

        expect(fs.writeFileSync).toHaveBeenCalledWith(expectedPath, expectedContent);
    });
});
