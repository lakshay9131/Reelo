// QuestionPaperGenerator.ts
import { Question, QuestionStore } from './store';

export interface PaperCriteria {
  totalMarks: number;
  difficultyDistribution: {
    Easy: number;
    Medium: number;
    Hard: number;
  };
}
export interface TopicWiseDifficulty{
    difficulty:'Easy' | 'Medium' | 'Hard'
    value:object
}

export class QuestionPaperGenerator {
  constructor(private questionStore: QuestionStore) {}

  generateQuestionPaper(criteria: PaperCriteria): Question[] {
    const { totalMarks, difficultyDistribution } = criteria;
    const questions = this.questionStore.getQuestions();

    // Validate criteria
    if (totalMarks <= 0) {
      throw new Error('Total marks must be greater than zero.');
    }

  

    // Helper function to get questions by difficulty
    //ToDo chacge parameter with TopicWiseDifficulty 
    const getQuestionsByDifficulty = (difficulty:'Easy' | 'Medium' | 'Hard', marks: number): Question[] => {
      const questionsByDifficulty = questions.filter(q => q.difficulty === difficulty);
      const selectedQuestions: Question[] = [];
      let totalSelectedMarks = 0;

      for (const question of questionsByDifficulty) {
        // TODO Selection Algorithm if marks are  not equal for difficulty level
        if (totalSelectedMarks + question.marks <= marks) {
          selectedQuestions.push(question);
          totalSelectedMarks += question.marks;
        }
      }
      if(totalSelectedMarks<marks)
      {
        // ToDo more Scenarios
        // Scenario 1) consider leftout marks for another section.
        throw new Error('Less Question Avalible in '+difficulty+' Section');
      }

      return selectedQuestions;
    };
    // ToDo  Use TopicWiseDifficulty when upgraded

    const easyQuestions = getQuestionsByDifficulty('Easy',  difficultyDistribution.Easy);
    const mediumQuestions = getQuestionsByDifficulty('Medium',  difficultyDistribution.Medium);
    const hardQuestions = getQuestionsByDifficulty('Hard', difficultyDistribution.Hard);

    return [...easyQuestions, ...mediumQuestions, ...hardQuestions] ;
  }
}


