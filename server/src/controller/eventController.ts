import { Request, Response, NextFunction } from 'express';
import { event } from 'service/event';
class EventController {
	async createEvent(req: Request, res: Response, next: NextFunction) {
		try {
			await event.create({
				...req.body,
				thumbnail: req.file,
			});
			res.json({
				status: 'success',
				message: 'event have been created successfully',
				data: null,
			});
		} catch (error) {
			next(error);
		}
	}
}

const eventcontroller = new EventController();

export default eventcontroller;
