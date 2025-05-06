import mongoose from "mongoose";
import { getAssetUrl } from "../utils/helper";
import Genre from "./Genre"
import Theater from "./Theater";

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
    genre: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Genre"
    },
    theaters: [
      {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Theater"
      }
    ],
    desciption: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    price: Number,
    available: Boolean,
    bonus: String
  },
  {
    virtuals: {
      thumbnailUrl: {
        get() {
          return `${getAssetUrl()}${this.thumbnail}`
        },
      },
    },
    toJSON: {
      virtuals: true,
    },
  },
);

export default mongoose.model("Movie", movieSchema, "movies");