import express from "express";

const router = express.Router();

let user = {
  id: 1,
  mail: "test@mail.ru",
};

router.post("/login", (req, res) => {
  res.status(201).json(user);
});

export default router;
