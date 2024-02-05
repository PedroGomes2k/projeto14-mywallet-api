import { getUser, createUser } from "../services/auth-service.js";
import httpStatus from "http-status";

export async function signUp(req, res) {
  const { name, email, password, verifyPassword } = req.body;

  await createUser(name, email, password, verifyPassword);

  return res.sendStatus(httpStatus.OK);
}

export async function login(req, res) {
  const { email, password } = req.body;

  const loginUser = await getUser(email, password);

  return res.status(httpStatus.OK).send(loginUser);
}
