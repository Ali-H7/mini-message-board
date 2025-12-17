const express = require('express');
const path = require('node:path');
const TimeAgo = require('javascript-time-ago');
const en = require('javascript-time-ago/locale/en');

const app = express();
// App settings
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
const assetsPath = path.join(__dirname, 'public');
app.use(express.static(assetsPath));

TimeAgo.addDefaultLocale(en);
const timeAgo = new TimeAgo('en-us');

const messages = [
  {
    text: 'Hi there!',
    user: 'Ali Hasan',
    added: timeAgo.format(new Date()),
  },
];

// Routes
app.get('/', (req, res) => {
  res.render('index', { messages: messages });
});

app.get('/new', (req, res) => {
  res.render('form');
});

app.post('/new', (req, res) => {
  const { userMessage, userName } = req.body;
  messages.push({ text: userMessage, user: userName, added: timeAgo.format(new Date()) });
  res.redirect('/');
});

// Server
const PORT = 3000;
app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`Express app - listening on port ${PORT}!`);
});
