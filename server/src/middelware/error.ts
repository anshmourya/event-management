/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from "express";

const error = (err: any, req: Request, res: Response, next: NextFunction) => {
  const status = err.name || "InternalServerError";
  let code = err.code || 400;
  if (typeof code === "string") {
    code = 400;
  }
  const message = err.message || "Something went wrong";
  const detail = err || "Backend error";
  res.status(code).json({
    status,
    message,
    detail,
  });
};

export default error;
