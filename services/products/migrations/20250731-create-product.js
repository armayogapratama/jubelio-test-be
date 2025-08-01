const knex = require("knex");
const knexfile = require("../knexfile");
const db = knex(knexfile.development);

const productDDL = `
  CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    quantity INT DEFAULT 0,
    category VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`;

async function checkConnection() {
  try {
    await db.raw("DROP TABLE IF EXISTS products;");
    await db.raw(productDDL);

    console.log("products table created");
  } catch (error) {
    console.log(error);
  } finally {
    db.destroy();
  }
}

checkConnection();
