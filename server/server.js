const path = require('path');
const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const PORT = 3000;

const recipeRouter = require(path.join(__dirname, '/routers/recipeRouter.js'));

// requiring in dotenv to use environment variable process.env.MONGO_URL from .env file
require('dotenv').config();
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.once('open', () => {
  console.log('Connected to Database');
});

app.use('/recipes', recipeRouter);

app.get('/', (req, res) => {
    res.status(200).sendFile(path.resolve((__dirname, './index.html')));
  });

app.use(function (err, req, res, next) {
    const defaultErr = {
      log: 'Express error handler caught unknown middleware error',
      status: 400,
      message: { err: 'An error occurred' }, 
    };
    const errorObj = Object.assign(err, defaultErr);
    console.error('errorObj property: ', errorObj.log);
    return res.status(errorObj.status).send(JSON.stringify(errorObj.message));
}); 

app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}...`);
  });
   
module.exports = app;