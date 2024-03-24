import eventcontroller from "@controller/eventController";
import userController from "@controller/userController";
import { helper } from "@utils/helper";
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
router.post("/bookingVerification", eventcontroller.bookingVerfication);
router.get("/bookings/list", eventcontroller.getBookingByUser);

export default router;
