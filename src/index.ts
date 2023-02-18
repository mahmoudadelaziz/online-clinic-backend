import express, { Express } from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import { errorHandler } from "./utils/errorhandler";
import { patientRouter, doctorRouter, locationRouter } from "./routers";
dotenv.config();
const app: Express = express();
const port = process.env.PORT;

app.use(express.json());
app.use(morgan("dev"));
app.use("/patient", patientRouter);
app.use("/doctor", doctorRouter);
app.use("/location", locationRouter);
app.use(errorHandler);
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
