import {
  findByIdUserTransactions,
  insertTransaction,
  verifyUserToken,
} from "../repositories/user-repository.js";
import { tokenInstPass } from "../errors/token-inst-pass-error.js";
import { unauthorized } from "../errors/unauthorized-error.js";
import { findUser } from "../repositories/auth-repository.js";
import dayjs from "dayjs";
import { priceNevative } from "../errors/price-negative.js";

export async function createNewTransaction(price, active, tipo, authorization) {
  const session = await verifyToken(authorization);

  if (!price || price <= 0) throw priceNevative();

  const transaction = {
    price,
    active,
    extrato: tipo,
    userId: session,
    date: dayjs().format("DD/MM"),
  };

  await insertTransaction(transaction);
}

export async function verifyToken(authorization) {
  const token = authorization?.replace("Bearer ", "");
  if (!token) throw tokenInstPass();

  const session = await verifyUserToken(token);

  if (!session) throw unauthorized();

  const user = await findUser(session.userId);

  return session.userId;
}

export async function getAllTransactions(authorization) {
  const userId = await verifyToken(authorization);

  const transactions = await findByIdUserTransactions(userId);

  return transactions;
}
