import { Request, Response, NextFunction } from "express";
import user, { userProps } from "service/user.js";

class UserController {
  async signUp(req: Request, res: Response, next: NextFunction) {
    try {
      const newUser = await user.create(req.body);
      res.json({
        message: "user successfully signed up",
        data: newUser,
        status: "success",
      });
    } catch (error) {
      next(error);
    }
  }

  async createSession(req: Request, res: Response, next: NextFunction) {
    try {
      const checkCredential: userProps = await user.checkCredentials(req.body);
      const newToken = await user.createToken({
        role: checkCredential.role,
        name: checkCredential.name,
        id: checkCredential.id,
        email: checkCredential.email,
      });

      res.json({
        message: "user authentication completed successfully",
        status: "success",
        data: newToken,
      });
    } catch (error) {
      next(error);
    }
  }
}

const userController = new UserController();

export default userController;
