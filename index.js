import express from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import {
  getMovies,
  addingMovie,
  getMovieById,
  deleteMovieById,
  updateMovieById,
} from "./helper.js";
import { moviesRouter } from "./routes/movies.js";
import { usersRouter } from "./routes/users.js";
import cors from "cors";

dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

const MONGO_URL = process.env.MONGO_URL;

async function createConnection() {
  const client = new MongoClient(MONGO_URL);
  await client.connect();
  console.log("MongoDB Connected");
  return client;
}

export const client = await createConnection();

app.get("/", (request, response) => {
  response.send("Hello Gokul");
});

app.use("/movies", moviesRouter);
app.use("/users", usersRouter);

app.get("/recipes", async (request, response) => {
  const recipes = await client
    .db("moviedata")
    .collection("recipes")
    .find({})
    .toArray();
  response.send(recipes);
});

app.post("/recipes", async (request, response) => {
  const data = request.body;
  const result = await client
    .db("moviedata")
    .collection("recipes")
    .insertMany(data);
  response.send(result);
});

app.listen(PORT, () => console.log("App Started in", PORT));
