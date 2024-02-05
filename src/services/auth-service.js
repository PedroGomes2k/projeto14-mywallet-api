import { passwordInvalid } from "../errors/invalid-password-error.js";
import { verifyPasswordDifferent } from "../errors/verify-password-different-error.js";
import { emailAlreadyExist } from "../errors/user-exist-error.js";
import {
  createSessionForUser,
  findUser,
  createNewUser,
} from "../repositories/auth-repository.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

export async function createUser(name, email, password, verifyPassword) {
  const user = await findUser(email);
  if (user) throw emailAlreadyExist();

  verifyPasswords(password, verifyPassword);

  const hash = bcrypt.hashSync(password, 10);

  await createNewUser({
    name,
    email,
    password: hash,
    verifyPassword: hash,
  });
}

function verifyPasswords(password, verifyPassword) {
  if (
    password !== verifyPassword ||
    password.length < 3 ||
    verifyPassword.length < 3
  )
    throw verifyPasswordDifferent();
}

export async function getUser(email, password) {
  const user = await findUser(email);

  if (!user) throw passwordInvalid();

  if (user && bcrypt.compareSync(password, user.password) === false)
    throw passwordInvalid();

  const token = uuid();
  await createSessionForUser(user._id, token);

  return { token, name: user.name };
}
