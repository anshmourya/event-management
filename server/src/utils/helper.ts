import { Request } from "express";
import multer, { FileFilterCallback } from "multer";
class Helper {
  storage = multer.memoryStorage();
  upload = multer({
    storage: this.storage,
    limits: { fileSize: 1024 * 1024 * 5 }, //max size 5MB
    fileFilter: this.fileFilter,
  });

  fileFilter(req: Request, file: Express.Multer.File, cb: FileFilterCallback) {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type"));
    }
  }
}

export const helper = new Helper();
