import express from "express";

import userRoutes from "../modules/user/user.route.js";

const routes = express.Router();

routes.use("/users", userRoutes);

export default routes;