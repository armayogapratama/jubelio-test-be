import jwt, { JwtPayload } from "jsonwebtoken";

const secret_key = (process.env.JWT_SECRET as string) || "juarakampung";

export function SignToken(payload: JwtPayload) {
  const token = jwt.sign(payload, secret_key);
  return token;
}

export function verifyToken(token: string) {
  const payload = jwt.verify(token, secret_key);
  return payload;
}
