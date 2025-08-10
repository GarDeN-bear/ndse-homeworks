import express from "express";
import mongoose from "mongoose";

import errorMiddleware from "./middlewares/errors.js";
import users from "./routes/users.js";
import books from "./routes/books.js";

import path from "path";
import { fileURLToPath } from "url";

import methodOverride from "method-override";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use("/api/user", users);
app.use("/api/books", books);
app.use(errorMiddleware);

async function startMongoDb(port, url) {
  try {
    await mongoose.connect(url);
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (e) {
    console.log(e);
  }
}

const port = process.env.PORT || 3000;
startMongoDb(port, process.env.ME_CONFIG_MONGODB_URL);
