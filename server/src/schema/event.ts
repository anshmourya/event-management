import mongoose, { Schema, Document } from 'mongoose';

export interface Event extends Document {
	name: string;
	price: number;
	location: string;
	max_ticket: number;
	thumbnail: string;
	about?: string;
	tags?: string[];
	start_date: Date;
	end_date: Date;
}
const event: Schema<Event> = new Schema({
	name: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
	location: {
		type: String,
		required: true,
	},
	max_ticket: {
		type: Number,
		required: true,
	},
	thumbnail: {
		type: String,
		required: true,
	},
	about: String,
	tags: {
		type: [String],
	},
	start_date: {
		type: Date,
		required: true,
	},
	end_date: {
		type: Date,
		required: true,
	},
});

const EventModel = mongoose.model<Event>('event', event);

export default EventModel;
