import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import { errorHandler } from "./utils/errorhandler";
import { userRouter } from "./routers/user.router";
dotenv.config();
const app: Express = express();
const port = process.env.PORT;

app.use(express.json());
app.use(morgan("dev"));
app.use("/user", userRouter);
app.use(errorHandler);
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
