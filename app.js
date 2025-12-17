const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('Home'));
app.get('/new', (req, res) => res.send('New'));

const PORT = 3000;
app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`Express app - listening on port ${PORT}!`);
});
