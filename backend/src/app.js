import express from "express";
import cors from "cors";

import routes from "./routes/index.js";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Server Running...");
});

app.use("/api/v1", routes);

export default app;