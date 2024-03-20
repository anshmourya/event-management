import { aws } from "service/aws";
import EventModel, {
  Booking,
  BookingModel,
  Event as eventprops,
} from "@schema/event";
import payment from "service/payment";
import { orderOptions } from "@type/global.types";

type createEvent = Omit<eventprops, "thumbnail"> & {
  thumbnail: Express.Multer.File;
};

class Event {
  async create(eventData: createEvent) {
    const { thumbnail, ...rest }: createEvent = eventData;
    const timestamp = new Date().getTime();

    const key = `${rest.name}-${timestamp}-${thumbnail.originalname}`;

    const imageData = await aws.uploadImage({
      Bucket: process.env.BUCKET_NAME || "",
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
  async findById(id: string): Promise<eventprops> {
    try {
      const foundEvent = await EventModel.findById(id);
      return foundEvent;
    } catch (error) {
      console.error("Error finding the event by id", error);
      throw error;
    }
  }

  async getAll(): Promise<eventprops[]> {
    try {
      const eventArray = await EventModel.find();
      if (eventArray?.length == 0) {
        throw new Error("There is no event");
      }
      return eventArray;
    } catch (error) {
      console.error("Error getting all the events", error);
      throw error;
    }
  }

  async createBookingOrder(details: { event: string }) {
    try {
      const foundEvent = await EventModel.findById(details.event);
      if (!foundEvent) throw new Error("Couldn't find event");
      if (foundEvent.ticket_booked >= foundEvent.max_ticket) {
        throw new Error("All ticket has been booked");
      }
      const options: orderOptions = {
        currency: "INR",
        amount: Number(foundEvent.price * 100), // amount in the smallest currency uint
        receipt: foundEvent.name,
      };
      const order = await payment.createOrder(options);
      return order;
    } catch (error) {
      console.error(
        "Error creating the booking order for the participant",
        error
      );
      throw error;
    }
  }

  async createBooking(bookingDetail: Booking) {
    try {
      const newBooking = await BookingModel.create(bookingDetail);
      return newBooking;
    } catch (error) {
      console.error("error creating the booking after the payment", error);
    }
  }
}

export const event = new Event();
