const fs = require("fs");
const vega = require("vega");
const vegaLite = require("vega-lite");

// Fonction pour visualiser les types de questions et leur fréquence
function visualiserQuestions(question) {
    let type_question = {};

    for (let i = 0; i < question.length; i++) {
        if (type_question[question[i].type] === undefined) {
            type_question[question[i].type] = 1;
        } else {
            type_question[question[i].type] += 1;
        }
    }

    return type_question;
}

// Fonction pour générer un histogramme avec Vega-Lite et sauvegarder sous forme d'image
async function genererHistogramme(data, outputFile) {
    // Transformation des données pour le format Vega-Lite
    const transformedData = Object.entries(data).map(([type, count]) => ({
        Type: type,
        Count: count
    }));

    // Spécification Vega-Lite pour l'histogramme
    const vegaLiteSpec = {
        $schema: "https://vega.github.io/schema/vega-lite/v5.json",
        description: "Histogramme des types de questions",
        data: {
            values: transformedData
        },
        mark: "bar",
        encoding: {
            x: {
                field: "Type",
                type: "nominal",
                title: "Types de Questions",
                axis: { labelAngle: -45 }
            },
            y: {
                field: "Count",
                type: "quantitative",
                title: "Nombre de Questions"
            },
            color: {
                field: "Type",
                type: "nominal",
                legend: null
            }
        }
    };

    // Compiler la spécification Vega-Lite en Vega
    const compiledVegaSpec = vegaLite.compile(vegaLiteSpec).spec;

    // Créer un rendu Vega à partir de la spécification
    const view = new vega.View(vega.parse(compiledVegaSpec), { renderer: "none" });

    // Générer une image PNG et sauvegarder dans le fichier spécifié
    try {
        const canvas = await view.toCanvas();
        fs.writeFileSync(outputFile, canvas.toBuffer("image/png"));
        console.log(`Histogramme généré avec succès : ${outputFile}`);
    } catch (err) {
        console.error("Erreur lors de la génération de l'histogramme :", err);
    }
}

module.exports = { visualiserQuestions, genererHistogramme };
