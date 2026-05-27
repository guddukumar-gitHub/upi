import express from "express";

const userRoutes = express.Router();

userRoutes.get("/test", (req, res) => {
    res.send("Hello I'm here")
})

userRoutes.post("/create-user", (req, res) => {
  res.json({
    success: true,
    message: "User created"
  });
});

export default userRoutes;