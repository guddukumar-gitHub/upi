import express from "express";
import validateRequest from "../../middlewares/validateRequest.js";
import { getUserProfile, loginUser, signupUser } from "./user.controller.js";
import { loginValidationSchema, signupValidationSchema } from "./user.validation.js";
import auth from "../../middlewares/auth.js";

const userRoutes = express.Router();

userRoutes.get("/test", (req, res) => {
  res.send("Hello I'm here")
})

userRoutes.post(
  "/signup",
  validateRequest(signupValidationSchema),
  signupUser
);

userRoutes.post(
  "/login",
  validateRequest(loginValidationSchema),
  loginUser
);

userRoutes.get(
  "/profile",
  auth,
  getUserProfile
);

export default userRoutes;