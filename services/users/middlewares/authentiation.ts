import { userByid } from "../models/user.model";

const { verifyToken } = require("../helpers/jwt");

async function authentication(req, reply, next) {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return reply
        .code(401)
        .send({ message: "Authorization token is required" });
    }

    const [bearer, accessToken] = token.split(" ");

    if (bearer !== "Bearer") {
      return reply.code(401).send({ message: "Invalid token format" });
    }

    const payload = verifyToken(accessToken);
    console.log(payload);

    const user = await userByid(payload.id);
    if (!user) {
      return reply
        .code(401)
        .send({ message: "Invalid token or user not found" });
    }

    req.user = {
      id: user.id,
      role: user.role,
    };

    return true;
  } catch (error) {
    return reply.code(401).send({ message: "Invalid token" });
  }
}

export default authentication;
