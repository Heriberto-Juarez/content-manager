import 'express-async-errors';
import dotenv from "dotenv";
dotenv.config();

import fileUpload from 'express-fileupload';
import express, { Express } from "express";
import mongoose from 'mongoose';
import errorHandler from "./middlewares/error-handler";
import bodyParser from "body-parser";
import cors from 'cors'
import path from 'path'

import userRoutes from './routes/user.route'
import categoryRoutes from './routes/category.route'
import topicRoutes from './routes/topic.route'
import contentRoute from './routes/content.route'

async function main() {

  const mongoConnectionString = process.env.MONGO_DB_CONNECTION;
  if (typeof mongoConnectionString != 'string') {
    throw new Error("El string de conexión de MongoDB no contiene un valor.");
  }
  await mongoose.connect(mongoConnectionString);


  const app: Express = express();
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
  }));
  const port = process.env.PORT || 3000;
  app.use(cors())
  
  const categoryPictures = path.join(__dirname, '../upload/category')
  const content = path.join(__dirname, '../upload/content')

  app.use('/category-pictures', express.static(categoryPictures)) // Todo: Protejer los recursos para que solo con autenticación los puedan ver.
  app.use('/content', express.static(content)) // Todo: Protejer los recursos para que solo con autenticación los puedan ver.

  /**
   * Routes. TODO: Mejorar este código para importar las rutas de forma automática.
   */

  app.use('/user', userRoutes)
  app.use('/category', categoryRoutes)
  app.use('/topic', topicRoutes)
  app.use('/content', contentRoute)
  
  app.use(errorHandler);
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}

main();
