const {
    ajouterQuestionDansExamen,
    ajouterToutesLesQuestions,
    afficherQuestionsExamen,
    afficherToutesLesQuestions,
  } = require("../utils/specs_f/gererExamen"); // Adaptez le chemin si nécessaire
  
  describe("Fonctions de gestion des questions d'examen", () => {
    let questionBank;
    let examQuestions;
    let originalLog;
  
    beforeEach(() => {
      questionBank = [
        { id: "q1", type: "QCM", text: "Quelle est la capitale de la France ?" },
        { id: "q2", type: "QCU", text: "Quel est le résultat de 2+2 ?" },
        { id: "q3", type: "QCM", text: "Citez un légume vert." },
      ];
  
      examQuestions = [
        { id: "q1", type: "QCM", text: "Quelle est la capitale de la France ?" },
      ];
  
      // Sauvegarder et espionner console.log
      originalLog = console.log;
      spyOn(console, "log");
    });
  
    afterEach(() => {
      // Restaure la fonction console.log d'origine
      console.log = originalLog;
    });
  
    describe("ajouterQuestionDansExamen", () => {
      it("ajoute une nouvelle question si elle existe dans la banque et n'est pas déjà dans l'examen", () => {
        const result = ajouterQuestionDansExamen("q2", questionBank, examQuestions);
  
        expect(result).toEqual({
          message: "Question ajoutée à l'examen avec succès  !",
          success: true,
        });
  
        // Vérification de la présence de l'objet via arrayContaining
        expect(examQuestions).toEqual(
          jasmine.arrayContaining([
            { id: "q2", type: "QCU", text: "Quel est le résultat de 2+2 ?" },
          ])
        );
  
        expect(console.log).toHaveBeenCalledWith(
          "Question ajoutée à l'examen avec succès."
        );
      });
  
      it("retourne un message d'erreur si la question n'existe pas", () => {
        const result = ajouterQuestionDansExamen("q999", questionBank, examQuestions);
  
        expect(result).toEqual({
          message: "Question introuvable !",
          success: false,
        });
        expect(console.log).toHaveBeenCalledWith("Question introuvable !");
      });
  
      it("retourne un message si la question est déjà dans l'examen", () => {
        const result = ajouterQuestionDansExamen("q1", questionBank, examQuestions);
  
        expect(result).toEqual({
          message: "Cette question est déjà dans l'examen !",
          success: false,
        });
        expect(console.log).toHaveBeenCalledWith("Cette question est déjà dans l'examen !");
      });
    });
  
    describe("ajouterToutesLesQuestions", () => {
      it("ajoute toutes les questions non présentes dans l'examen", () => {
        ajouterToutesLesQuestions(questionBank, examQuestions);
  
        // Maintenant, examQuestions devrait contenir q1, q2 et q3.
        expect(examQuestions.length).toBe(3);
  
        expect(examQuestions).toEqual(
          jasmine.arrayContaining([
            { id: "q1", type: "QCM", text: "Quelle est la capitale de la France ?" },
            { id: "q2", type: "QCU", text: "Quel est le résultat de 2+2 ?" },
            { id: "q3", type: "QCM", text: "Citez un légume vert." },
          ])
        );
  
        expect(console.log).toHaveBeenCalledWith("2 questions ajoutées à l'examen.");
      });
  
      it("n'ajoute rien si toutes les questions sont déjà dans l'examen", () => {
        examQuestions.push(
          { id: "q2", type: "QCU", text: "Quel est le résultat de 2+2 ?" },
          { id: "q3", type: "QCM", text: "Citez un légume vert." }
        );
  
        ajouterToutesLesQuestions(questionBank, examQuestions);
  
        expect(examQuestions.length).toBe(3);
        expect(console.log).toHaveBeenCalledWith("0 questions ajoutées à l'examen.");
      });
    });
  
    describe("afficherQuestionsExamen", () => {
      it("affiche un message si l'examen est vide", () => {
        examQuestions = [];
        afficherQuestionsExamen(examQuestions);
        expect(console.log).toHaveBeenCalledWith("L'examen ne contient aucune question.");
      });
  
      it("affiche la liste des questions de l'examen", () => {
        afficherQuestionsExamen(examQuestions);
        expect(console.log).toHaveBeenCalledWith("Questions de l'examen :");
        expect(console.log).toHaveBeenCalledWith("1. [QCM] Quelle est la capitale de la France ?");
      });
    });
  
    describe("afficherToutesLesQuestions", () => {
      it("affiche un message si la banque de questions est vide", () => {
        questionBank = [];
        afficherToutesLesQuestions(questionBank);
        expect(console.log).toHaveBeenCalledWith("La banque de questions est vide.");
      });
  
      it("affiche la liste des questions disponibles", () => {
        afficherToutesLesQuestions(questionBank);
        expect(console.log).toHaveBeenCalledWith("Questions disponibles :");
        expect(console.log).toHaveBeenCalledWith("1. [QCM] Quelle est la capitale de la France ?");
        expect(console.log).toHaveBeenCalledWith("2. [QCU] Quel est le résultat de 2+2 ?");
        expect(console.log).toHaveBeenCalledWith("3. [QCM] Citez un légume vert.");
      });
    });
  });
  