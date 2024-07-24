// src/index.ts
import express, { Request, Response ,NextFunction} from 'express';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs'; // Import YAML library

import adminRoutes from './routes/adminRouter';
import bodyParser from 'body-parser';
import loginRoutes from './routes/login';
// import bookModel from './database/book.model';
import dotenv from 'dotenv';
import { QuestionStore,addDefaultQuestions, Question } from './utility/Questions/store';

import { QuestionPaperGenerator,PaperCriteria } from './utility/Questions/generator';



import { decodeToken } from './utility/utility';

dotenv.config();

const app = express();
const port = 3000;
console.log(process.version)

// Load Swagger YAML file
const swaggerDocument = YAML.load('./swagger.yaml');

// Serve Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// Use body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes With-Out Authorisation
app.use('/api/login', loginRoutes);

app.get('/', (req: Request, res: Response) => { 
  const paperCriteria:PaperCriteria = {
    totalMarks: 100,
    difficultyDistribution: { Easy: 25, Medium: 30, Hard: 45 } //percentage
  };

  // Add more questions as needed...
  var questionPaper=generate(paperCriteria)
  res.send({message:"Sample Paper Criteria : "+JSON.stringify(paperCriteria),questionPaper});
});

app.get('/api/allquestions', (req: Request, res: Response) => { 
  const store = QuestionStore.getInstance();  
  console.log("here",store.getQuestions())
  res.send( {questions:store.getQuestions()});
});


app.post("/api/generatePaper",(req: Request, res: Response) => {
  // generate paper here 
  var { marks,difficulty_distribution}=req.body
  console.log(marks,difficulty_distribution)
  if (typeof marks !== 'number' || marks <= 0) {
    // return res.status(400).json({ error: 'Invalid marks. Marks should be a positive number.' });
    const error = new Error('Invalid marks. Marks should be a positive number.');     
    (error as any).status = 400;
    throw error;
  }
  const { easy, medium, hard } = difficulty_distribution;

  if (typeof easy !== 'number' || typeof medium !== 'number' || typeof hard !== 'number' ||
      easy < 0 || medium < 0 || hard < 0 || easy + medium + hard !== 100) {
      const error = new Error('Invalid difficulty distribution. Marks should be positive numbers and sum up to 100.');
      (error as any).status = 400;
      throw error;
    }
  



  // Todo Convert marks to percentage or viceversa if topic wise percentage

  console.log("generate")
  const paperCriteria:PaperCriteria={
    totalMarks:marks,
    difficultyDistribution:{
      Easy:difficulty_distribution.easy,
      Medium:difficulty_distribution.medium,
      Hard:difficulty_distribution.hard
    }
  }

  var questionPaper=generate(paperCriteria)
  res.send({message:"Paper Criteria : "+JSON.stringify(paperCriteria),questionPaper});

});


//  Authorisation Checkmiddleware for Admin Routes
app.use("*",(req,res,next)=>{

 
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
})


//admin routes to add,remove,update etc questions and other Admin tasks
app.use('/api/admin', adminRoutes);



app.listen(port, () => {
  // Add models to Sequelize instance
  console.log(`Server is running on port ${port}`);
});

// index.ts


function generate(paperCriteria:PaperCriteria):Question[]
{
  const store = QuestionStore.getInstance();

  // this adds default questions uncomment it 
  // addDefaultQuestions(store);

  // Add more questions as needed...

  const generator = new QuestionPaperGenerator(store);
 

  const questionPaper = generator.generateQuestionPaper(paperCriteria);

  console.log("Question Paper Generated !!"); 
  return questionPaper;
}

// Global error handler middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack); // Log the error stack for debugging

  // Send a structured error response
  res.status(err.status || 500).json({
    error: {
      message: err.message || 'An unexpected error occurred.',
      details: err.details || 'No additional details available.'
    }
  });
});


