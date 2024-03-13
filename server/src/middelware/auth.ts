import { Request, Response, NextFunction } from "express";
import user from "service/user";

const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({
        status: "Token is not present.",
        message: "you are not signed in.",
      });
    }

    await user.verifyToken(authHeader);
    next();
  } catch (error) {
    console.error("auth middelware error:", error);
    next(error);
  }
};

export default auth;
