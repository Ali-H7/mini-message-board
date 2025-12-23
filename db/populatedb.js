#! /usr/bin/env node
require('dotenv').config();
const { Client } = require('pg');

const createTable = `CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_text TEXT,
  user_name VARCHAR ( 255 ),
  date TIMESTAMPTZ 
);`;

const insertQuery = 'INSERT INTO messages (user_text, user_name, date) VALUES ($1, $2, $3)';
const data = [
  ['Hi There!', 'Ali Hasan', new Date(2025, 11, 20, 15, 39)],
  ['I wonder how long it took to made this website?', 'Odin', new Date(2025, 11, 21, 17, 57)],
  ['I ate a pizza for a dinner it was so good, just wanted to share haha.', 'Asmon', new Date()],
];

async function main() {
  console.log('seeding...');
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });
  await client.connect();
  client.query(createTable);
  for (const row of data) {
    await client.query(insertQuery, row);
  }
  await client.end();
  console.log('done');
}

main();
