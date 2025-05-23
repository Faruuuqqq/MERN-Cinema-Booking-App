import express from "express";
import multer from "multer";
import { createMovie, getDetailMovie, getMovies, updateMovie, deleteMovie } from "../../controllers/movieController";
import { imageFilter, thumbnailStorage } from "../../utils/multer";

const upload = multer({ storage: thumbnailStorage(), fileFilter: imageFilter })
const movieRoutes = express.Router();

movieRoutes.get("/movies", getMovies);
movieRoutes.get("/movies/:id", getDetailMovie);
movieRoutes.post("/movies", upload.single("thumbnail") ,createMovie);
movieRoutes.put("/movies", upload.single("thumbnail") ,updateMovie);
movieRoutes.delete("/movies/:id", deleteMovie);

export default movieRoutes;