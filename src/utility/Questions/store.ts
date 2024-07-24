import * as fs from 'fs';
import * as path from 'path';

const QUESTION_FILE = path.resolve(__dirname, 'questions.json');


// interface
export interface Question {
    question: string;
    subject: string;
    topic: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    marks: number;
  }

// Singelton Instance
export class QuestionStore {
    private static instance: QuestionStore;
    private questions: Question[] = [];
    private questionsSet: Set<string> = new Set();// to avoid same question
  
    private constructor() {
      this.loadQuestions();
    }

    public static getInstance(): QuestionStore {
      if (!QuestionStore.instance) {
        QuestionStore.instance = new QuestionStore();
      }
      return QuestionStore.instance;
    }
  
    addQuestion(question: Question): void {
      // Set s=new Set<Question>();
      this.questions.push(question);
      this.saveQuestions();
    }
  
    getQuestions(): Question[] {
      return this.questions;
    }

    private generateQuestionId(question: Question): string {
      return JSON.stringify(question);
    }
  
      // Method to remove all questions
    public removeAllQuestions(): void {
      this.questions = [];
      this.questionsSet.clear();
      this.saveQuestions(); // Update the file to reflect the changes
    }
    
    private loadQuestions(): void {
      console.log("reading..",QUESTION_FILE,fs.existsSync(QUESTION_FILE));      
      if (fs.existsSync(QUESTION_FILE)) {
        const data = fs.readFileSync(QUESTION_FILE, 'utf-8');      
        this.questions = JSON.parse(data) as Question[];
        this.questions.forEach(question => {
          this.questionsSet.add(this.generateQuestionId(question));
        });
      }
    }   
  
    private saveQuestions(): void {
      fs.writeFileSync(QUESTION_FILE, JSON.stringify(this.questions, null, 2));
    }
  }

export function addDefaultQuestions(store: QuestionStore): QuestionStore {

  // easy
  store.addQuestion({ question: "What is the acceleration due to gravity?", subject: "Physics", topic: "Mechanics", difficulty: "Easy", marks: 5 });
  store.addQuestion({ question: "Define inertia.", subject: "Physics", topic: "Mechanics", difficulty: "Easy", marks: 5 });
  store.addQuestion({ question: "What is Ohm's Law?", subject: "Physics", topic: "Electricity", difficulty: "Easy", marks: 5 });
  store.addQuestion({ question: "What is a conductor?", subject: "Physics", topic: "Electricity", difficulty: "Easy", marks: 5 });
  store.addQuestion({ question: "Define kinetic energy.", subject: "Physics", topic: "Mechanics", difficulty: "Easy", marks: 5 });
  store.addQuestion({ question: "What is refraction?", subject: "Physics", topic: "Optics", difficulty: "Easy", marks: 5 });
  store.addQuestion({ question: "Define potential energy.", subject: "Physics", topic: "Mechanics", difficulty: "Easy", marks: 5 });
  store.addQuestion({ question: "What is a photon?", subject: "Physics", topic: "Quantum Mechanics", difficulty: "Easy", marks: 5 });
  store.addQuestion({ question: "What is the first law of thermodynamics?", subject: "Physics", topic: "Thermodynamics", difficulty: "Easy", marks: 5 });
  
  // medium
  store.addQuestion({ question: "Explain Newton's Second Law.", subject: "Physics", topic: "Mechanics", difficulty: "Medium", marks: 10 });
  store.addQuestion({ question: "Describe the properties of electromagnetic waves.", subject: "Physics", topic: "Waves", difficulty: "Medium", marks: 10 });
  store.addQuestion({ question: "Explain the principle of superposition of waves.", subject: "Physics", topic: "Waves", difficulty: "Medium", marks: 10 });
  store.addQuestion({ question: "Describe the working of a transformer.", subject: "Physics", topic: "Electricity", difficulty: "Medium", marks: 10 });
  store.addQuestion({ question: "Explain the Doppler effect.", subject: "Physics", topic: "Waves", difficulty: "Medium", marks: 10 });
  store.addQuestion({ question: "What is the law of conservation of energy?", subject: "Physics", topic: "Mechanics", difficulty: "Medium", marks: 10 });
  store.addQuestion({ question: "Describe the structure of an atom.", subject: "Physics", topic: "Atomic Physics", difficulty: "Medium", marks: 10 });
  store.addQuestion({ question: "Explain the working of an electric motor.", subject: "Physics", topic: "Electricity", difficulty: "Medium", marks: 10 });
  store.addQuestion({ question: "What is the photoelectric effect?", subject: "Physics", topic: "Quantum Mechanics", difficulty: "Medium", marks: 10 });
  store.addQuestion({ question: "Describe the properties of X-rays.", subject: "Physics", topic: "Waves", difficulty: "Medium", marks: 10 });
  
  // hard
  store.addQuestion({ question: "Derive the equation of motion for a free falling object.", subject: "Physics", topic: "Mechanics", difficulty: "Hard", marks: 15 });
  store.addQuestion({ question: "Explain the quantum theory of light.", subject: "Physics", topic: "Quantum Mechanics", difficulty: "Hard", marks: 15 });
  store.addQuestion({ question: "Describe the process of nuclear fission.", subject: "Physics", topic: "Nuclear Physics", difficulty: "Hard", marks: 15 });
  store.addQuestion({ question: "Explain the concept of wave-particle duality.", subject: "Physics", topic: "Quantum Mechanics", difficulty: "Hard", marks: 15 });
  store.addQuestion({ question: "Derive the Schrödinger equation.", subject: "Physics", topic: "Quantum Mechanics", difficulty: "Hard", marks: 15 });
  store.addQuestion({ question: "Explain the theory of relativity.", subject: "Physics", topic: "Relativity", difficulty: "Hard", marks: 15 });
  store.addQuestion({ question: "Describe the process of nuclear fusion.", subject: "Physics", topic: "Nuclear Physics", difficulty: "Hard", marks: 15 });
  store.addQuestion({ question: "Explain the Heisenberg uncertainty principle.", subject: "Physics", topic: "Quantum Mechanics", difficulty: "Hard", marks: 15 });
  store.addQuestion({ question: "Describe the properties of a black hole.", subject: "Physics", topic: "Astrophysics", difficulty: "Hard", marks: 15 });
  store.addQuestion({ question: "Explain the concept of string theory.", subject: "Physics", topic: "Theoretical Physics", difficulty: "Hard", marks: 15 });  

  return store;  
}
