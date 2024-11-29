const fs = require("fs");

// Fonction pour générer le fichier VCard de l'enseignant
function genererVCard(enseignant) {
    // Construction du contenu du fichier VCard
    // enseignant est un objet avec les propriétés nom, email, telephone et adresse
    const vCardContent = `
            BEGIN:VCARD
            VERSION:3.0
            FN:${enseignant.nom}
            EMAIL:${enseignant.email}
            TEL:${enseignant.telephone}
            ADR:${enseignant.adresse ? `;;${enseignant.adresse.rue};${enseignant.adresse.ville};${enseignant.adresse.pays};${enseignant.adresse.codePostal}` : ''}
            END:VCARD
  `.trim();  // .trim() pour enlever les espaces inutiles

    // Définir le chemin et le nom du fichier (par exemple, le nom du fichier peut inclure l'ID de l'examen)
    const cheminFichier = `../VCARD/${enseignant.nom.replace(" ", "_")}_contact.vcf`;

    // Écriture du fichier
    fs.writeFileSync(cheminFichier, vCardContent);
    console.log(`Fichier VCard généré avec succès : ${cheminFichier}`);
}

module.exports = { genererVCard };
