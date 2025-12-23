const queries = require('./db/queries');
const TimeAgo = require('javascript-time-ago');
const en = require('javascript-time-ago/locale/en');
TimeAgo.addDefaultLocale(en);

const timeAgo = new TimeAgo('en-us');

async function fetchMessages(req, res) {
  const messages = await queries.getAllMessages();
  res.render('index', { messages, formatDate: (date) => timeAgo.format(date) });
}

async function newMessage(req, res) {
  const { userMessage, userName } = req.body;
  await queries.addMessage(userMessage, userName);
  res.redirect('/');
}

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
