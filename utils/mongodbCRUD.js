import connectDB from "../connections/mongodb.connection.js";
import { ObjectId } from "mongodb";

export async function createFood(data) {
  const db = await connectDB();
  const result = await db.collection("foods").insertOne(data);
  return result;
}

export async function getAllFoods() {
  const db = await connectDB();
  return db.collection("foods").find().toArray();
}

export async function getFoodById(id) {
  const db = await connectDB();
  return db.collection("foods").findOne({ _id: new ObjectId(id) });
}

export async function updateFood(id, updateObj) {
  const db = await connectDB();
  const result = await db
    .collection("foods")
    .updateOne({ _id: new ObjectId(id) }, { $set: updateObj });
  return result;
}

export async function deleteFood(id) {
  const db = await connectDB();
  const result = await db
    .collection("foods")
    .deleteOne({ _id: new ObjectId(id) });
  return result;
}
