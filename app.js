require('dotenv').config();
const express = require('express');
const path = require('node:path');
const app = express();
const controllers = require('./controllers');

// App settings
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
const assetsPath = path.join(__dirname, 'public');
app.use(express.static(assetsPath));

// Routes
app.get('/', controllers.fetchMessages);
app.get('/new', (req, res) => {
  res.render('form', { errors: [], userName: '', userMessage: '' });
});
app.post('/new', controllers.newMessage);
app.get('/msg/:id', controllers.fetchMessage);

// Server
const PORT = 3000;
app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`Express app - listening on port ${PORT}!`);
});
