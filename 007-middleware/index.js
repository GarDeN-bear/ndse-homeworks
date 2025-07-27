import express from "express";

import users from "./routes/users.js";
import books from "./routes/books.js";

const app = express();

app.use(express.json());
app.use("/api/user", users);
app.use("/api/books", books);

const port = process.env.PORT || 3000;

app.listen(port);
