import { db } from "../database/database.connection.js";

export async function createNewUser(data){
  return await db.collection("register").insertOne(data)
}

export async function findUser(email) {
  return await db.collection("register").findOne({ email });
}

export async function createSessionForUser(id, token) {
  return await db.collection("sessions").insertOne({ userId: id, token });
}

