const fastify = require("fastify");
const userRouter = require("./routers/user.ts");
const cors = require("@fastify/cors");
const server = fastify();

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
