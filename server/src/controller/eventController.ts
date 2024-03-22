import { Request, Response, NextFunction } from "express";
import { event } from "service/event";
import payment from "service/payment";
class EventController {
  async createEvent(req: Request, res: Response, next: NextFunction) {
    try {
      await event.create({
        ...req.body,
        thumbnail: req.file,
      });
      res.json({
        status: "success",
        message: "event have been created successfully",
        data: null,
      });
    } catch (error) {
      next(error);
    }
  }
  async getEventById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const foundEvent = await event.findById(id);
      res.json({
        status: "success",
        message: `event with the ${id} has been found successfully`,
        data: foundEvent,
      });
    } catch (error) {
      next(error);
    }
  }
  async getallEvents(req: Request, res: Response, next: NextFunction) {
    try {
      const eventArray = await event.getAll();
      res.json({
        status: "success",
        message: "Events has been found successfully",
        data: eventArray,
      });
    } catch (error) {
      next(error);
    }
  }
  async booking(req: Request, res: Response, next: NextFunction) {
    try {
      const { id, ...rest } = await event.createBookingOrder(req.body);
      const order = {
        key: process.env.RAZOR_PAY_KEY_ID,
        order_id: id,
        ...rest,
        prefill: {
          name: req.user.name,
          email: req.user.email,
          contact: "9000090000",
        },
        notes: {
          address: "this is the demo payment. Please do not pay the real money",
        },
        theme: {
          color: "#3399cc",
        },
      };
      return res.json({
        status: "success",
        message: "tickets has been booked successfully",
        data: order,
      });
    } catch (error) {
      next(error);
    }
  }

  async bookingVerfication(req: Request, res: Response, next: NextFunction) {
    try {
      const options = {
        ...req.body,
        userId: req.user.id,
      };

      const verifyPayment = await payment.verfiication(options);
      res.json({
        message: "booking has been done successfully",
        data: verifyPayment,
        status: "success",
      });
    } catch (error) {
      next(error);
    }
  }
}

const eventcontroller = new EventController();

export default eventcontroller;
