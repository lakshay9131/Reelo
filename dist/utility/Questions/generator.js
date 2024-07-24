"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionPaperGenerator = void 0;
class QuestionPaperGenerator {
    constructor(questionStore) {
        this.questionStore = questionStore;
    }
    generateQuestionPaper(criteria) {
        const { totalMarks, difficultyDistribution } = criteria;
        const questions = this.questionStore.getQuestions();
        // Validate criteria
        if (totalMarks <= 0) {
            throw new Error('Total marks must be greater than zero.');
        }
        // Helper function to get questions by difficulty
        //ToDo chacge parameter with TopicWiseDifficulty 
        const getQuestionsByDifficulty = (difficulty, marks) => {
            const questionsByDifficulty = questions.filter(q => q.difficulty === difficulty);
            const selectedQuestions = [];
            let totalSelectedMarks = 0;
            for (const question of questionsByDifficulty) {
                // TODO Selection Algorithm if marks are  not equal for difficulty level
                if (totalSelectedMarks + question.marks <= marks) {
                    selectedQuestions.push(question);
                    totalSelectedMarks += question.marks;
                }
            }
            if (totalSelectedMarks < marks) {
                // ToDo more Scenarios
                // Scenario 1) consider leftout marks for another section.
                throw new Error('Less Question Avalible in ' + difficulty + ' Section');
            }
            return selectedQuestions;
        };
        // ToDo  Use TopicWiseDifficulty when upgraded
        const easyQuestions = getQuestionsByDifficulty('Easy', difficultyDistribution.Easy);
        const mediumQuestions = getQuestionsByDifficulty('Medium', difficultyDistribution.Medium);
        const hardQuestions = getQuestionsByDifficulty('Hard', difficultyDistribution.Hard);
        return [...easyQuestions, ...mediumQuestions, ...hardQuestions];
    }
}
exports.QuestionPaperGenerator = QuestionPaperGenerator;
