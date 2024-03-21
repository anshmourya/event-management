import { Request, Response, NextFunction } from "express";
import user from "service/user";

const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        status: "Token is not present.",
        message: "You are not signed in.",
      });
    }

    const verifiedUser = await user.verifyToken(authHeader);
    req.user = verifiedUser;
    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    next(error);
  }
};

export default auth;
