import { Request, Response, NextFunction } from "express";
import { event } from "service/event";
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
}

const eventcontroller = new EventController();

export default eventcontroller;
