import UserController from "../controllers/user.controller";
import authentication from "../middlewares/authentiation";

async function routes(fastify, options) {
  fastify.post(
    "/api/register",
    {
      schema: {
        body: {
          type: "object",
          required: ["name", "email", "password"],
          properties: {
            name: { type: "string", minLength: 3 },
            email: { type: "string", format: "email" },
            password: { type: "string", minLength: 6 },
          },
        },
      },
    },
    UserController.registerUser
  );
  fastify.post(
    "/api/login",
    {
      schema: {
        body: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: { type: "string", format: "email" },
            password: { type: "string", minLength: 6 },
          },
        },
      },
    },
    UserController.loginUser
  );
  fastify.post(
    "/api/forgot-password",
    {
      schema: {
        body: {
          type: "object",
          required: ["email"],
          properties: {
            email: { type: "string", format: "email" },
          },
        },
      },
      preHander: [authentication],
    },
    UserController.forgotPassword
  );
  fastify.put(
    "/api/reset-password",
    {
      schema: {
        body: {
          type: "object",
          required: ["token", "newPassword"],
          properties: {
            token: { type: "string" },
            newPassword: { type: "string", minLength: 6 },
          },
        },
      },
      preHander: [authentication],
    },
    UserController.resetPassword
  );
}

export default routes;
