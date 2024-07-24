"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addDefaultQuestions = exports.QuestionStore = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const QUESTION_FILE = path.resolve(__dirname, 'questions.json');
// Singelton Instance
class QuestionStore {
    constructor() {
        this.questions = [];
        this.questionsSet = new Set(); // to avoid same question
        this.loadQuestions();
    }
    static getInstance() {
        if (!QuestionStore.instance) {
            QuestionStore.instance = new QuestionStore();
        }
        return QuestionStore.instance;
    }
    addQuestion(question) {
        // Set s=new Set<Question>();
        this.questions.push(question);
        this.saveQuestions();
    }
    getQuestions() {
        return this.questions;
    }
    generateQuestionId(question) {
        return JSON.stringify(question);
    }
    // Method to remove all questions
    removeAllQuestions() {
        this.questions = [];
        this.questionsSet.clear();
        this.saveQuestions(); // Update the file to reflect the changes
    }
    loadQuestions() {
        console.log("reading..", QUESTION_FILE, fs.existsSync(QUESTION_FILE));
        if (fs.existsSync(QUESTION_FILE)) {
            const data = fs.readFileSync(QUESTION_FILE, 'utf-8');
            this.questions = JSON.parse(data);
            this.questions.forEach(question => {
                this.questionsSet.add(this.generateQuestionId(question));
            });
        }
    }
    saveQuestions() {
        fs.writeFileSync(QUESTION_FILE, JSON.stringify(this.questions, null, 2));
    }
}
exports.QuestionStore = QuestionStore;
function addDefaultQuestions(store) {
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
exports.addDefaultQuestions = addDefaultQuestions;
