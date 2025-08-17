import express from "express";

import Book from "../db/books.js";
import User from "../db/users.js";
import uploader from "../middlewares/upload.js";
import axios from "axios";

const counterServiceUrl = process.env.COUNTER_SERVICE_URL || "http://localhost";
const router = express.Router();

router.get(
  "/",
  (req, res, next) => {
    if (!req.isAuthenticated()) {
      return res.redirect("/api/users/");
    }
    next();
  },
  async (req, res) => {
    try {
      const { action } = req.query;
      switch (action) {
        case "create":
          res.status(200).render("create", { title: "Adding book", book: {} });
          break;
        default:
          const books = await Book.find().select("-__v");
          res
            .status(200)
            .render("index", { title: "Books", books: books, user: {} });
          break;
      }
    } catch (error) {
      res.status(404).redirect("/api/errors/404/");
    }
  }
);

router.post("/", uploader.single("file-key"), async (req, res) => {
  const { title, description, authors, favorite, fileCover, fileName } =
    req.body;

  const newBook = new Book({
    title,
    description,
    authors,
    favorite,
    fileCover,
    fileName,
  });

  try {
    await newBook.save();
    res.status(200).redirect("/api/books/");
  } catch (error) {
    res.status(404).redirect("/api/errors/404/");
  }
});

async function viewById(res, id, book) {
  await axios.post(`${counterServiceUrl}/counter/${id}/incr`);

  const counterResponse = await axios.get(`${counterServiceUrl}/counter/${id}`);

  res.status(200).render("view", {
    book: book,
    counter: counterResponse.data.counter,
  });
}

function updateById(res, id, book) {
  res.status(200).render("update", { title: "Updating book", book: book });
}

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id).select("-__v");
    const { action } = req.query;
    switch (action) {
      case "update":
        updateById(res, id, book);
        break;
      default:
        viewById(res, id, book);
        break;
    }
  } catch (error) {
    res.status(404).redirect("/api/errors/404/");
  }
});

router.put("/:id", uploader.single("file-key"), async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, authors, favorite, fileCover, fileName } =
      req.body;

    await Book.findByIdAndUpdate(id, {
      title,
      description,
      authors,
      favorite,
      fileCover,
      fileName,
    });
    res.status(200).redirect("/api/books/");
  } catch (error) {
    res.status(404).redirect("/api/errors/404/");
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Book.deleteOne({ _id: id });
    res.status(200).redirect("/api/books/");
  } catch (error) {
    res.status(404).redirect("/api/errors/404/");
  }
});

export default router;
