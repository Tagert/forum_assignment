import express from "express";
import {
  SIGN_UP,
  LOG_IN,
  GET_USER_BY_ID,
  GET_ALL_USERS,
  VERIFY_TOKEN,
} from "../controllers/user.controller.js";

const router = express.Router();

router.post("/users/sign_up", SIGN_UP);

router.post("/users/login", LOG_IN);

router.get("/users", GET_ALL_USERS);

router.get("/user/:id", GET_USER_BY_ID);

router.post("/verify_token", VERIFY_TOKEN);

export default router;
