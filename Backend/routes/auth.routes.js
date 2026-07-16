import express from "express";

import {
  signIn,
  signOut,
  signUp,
  forgotPassword,
  resetPassword,
  googleSignIn,
  googleCheckUser,
  getCurrentUser,
} from "../controllers/auth.controllers.js";

import authMiddleware from "../middlewares/auth.middleware.js";

const authRouter = express.Router();

/* ==========================================
   Authentication
========================================== */

authRouter.post("/signup", signUp);

authRouter.post("/signin", signIn);

authRouter.get("/signout", signOut);

/* ==========================================
   Current User
========================================== */

authRouter.get(
  "/me",
  authMiddleware,
  getCurrentUser
);

/* ==========================================
   Password Reset
========================================== */

authRouter.post(
  "/forgotpassword",
  forgotPassword
);

authRouter.post(
  "/resetpassword/:token",
  resetPassword
);

/* ==========================================
   Google Authentication
========================================== */

authRouter.post("/google", googleSignIn);

authRouter.post(
  "/google-check",
  googleCheckUser
);

export default authRouter;