import { Request, Response, NextFunction } from "express";
import * as Yup from "Yup";
const validate =
  (schema: Yup.Schema<unknown>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validate({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (error) {
      console.error("error in req.body validation", error);
      res.status(409).json({
        status: error.name,
        message: error.message,
        detail: error,
      });
    }
  };

export default validate;
