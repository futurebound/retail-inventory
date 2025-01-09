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

CREATE TABLE suppliers (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(255) NOT NULL,
  contact_email VARCHAR(255),
  phone_number VARCHAR(15),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO suppliers (name, contact_email, phone_number) 
VALUES
  ('Pure Green INC', 'hi@puregreen.com', '0000000000'),
  ('Never Better Tea', 'tea@nbt.com', '1111111111'),
  ('Roastys Coffee House', 'support@roastys.co', '1234567890');


CREATE TABLE IF NOT EXISTS products (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  stock_quantity INT NOT NULL,
  category_id INT REFERENCES categories(id) ON DELETE SET NULL,
  supplier_id INT REFERENCES suppliers(id),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO products (name, description, price, stock_quantity, category_id, supplier_id)
VALUES
  ('Milky Oolong', 'Delicious Oolong tea, milky tones', 14.99, 20, 1, 1),
  ('Sweet Green', 'A fruity Green tea', 9.99, 15, 1, 1),
  ('Bitter Green', 'Because coffee', 2.99, 10, 1, 2),
  ('Davis Dark Roast', 'Rustic, full-bodied dark roast', 8.99, 10, 2, 3),
  ('Coffee Tea', 'Pushing categorical boundaries', 13.99, 22, 1, 3);
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
