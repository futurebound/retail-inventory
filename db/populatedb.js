#! /usr/bin/env node
const dotenv = require('dotenv')
dotenv.config()

const { Client } = require('pg')

const SQL = `
CREATE TABLE IF NOT EXISTS categories (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO categories (name, description) 
VALUES
  ('Tea', 'All teas and tea products, e.g. green, oolong, herbal, etc.'),
  ('Coffee', 'All coffees, e.g. organic medium roast, holiday blend decaf, etc.'),
  ('Miscellaneous', 'Catchall category');
`

async function main() {
  console.log('seeding...')
  const client = new Client({
    connectionString: process.env.DB_URI,
  })
  await client.connect()
  await client.query(SQL)
  await client.end()
  console.log('done')
}

main()
