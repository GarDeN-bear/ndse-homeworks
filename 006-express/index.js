import express from "express";

let user = {
  id: 1,
  mail: "test@mail.ru",
};

let id = 0;

let books = [];

const app = express();

app.use(express.json());

app.post("/api/user/login", (req, res) => {
  res.status(201).json(user);
});

app.get("/api/books", (req, res) => {
  res.status(200).json(books);
});

app.get("/api/books/:id", (req, res) => {
  const { id } = req.params;
  const bookIndex = books.findIndex((el) => el.id === id);

  if (bookIndex !== -1) {
    res.status(200).json(books[bookIndex]);
  } else {
    res.status(404).json({ error: "Book isn't found" });
  }
});

app.post("/api/books", (req, res) => {
  const { title, description, authors, favorite, fileCover, fileName } =
    req.body;

  books.push({
    id: (++id).toString(),
    title: title,
    description: description,
    authors: authors,
    favorite: favorite,
    fileCover: fileCover,
    fileName: fileName,
  });

  res.status(201).json(books[books.length - 1]);
});

app.put("/api/books/:id", (req, res) => {
  const { id } = req.params;
  const { title, description, authors, favorite, fileCover, fileName } =
    req.body;

  const bookIndex = books.findIndex((el) => el.id === id);

  if (bookIndex !== -1) {
    books[bookIndex] = {
      id: id.toString(),
      title: title,
      description: description,
      authors: authors,
      favorite: favorite,
      fileCover: fileCover,
      fileName: fileName,
    };
    res.status(200).json(books[bookIndex]);
  } else {
    res.status(404).json({ error: "Book isn't found" });
  }
});

app.delete("/api/books/:id", (req, res) => {
  const { id } = req.params;

  books = books.filter((el) => el.id !== id);
  res.status(200).json("ok");
});

const port = process.env.PORT || 3000;

app.listen(port);
