require('dotenv').config();
const express = require('express');
const path = require('node:path');
const TimeAgo = require('javascript-time-ago');
const en = require('javascript-time-ago/locale/en');
const queries = require('./db/queries');
const app = express();
// App settings
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
const assetsPath = path.join(__dirname, 'public');
app.use(express.static(assetsPath));

TimeAgo.addDefaultLocale(en);
const timeAgo = new TimeAgo('en-us');

// Routes
app.get('/', async (req, res) => {
  const messages = await queries.getAllMessages();
  res.render('index', { messages, formatDate: (date) => timeAgo.format(date) });
});

app.get('/new', (req, res) => {
  res.render('form');
});

app.post('/new', async (req, res) => {
  const { userMessage, userName } = req.body;
  await queries.addMessage(userMessage, userName);
  res.redirect('/');
});

app.get('/msg/:id', async (req, res) => {
  const { id } = req.params;
  const message = await queries.lookForMessage(id);
  res.render('message', { message, formatDate: (date) => timeAgo.format(date) });
});

// Server
const PORT = 3000;
app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`Express app - listening on port ${PORT}!`);
});
