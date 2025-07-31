import fastify from "fastify";
import knex from "knex";
const knexfile = require("./knexfile");
const userRouter = require("./routers/user");
import cors from "@fastify/cors";
const server = fastify();

export const db = knex(knexfile.development);

server.register(cors, { origin: "*" });
server.register(userRouter);

server.listen(
  { port: Number(process.env.PORT) || 3001 },
  (err: Error | null, address: string) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(`Server running at ${address}`);
  }
);
