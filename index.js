const express = require('express');
const bodyparser = require('body-parser');
const sequelize = require('sequelize');
const User = require('./models/userModel');

const app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
})

// test router
app.get('/', (req, res, next) => {
  res.send('hello world!!');
});

// CRUD Routes /users
app.use('/users', require('./routes/users'));

// Error handling
app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  res.status(status).json({ message: message});
});

// sync database
sequelize
  .sync()
  .then(result => {
    console.log('Database Connected!');
    app.listen(3333);
  })
  .catch(e => console.log(e));