import { aws } from 'service/aws';
import EventModel, { Event as eventprops } from '@schema/event';

type createEvent = Omit<eventprops, 'thumbnail'> & {
	thumbnail: Express.Multer.File;
};

class Event {
	async create(eventData: createEvent) {
		const { thumbnail, ...rest }: createEvent = eventData;
		const timestamp = new Date().getTime();

		const key = `${rest.name}-${timestamp}-${thumbnail.originalname}`;

		const imageData = await aws.uploadImage({
			Bucket: process.env.BUCKET_NAME || '',
			body: thumbnail.buffer,
			ContentType: thumbnail.mimetype,
			key,
		});
		//storing data in the db
		await EventModel.create({
			...rest,
			thumbnail: imageData.Location,
		});
		return true;
	}
}

export const event = new Event();
