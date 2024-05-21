import express from "express";
import {
  SIGN_UP,
  LOG_IN,
  GET_ALL_USERS,
} from "../controllers/user.controller.js";

const router = express.Router();

router.post("/users/sign_up", SIGN_UP);

router.post("/users/login", LOG_IN);
router.get("/users", GET_ALL_USERS);

export default router;
