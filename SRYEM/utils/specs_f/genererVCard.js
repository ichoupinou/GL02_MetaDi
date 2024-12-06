const fs = require("fs");

// Fonction pour générer le fichier VCard de l'enseignant
function genererVCard(enseignant) {
    // Construction du contenu du fichier VCard
    const adresse = enseignant.adresse
        ? `;;${enseignant.adresse.rue};${enseignant.adresse.ville};${enseignant.adresse.pays};${enseignant.adresse.codePostal}`
        : '';

    const vCardContent = [
        "BEGIN:VCARD",
        "VERSION:3.0",
        `FN:${enseignant.nom}`,
        `EMAIL:${enseignant.email}`,
        `TEL:${enseignant.telephone}`,
        `ADR:${adresse}`,
        "END:VCARD"
    ].join("\n");

    // Définir le chemin et le nom du fichier
    const cheminFichier = `../VCARD/${enseignant.nom.replace(" ", "_")}_contact.vcf`;

    // Écriture du fichier
    fs.writeFileSync(cheminFichier, vCardContent);
    console.log(`Fichier VCard généré avec succès : ${cheminFichier}`);
}

module.exports = { genererVCard };
