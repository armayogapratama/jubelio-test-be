import nodemailer from "nodemailer";
import db from "../config/config";

const transporter = nodemailer.createTransport({
  service: "gmail",
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

export const createUser = async ({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}) => {
  const user = await db
    .insert({
      name: name,
      email: email,
      password: password,
    })
    .into("users")
    .returning("*");

  return user[0];
};

export const loginUser = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const user = await db.select("*").from("users").where({ email });

  return user[0];
};

export const userByEmail = async (mail: string) => {
  const user = await db.select("*").from("users").where({ email: mail });

  return user[0];
};

export const sendResetPasswordEmail = async (
  email: string,
  resetLink: string
) => {
  const mailOptions = {
    from: "armayogaganssssss@gmail.com",
    to: email,
    subject: "Reset Password Request",
    text: `Click the link to reset your password: ${resetLink}`,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending email", error);
  }
};

export const updatePassword = async (password: string, email: string) => {
  const user = await db
    .update({ password: password })
    .into("users")
    .where({ email: email })
    .returning("*");

  return user[0];
};

export const userByid = async (id: number) => {
  const user = await db.select("*").from("users").where({ id });

  return user[0];
};
