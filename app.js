const express = require('express');
const path = require('node:path');
const app = express();

const messages = [
  {
    text: 'Hi there!',
    user: 'Akira',
    added: new Date(),
  },
  {
    text: 'Hello World!',
    user: 'Ali',
    added: new Date(),
  },
];

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.render('index', { messages: messages });
});

app.get('/new', (req, res) => {
  res.render('form');
});

app.post('/new', (req, res) => {
  const { userMessage, userName } = req.body;
  messages.push({ text: userMessage, user: userName, added: new Date() });
  res.redirect('/');
});

const PORT = 3000;
app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`Express app - listening on port ${PORT}!`);
});
