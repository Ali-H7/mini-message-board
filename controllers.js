const queries = require('./db/queries');
const TimeAgo = require('javascript-time-ago');
const en = require('javascript-time-ago/locale/en');
TimeAgo.addDefaultLocale(en);

const timeAgo = new TimeAgo('en-us');

const { body, validationResult, matchedData } = require('express-validator');

const validateMessage = [
  body('userName').trim().isLength({ min: 3 }).withMessage('Username must be at least 3 characters.'),
  body('userMessage')
    .trim()
    .isLength({ min: 10, max: 120 })
    .withMessage('Message must be at least 10 characters and no more than 120 characters.'),
];

async function fetchMessages(req, res) {
  const messages = await queries.getAllMessages();
  res.render('index', { messages, formatDate: (date) => timeAgo.format(date) });
}

const newMessage = [
  validateMessage,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const { userName, userMessage } = req.body;
      res.render('form', { errors: errors.array(), userName, userMessage });
    } else {
      const { userMessage, userName } = matchedData(req);
      await queries.addMessage(userMessage, userName);
      res.redirect('/');
    }
  },
];

async function fetchMessage(req, res) {
  const { id } = req.params;
  const message = await queries.lookForMessage(id);
  res.render('message', { message, formatDate: (date) => timeAgo.format(date) });
}

module.exports = {
  fetchMessages,
  newMessage,
  fetchMessage,
};
