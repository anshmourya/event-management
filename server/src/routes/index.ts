import eventcontroller from "@controller/eventController";
import userController from "@controller/userController";
import validate from "@middelware/schemaVaidation";
import { helper } from "@utils/helper";
import { paymentVerificationSchema } from "@utils/validation";
import express from "express";
const router = express.Router();
router.get("/", (req, res) => {
  res.send("ok");
});
router.post("/create", userController.signUp);
router.post("/createSession", userController.createSession);
router.post(
  "/createEvent",
  helper.upload.single("thumbnail"), //for multer you have to proveide exact name of the file like "anshM"
  eventcontroller.createEvent
);
router.get("/event/list", eventcontroller.getallEvents);
router.get("/event/:id", eventcontroller.getEventById);

//bookings
router.post("/bookingOrder", eventcontroller.booking);
router.post(
  "/bookingVerification",
  validate(paymentVerificationSchema),
  eventcontroller.bookingVerfication
);

export default router;
