import { db } from "../database/database.connection.js";

export async function verifyUserToken(token) {
  return db.collection("sessions").findOne({ token });
}

export async function findUser(id) {
  return db.collection("register").findOne({ _id: id });
}

export async function insertTransaction(transaction) {
  return db.collection("transaction").insertOne(transaction);
}

export async function findByIdUserTransactions(userId) {
  return await db.collection("transaction").find({userId: userId }).toArray();
}
