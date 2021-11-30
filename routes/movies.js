import express from "express";
import {
  getMovies,
  addingMovie,
  getMovieById,
  deleteMovieById,
  updateMovieById,
} from "../helper.js";

const router = express.Router();

//Stage 2 Code (MongoDB): Find all Movies :
router.get("/", async (request, response) => {
  console.log(request.query);
  const { language, rating } = request.query;

  const filteredMovies = await getMovies();
  console.log(filteredMovies);
  response.send(filteredMovies);
});

//For Adding More Data :
router.post("/", async (request, response) => {
  const data = request.body;
  const result = await addingMovie(data);
  response.send(result);
});

//Find Movie By Id :
router.get("/:id", async (request, response) => {
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
router.delete("/:id", async (request, response) => {
  console.log(request.params);
  const { id } = request.params;
  const movie = await deleteMovieById(id);
  console.log(movie);
  movie.deletedCount > 0
    ? response.send(movie)
    : response.status(404).send({ message: "No Matching movies found" });
});

// Update Movie by Id :
router.put("/:id", async (request, response) => {
  console.log(request.params);
  const { id } = request.params;
  const data = request.body;
  const result = await updateMovieById(id, data);
  const movie = await getMovieById(id);
  response.send(movie);
});

export const moviesRouter = router;
