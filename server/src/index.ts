import "dotenv/config";

import express, { Request, Response, NextFunction } from "express";
import router from "@routes/index";
import database from "@config/database";
import error from "@middelware/error";
import auth from "@middelware/auth";
import cors from "cors";
const app = express();
const port = process.env.port || 3000;
app.use(cors());
app.use(express.json());

const skipMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const url = req.originalUrl;
  if (url === "/api/v1/create" || url === "/api/v1/createsession") {
    return next();
  }
  auth(req, res, next);
};

app.use(skipMiddleware);
app.use("/api/v1", router);
app.use(error);
database()
  .then(() =>
    app.listen(port, () => {
      return console.log(`Express is listening at ${port}`);
    })
  )
  .catch((error) => {
    console.error(error);
  });

setInterval(() => {
  console.log("keeping the server alive");
}, 300000);
