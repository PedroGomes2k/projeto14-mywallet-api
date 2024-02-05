import {
  createNewTransaction,
  getAllTransactions,
} from "../services/user-service.js";
import httpStatus from "http-status";

export async function createTransaction(req, res) {
  const { price, active } = req.body;
  const { tipo } = req.params;
  const { authorization } = req.headers;

  await createNewTransaction(price, active, tipo, authorization);

  return res.sendStatus(httpStatus.CREATED);
}

export async function getHome(req, res) {
  const { authorization } = req.headers;

  const userTransactions = await getAllTransactions(authorization);

  return res.status(httpStatus.OK).send(userTransactions);
}
