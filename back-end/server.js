import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { mongodburl, port, api } from "./constant.js";
import userRouterApi from "./router/api/v1/userRouter.js";

const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect(mongodburl)
  .then(() => {
    console.log("MongoDB Connected");

    
  })
  .catch(() => {
    console.log("MongoDB Connection Failed");
  });
app.use(`${api}/user`, userRouterApi);
app.listen(port, () => {
  console.log("Server Running...");
});