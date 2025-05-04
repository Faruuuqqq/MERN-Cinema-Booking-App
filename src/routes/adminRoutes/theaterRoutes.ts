import express from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import { theaterSchema } from "../../utils/zodSchema";
import {
  getTheaters,
  postTheater,
  putTheater,
  deleteTheater,
  getDetailTheater,  
} from "../../controllers/theaterController";

const theaterRoutes = express.Router();

theaterRoutes.get("/theaters", getTheaters)
theaterRoutes.get("/theaters/:id", getDetailTheater)
theaterRoutes.post("/theaters", validateRequest(theaterSchema), postTheater)
theaterRoutes.put("/theaters/:id", validateRequest(theaterSchema), putTheater)
theaterRoutes.delete("/theaters/:id", deleteTheater);

export default theaterRoutes;
