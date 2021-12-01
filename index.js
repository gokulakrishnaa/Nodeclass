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

dotenv.config();
const app = express();
const PORT = process.env.PORT;

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

app.listen(PORT, () => console.log("App Started in", PORT));
