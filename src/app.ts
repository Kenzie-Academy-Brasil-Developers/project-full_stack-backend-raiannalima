import "express-async-errors";
import "reflect-metadata";
import express from "express";
import { authRouter, userRouter } from "./routers";
import anouncementRouter from "./routers/anouncement.router";

const app = express();
app.use(express.json());

app.use("/user", userRouter);
app.use("/login", authRouter);
app.use("/anouncement", anouncementRouter);

export default app;
