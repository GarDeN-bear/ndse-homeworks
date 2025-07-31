import express from "express";
import path from "path";
import { v4 as uuid } from "uuid";

import uploader from "../middlewares/upload.js";

const router = express.Router();

let books = [];

router.get("/", (req, res) => {
  res.status(200).render("index", {title: "Books", books: books });
});

router.get("/create", (req, res) => {
  res.status(200).render('create', {title: "Adding book", book: {}});
});

router.post("/create", (req, res) => {
  const { title, description, authors, favorite, fileCover, fileName } =
    req.body;
  const fileBook = req.file ? req.file.path : null;

  books.push({
    id: uuid(),
    title: title,
    description: description,
    authors: authors,
    favorite: favorite === "true",
    fileCover: fileCover,
    fileName: fileName,
    fileBook: fileBook,
  });

  res.status(201).redirect('/api/books/');
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const bookIndex = books.findIndex((el) => el.id === id);

  if (bookIndex !== -1) {
    res.status(200).render("view", {book: books[bookIndex]});
  } else {
    res.status(404);
  }
});

router.post("/:id", (req, res) => {
  const { id } = req.params;

  books = books.filter((el) => el.id !== id);
  res.status(201).redirect('/api/books/');
});

router.get("/update/:id", (req, res) => {
    const { id } = req.params;
  const bookIndex = books.findIndex((el) => el.id === id);

  if (bookIndex !== -1) {
    res.status(200).render("update", {title: "Updating book", book: books[bookIndex]});
  } else {
    res.status(404);
  }
});

router.post("/update/:id", (req, res) => {
  const { id } = req.params;

  const { title, description, authors, favorite, fileCover, fileName } =
    req.body;
  
  const bookIndex = books.findIndex((el) => el.id === id);

  if (bookIndex !== -1) {
    const fileBook = req.file ? req.file.path : null;
    books[bookIndex] = {
        id: books[bookIndex].id,
        title: title,
        description: description,
        authors: authors,
        favorite: favorite === "true",
        fileCover: fileCover,
        fileName: fileName,
        fileBook: fileBook,
      };
      res.status(201).redirect('/api/books/');
  } else {
    res.status(404);
  }
  
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  books = books.filter((el) => el.id !== id);
  res.status(200).json("ok");
});

export default router;
