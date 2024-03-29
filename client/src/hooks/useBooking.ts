import { apis, baseUrl } from "@/utils/apis";
import toast from "react-hot-toast";
export interface paymentVerification {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
  eventId: string;
}

interface Booking {
  _id: string;
  createdBy: string;
  event: {
    _id: string;
    name: string;
    price: number;
    location: string;
    max_ticket: number;
    thumbnail: string;
    tags: string[];
    start_date: Date;
    end_date: Date;
    ticket_booked: number;
  };
  paid: boolean;
}

const useBooking = () => {
  const createOrder = async (eventId: string) => {
    try {
      const { data } = await apis.post(`${baseUrl}/api/v1/bookingOrder`, {
        data: {
          event: eventId,
        },
      });

      return data.data;
    } catch (error) {
      throw new Error(
        error.response.data.message ||
          "Error in Booking please try again later."
      );
    }
  };

  const paymentVerification = async (response: paymentVerification) => {
    try {
      await apis.post(`${baseUrl}/api/v1/bookingVerification`, {
        data: response,
      });
      toast.success("booking has been successfully done. Enjoy!");
      return true;
    } catch (error) {
      throw new Error(
        error.response.data.message || "Error in payment Verification."
      );
    }
  };

  const MyBookings = async (): Promise<Booking[]> => {
    try {
      const { data } = await apis.get(`${baseUrl}/api/v1/bookings/list`, {});
      return data.data;
    } catch (error) {
      console.error("Error in MyBookings API", error);
      throw error;
    }
  };

  return { createOrder, paymentVerification, MyBookings };
};

export default useBooking;
