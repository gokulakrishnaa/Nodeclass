import express from "express";
import { createUser, genPassword, getUserByName } from "../helper.js";

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

export const usersRouter = router;
