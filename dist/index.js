"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/index.ts
const express_1 = __importDefault(require("express"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const yamljs_1 = __importDefault(require("yamljs")); // Import YAML library
const adminRouter_1 = __importDefault(require("./routes/adminRouter"));
const body_parser_1 = __importDefault(require("body-parser"));
const login_1 = __importDefault(require("./routes/login"));
// import bookModel from './database/book.model';
const dotenv_1 = __importDefault(require("dotenv"));
const store_1 = require("./utility/Questions/store");
const generator_1 = require("./utility/Questions/generator");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = 3000;
console.log(process.version);
// Load Swagger YAML file
const swaggerDocument = yamljs_1.default.load('./swagger.yaml');
// Serve Swagger UI
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument));
// Use body-parser middleware
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
// Routes With-Out Authorisation
app.use('/api/login', login_1.default);
app.get('/', (req, res) => {
    const paperCriteria = {
        totalMarks: 100,
        difficultyDistribution: { Easy: 25, Medium: 30, Hard: 45 } //percentage
    };
    // Add more questions as needed...
    var questionPaper = generate(paperCriteria);
    res.send({ message: "Sample Paper Criteria : " + JSON.stringify(paperCriteria), questionPaper });
});
app.get('/api/allquestions', (req, res) => {
    const store = store_1.QuestionStore.getInstance();
    console.log("here", store.getQuestions());
    res.send({ questions: store.getQuestions() });
});
app.post("/api/generatePaper", (req, res) => {
    // generate paper here 
    var { marks, difficulty_distribution } = req.body;
    console.log(marks, difficulty_distribution);
    if (typeof marks !== 'number' || marks <= 0) {
        // return res.status(400).json({ error: 'Invalid marks. Marks should be a positive number.' });
        const error = new Error('Invalid marks. Marks should be a positive number.');
        error.status = 400;
        throw error;
    }
    const { easy, medium, hard } = difficulty_distribution;
    if (typeof easy !== 'number' || typeof medium !== 'number' || typeof hard !== 'number' ||
        easy < 0 || medium < 0 || hard < 0 || easy + medium + hard !== 100) {
        const error = new Error('Invalid difficulty distribution. Marks should be positive numbers and sum up to 100.');
        error.status = 400;
        throw error;
    }
    // Todo Convert marks to percentage or viceversa if topic wise percentage
    console.log("generate");
    const paperCriteria = {
        totalMarks: marks,
        difficultyDistribution: {
            Easy: difficulty_distribution.easy,
            Medium: difficulty_distribution.medium,
            Hard: difficulty_distribution.hard
        }
    };
    var questionPaper = generate(paperCriteria);
    res.send({ message: "Paper Criteria : " + JSON.stringify(paperCriteria), questionPaper });
});
//  Authorisation Checkmiddleware for Admin Routes
app.use("*", (req, res, next) => {
    // const token = req.headers.authorization;
    //   console.log("toke,", token)
    // if (token) {    
    //     // Decode token
    //     const decoded = decodeToken(token);
    //     if (!decoded) {
    //         return res.status(401).json({ error: 'Invalid token' });
    //     }      
    //     //saving user info in each request
    //     req["user"]=decoded;
    // }
    // console.log("middleware ",token,req["user"])
    next();
});
//admin routes to add,remove,update etc questions and other Admin tasks
app.use('/api/admin', adminRouter_1.default);
app.listen(port, () => {
    // Add models to Sequelize instance
    console.log(`Server is running on port ${port}`);
});
// index.ts
function generate(paperCriteria) {
    const store = store_1.QuestionStore.getInstance();
    // this adds default questions uncomment it 
    // addDefaultQuestions(store);
    // Add more questions as needed...
    const generator = new generator_1.QuestionPaperGenerator(store);
    const questionPaper = generator.generateQuestionPaper(paperCriteria);
    console.log("Question Paper Generated !!");
    return questionPaper;
}
// Global error handler middleware
app.use((err, req, res, next) => {
    console.error(err.stack); // Log the error stack for debugging
    // Send a structured error response
    res.status(err.status || 500).json({
        error: {
            message: err.message || 'An unexpected error occurred.',
            details: err.details || 'No additional details available.'
        }
    });
});
