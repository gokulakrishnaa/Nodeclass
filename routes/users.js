import express from "express";
import { createUser, genPassword, getUserByName } from "../helper.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const router = express.Router();

router.route("/signup").post(async (request, response) => {
  const { username, password } = request.body;

  const userFromDB = await getUserByName(username);
  if (userFromDB) {
    response.status(400).send({ message: "Username already exists" });
    return;
  }

  if (password.length < 8) {
    response.status(400).send({ message: "Password must be longer" });
    return;
  }

  if (
    !/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@!#%&]).{8,}$/g.test(password)
  ) {
    response.status(400).send({ message: "Password pattern does not Match" });
    return;
  }

  const hashedPassword = await genPassword(password);
  const result = await createUser({ username, password: hashedPassword });
  response.send(result);
});

router.route("/login").post(async (request, response) => {
  const { username, password } = request.body;

  const userFromDB = await getUserByName(username);
  if (!userFromDB) {
    response.status(401).send({ message: "Invalid Credentials" });
    return;
  }

  if (password.length < 8) {
    response.status(401).send({ message: "Password must be longer" });
    return;
  }

  const storedPassword = userFromDB.password;
  const isPasswordMatch = await bcrypt.compare(password, storedPassword);

  if (isPasswordMatch) {
    const token = jwt.sign({ id: userFromDB._id }, process.env.SECRET_KEY);
    response.send({ message: "Successful Login", token: token });
  } else {
    response.status(400).send({ message: "Invalid Credentials" });
  }
});

export const usersRouter = router;
