import { UserModel } from "@schema/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export interface userProps {
  id?: string;
  name: string;
  password: string;
  email: string;
  role: string;
}

class User {
  async create(user: userProps) {
    try {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
      await UserModel.create(user);
      return true;
    } catch (error) {
      const errString = error.toString();
      // handling the error Mongo throws if the user exists during creation
      if (errString.includes("E11000"))
        throw { message: "User already exists", code: 409 };

      throw { message: errString, code: 500 };
    }
  }

  async updateUser(user: userProps) {
    try {
      const updateUser = await UserModel.findByIdAndUpdate(user.id, user, {
        new: true,
      });
      return updateUser;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async checkCredentials(user: userProps) {
    try {
      const userExist = await UserModel.findOne({ email: user.email });
      if (!userExist) throw { message: "user does not exist", code: 400 };
      if (!(await bcrypt.compare(user.password, userExist.password))) {
        throw { message: "Incorrect password", code: 401 };
      }
      return userExist;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async createToken(user: { id: string; name: string; role: string }) {
    try {
      const token = jwt.sign(user, process.env.SECRET_KEY, {
        expiresIn: "30d",
      });
      return token;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async verifyToken(
    token: string
  ): Promise<{ id: string; name: string; role: string }> {
    return new Promise((resolve, reject) => {
      jwt.verify(
        token,
        process.env.SECRET_KEY,
        (error, user: jwt.JwtPayload) => {
          if (error)
            reject({
              message: "Invalid token",
              code: 401,
            });
          resolve({
            id: user.id,
            name: user.name,
            role: user.role,
          });
        }
      );
    });
  }
}

const user = new User();

export default user;
