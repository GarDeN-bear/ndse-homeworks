import express from "express";
import path from "path";
import {v4 as uuid} from "uuid";

import uploader from "../middlewares/upload.js";

const router = express.Router();

let id = 0;

let books = [];

router.get("/", (req, res) => {
  res.status(200).json(books);
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const bookIndex = books.findIndex((el) => el.id === id);

  if (bookIndex !== -1) {
    res.status(200).json(books[bookIndex]);
  } else {
    res.status(404).json({ error: "Book isn't found" });
  }
});

router.get("/:id/download", (req, res) => {
  const { id } = req.params;
  const bookIndex = books.findIndex((el) => el.id === id);

  if (bookIndex !== -1 && books[bookIndex].fileBook) {
    const filePath = books[bookIndex].fileBook;
    res.status(200).download(filePath, path.basename(filePath));
  } else {
    res.status(404).json({ error: "Book isn't found" });
  }
});

router.post("/", uploader.single("file-key"), (req, res) => {
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

  res.status(201).json(books[books.length - 1]);
});

router.put("/:id", uploader.single("file-key"), (req, res) => {
  const { id } = req.params;

  const fileBook = req.file ? req.file.path : null;

  const { title, description, authors, favorite, fileCover, fileName } =
    req.body;

  const bookIndex = books.findIndex((el) => el.id === id);

  if (bookIndex !== -1) {
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
    res.status(200).json(books[bookIndex]);
  } else {
    res.status(404).json({ error: "Book isn't found" });
  }
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  books = books.filter((el) => el.id !== id);
  res.status(200).json("ok");
});

export default router;
