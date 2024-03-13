import { aws } from "service/aws";
import EventModel, { Event as eventprops } from "@schema/event";

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
      return eventArray;
    } catch (error) {
      console.error("Error getting all the events", error);
      throw error;
    }
  }
}

export const event = new Event();
