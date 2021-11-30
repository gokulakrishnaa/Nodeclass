import { client } from "./index.js";

async function getMovies(filter) {
  return await client
    .db("moviedata")
    .collection("movies")
    .find(filter)
    .toArray();
}
async function getMovieById(id) {
  return await client.db("moviedata").collection("movies").findOne({ id: id });
}
async function addingMovie(data) {
  return await client.db("moviedata").collection("movies").insertMany(data);
}
async function updateMovieById(id, data) {
  return await client
    .db("moviedata")
    .collection("movies")
    .updateOne({ id: id }, { $set: data });
}
async function deleteMovieById(id) {
  return await client
    .db("moviedata")
    .collection("movies")
    .deleteOne({ id: id });
}

export {
  getMovies,
  addingMovie,
  getMovieById,
  deleteMovieById,
  updateMovieById,
};
