import { apis, baseUrl } from "@/utils/apis";

interface Event {
  name: string;
  price: number;
  location: string;
  max_ticket: number;
  thumbnail: File;
  about?: string;
  tags?: string[];
  start_date: Date;
  end_date: Date;
  ticket_booked?: number;
}

const useEvent = () => {
  const createEvent = async (newEvent: Event) => {
    try {
      await apis.post(`${baseUrl}/api/v1/createEvent`, {
        data: newEvent,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return true;
    } catch (error) {
      console.error("errror creating the event", error);
      throw error;
    }
  };

  return { createEvent };
};

export default useEvent;
