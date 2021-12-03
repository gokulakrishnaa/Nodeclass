import { client } from "./index.js";
import { ObjectId } from "mongodb";
import bcrypt from "bcrypt";

async function getMovies(filter) {
  return await client
    .db("moviedata")
    .collection("movies")
    .find(filter)
    .toArray();
}
async function getMovieById(id) {
  return await client
    .db("moviedata")
    .collection("movies")
    .findOne({ _id: ObjectId(id) });
}
async function addingMovie(data) {
  return await client.db("moviedata").collection("movies").insertMany(data);
}
async function createUser(data) {
  return await client.db("moviedata").collection("users").insertOne(data);
}
async function updateMovieById(id, data) {
  return await client
    .db("moviedata")
    .collection("movies")
    .updateOne({ _id: ObjectId(id) }, { $set: data });
}
async function deleteMovieById(id) {
  return await client
    .db("moviedata")
    .collection("movies")
    .deleteOne({ _id: ObjectId(id) });
}

async function getUserByName(username) {
  return await client
    .db("moviedata")
    .collection("users")
    .findOne({ username: username });
}

async function genPassword(password) {
  const NO_OF_ROUNDS = 10;
  const salt = await bcrypt.genSalt(NO_OF_ROUNDS);
  console.log(salt);
  const hashedPassword = await bcrypt.hash(password, salt);
  console.log(hashedPassword);
}

export {
  getMovies,
  addingMovie,
  getMovieById,
  getUserByName,
  deleteMovieById,
  updateMovieById,
  genPassword,
  createUser,
};
