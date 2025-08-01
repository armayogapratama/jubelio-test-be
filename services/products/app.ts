const fastify = require("fastify");
const knex = require("knex");
const knexfile = require("./knexfile");
const productRouter = require("./routers/product.ts");
const cors = require("@fastify/cors");
const server = fastify();

const db = knex(knexfile.development);

server.register(cors, { origin: "*" });
server.register(productRouter);

server.listen(
  { port: Number(process.env.PORT) || 3002 },
  (err: Error | null, address: string) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(`Server running at ${address}`);
  }
);

module.exports = db;
