import mongoose, { Schema, Document } from "mongoose";

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
  ticket_booked?: number;
}

export interface Booking {
  createdBy: mongoose.Types.ObjectId | string;
  event: mongoose.Types.ObjectId | string;
  quantity: number;
  paid: boolean;
  paymentId: string;
  orderId: string;
  paymentSignature: string;
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
  ticket_booked: {
    type: Number,
    defaultValue: 0,
    required: true,
  },
});

const booking: Schema<Booking> = new Schema({
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  event: {
    type: Schema.Types.ObjectId,
    ref: "event",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  paid: {
    type: Boolean,
    required: true,
  },
  paymentId: {
    type: String,
    required: true,
  },
  orderId: {
    type: String,
    required: true,
  },
  paymentSignature: {
    type: String,
    required: true,
  },
});

const EventModel = mongoose.model<Event>("event", event);
export const BookingModel = mongoose.model<Booking>("booking", booking);
export default EventModel;
