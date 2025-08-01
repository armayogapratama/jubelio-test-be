const knex = require("knex");
const knexfile = require("../knexfile");
const db = knex(knexfile.development);

const userDDL = `
  CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) CHECK (role IN ('buyer', 'admin')) DEFAULT 'buyer',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`;

async function checkConnection() {
  try {
    await db.raw("DROP TABLE IF EXISTS users;");
    await db.raw(userDDL);

    console.log("users table created");
  } catch (error) {
    console.log(error);
  } finally {
    db.destroy();
  }
}

checkConnection();
