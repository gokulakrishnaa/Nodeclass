import { client } from "./index.js";
import { ObjectId } from "mongodb";

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

export {
  getMovies,
  addingMovie,
  getMovieById,
  deleteMovieById,
  updateMovieById,
};
