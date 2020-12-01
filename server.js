import express from "express";
import cors from 'cors';
import 'dotenv/config.js';
import {PORT} from './constants/index.js'
import connectDatabase from "./config/db.js";
import poll from './routes/poll.js';
import user from './routes/user.js';
import morgan from 'morgan';
import errorMiddleWare from './middleware/errors.js'

const app = express();

if(process.env.NODE_ENV === 'development'){
  app.use(morgan('dev'));
}

app.use(express.json());

app.use(cors({
  //origin:'http://localhost:3000',
  //allowedHeaders: ['Content-Type']
}));

app.use(`/polls`, poll);
app.use(`/users`, user)

app.use(errorMiddleWare)

connectDatabase();


const server = app.listen(process.env.PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode, on port ${PORT}`);
});

process.on('unhandledRejection', (err) =>{
  console.log(`Error ${err.message}`);
  console.log('Shutting down server due to unhandled promise Rejection');
  server.close(()=>{
    process.exit(1);
  }) 
})
