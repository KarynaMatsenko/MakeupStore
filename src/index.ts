import 'reflect-metadata';

import { config } from 'dotenv';
config();

import express from 'express';
import connectDB from './db';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import router from './routes';
import errorHandler from './middleware/ErrorHandlingMiddleware';
import path from 'path';
import {Connection} from "typeorm";

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, '../static')));
app.use(fileUpload({}));
app.use('/api', router);
app.use(errorHandler);

let connection: Connection;

const start = async () => {
    try {
        connection = await connectDB();
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    } catch(e) {
        console.log(e);
    }
}

start();


 