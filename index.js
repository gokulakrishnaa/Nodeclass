import express from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";

const app = express();
const PORT = 9000;

app.use(express.json());

dotenv.config();

const MONGO_URL = process.env.MONGO_URL;

async function createConnection() {
  const client = new MongoClient(MONGO_URL);
  await client.connect();
  console.log("MongoDB Connected");
  return client;
}

const client = await createConnection();

app.get("/", (request, response) => {
  response.send("Hello Gokul");
});

//Stage 2 Code (MongoDB): Find all Movies :
app.get("/movies", async (request, response) => {
  console.log(request.query);
  const { language, rating } = request.query;

  const filteredMovies = await getMovies();
  console.log(filteredMovies);
  response.send(filteredMovies);
});

//For Adding More Data :
app.post("/movies", async (request, response) => {
  const data = request.body;
  const result = await addingMovie(data);
  response.send(result);
});

//Find Movie By Id :
app.get("/movies/:id", async (request, response) => {
  console.log(request.params);
  const { id } = request.params;
  // const movie = movies.filter((mv) => mv.id === id)[0];
  const movie = await getMovieById(id);
  console.log(movie);
  movie
    ? response.send(movie)
    : response.status(404).send({ message: "No Matching movies found" });
});

// Delete Movie by Id :
app.delete("/movies/:id", async (request, response) => {
  console.log(request.params);
  const { id } = request.params;
  const movie = await deleteMovieById(id);
  console.log(movie);
  movie.deletedCount > 0
    ? response.send(movie)
    : response.status(404).send({ message: "No Matching movies found" });
});

// Update Movie by Id :
app.put("/movies/:id", async (request, response) => {
  console.log(request.params);
  const { id } = request.params;
  const data = request.body;
  const result = await updateMovieById(id, data);
  const movie = await getMovieById(id);
  response.send(movie);
});

app.listen(PORT, () => console.log("App Started in", PORT));

async function getMovies() {
  return await client.db("moviedata").collection("movies").find({}).toArray();
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
