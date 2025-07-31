import express from "express";

import errorMiddleware from './middlewares/errors.js';
import users from "./routes/users.js";
import books from "./routes/books.js";

const app = express();

app.use(express.urlencoded());
app.use(express.json());
app.set("view engine", "ejs");

app.use("/api/user", users);
app.use("/api/books", books);
app.use(errorMiddleware);


const port = process.env.PORT || 3000;

app.listen(port);