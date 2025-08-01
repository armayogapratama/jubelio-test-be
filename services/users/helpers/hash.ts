import bcrypt from "bcryptjs";

export default function SignPassword(password: string) {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  return hash;
}

export function verifyPassword(planPass: string, hash: string) {
  return bcrypt.compareSync(planPass, hash);
}
