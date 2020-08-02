import "dotenv/config";
import "reflect-metadata";
import cors from "cors";
import morgan from "morgan";
import express from "express";
import cookieParser from "cookie-parser";
import indexRoutes from "./routes/index";
import authToken from "./routes/auth_tokens";
import { Auth_Server } from "./configs/server";

const app = express();
(async () => {
  app.use(
    cors({
      origin: process.env.FRONTEND_POINT,
      credentials: true,
    })
  );
  // /** set cookie parser before routes */
  app.use(cookieParser());
  // app.use(express.json());
  // app.use(express.urlencoded({ extended: false }));
  // DB connections
  await Auth_Server();

  // logger
  if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
  }

  // routes
  app.use("/", indexRoutes, authToken);
})();

export default app;
