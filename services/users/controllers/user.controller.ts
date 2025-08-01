import SignPassword, { verifyPassword } from "../helpers/hash";
import { SignToken } from "../helpers/jwt";
import {
  createUser,
  loginUser,
  sendResetPasswordEmail,
  updatePassword,
  userByEmail,
} from "../models/user.model";
import jwt from "jsonwebtoken";

class UserController {
  static async registerUser(req, reply) {
    try {
      const { name, email, password } = req.body;

      const user = await createUser({
        name,
        email,
        password: SignPassword(password),
      });

      reply.code(201).send({
        status: "Success",
        message: "User created successfully",
        data: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  static async loginUser(req, reply) {
    try {
      const { email, password } = req.body;

      const user = await loginUser({
        email,
        password,
      });

      if (!user || !verifyPassword(password, user.password))
        throw { name: "InvalidUser" };

      const accessToken = SignToken({
        id: user.id,
        email: user.email,
        role: user.role,
      });

      reply.code(200).send({
        status: "Success",
        message: "User logged in successfully",
        data: accessToken,
      });
    } catch (error) {
      console.log(error);
    }
  }

  static async forgotPassword(req, reply) {
    try {
      const { email } = req.body;

      const user = await userByEmail(email);

      if (!user) throw { name: "InvalidUser" };

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      const resetLink = `http://localhost:3001/api/reset-password?token=${token}`;

      await sendResetPasswordEmail(email, resetLink);

      reply.code(200).send({
        status: "Success",
        message: "Reset password link sent to your email",
        data: {
          email: user.email,
          resetLink: resetLink,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  static async resetPassword(req, reply) {
    try {
      const { token, newPassword } = req.body;

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const user = await userByEmail(decoded.email);

      if (!user) throw { name: "InvalidUser" };

      const hashedPassword = SignPassword(newPassword);

      await updatePassword(hashedPassword, user.email);

      reply.code(200).send({
        status: "Success",
        message: "Password reset successfully",
        data: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }
}

export default UserController;
