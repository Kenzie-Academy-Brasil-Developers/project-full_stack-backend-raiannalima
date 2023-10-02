import "express-async-errors";
import "reflect-metadata";
import express from "express";
import { userRouter } from "./routers";

const app = express();
app.use(express.json());

app.use("/users", userRouter);


export default app;
