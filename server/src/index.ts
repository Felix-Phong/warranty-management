import express from 'express';
import http from 'http';
import cookieParser from 'cookie-parser'; 
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';
require('dotenv').config();

import router from './routes/index.route';

const app = express();

// for implement authentication
app.use(cors({
    credentials: true,
}));

app.use(compression());
app.use(cookieParser());

app.use(express.json()); // moi dc them 
// app.use(bodyParser()); integrated available

const server = http.createServer(app);

server.listen(8080, () => {
    console.log('Server running on http://localhost:8080/');
});


const MONGO_URL = "mongodb+srv://minhhoa:minhhoa@cluster0.o1fxe.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);

mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to MongoDB');
});

mongoose.connection.on('error', (error: Error) => console.log(error));


app.use('/', router());


