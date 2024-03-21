import { apis, baseUrl } from "@/utils/apis";

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

  return { createOrder };
};

export default useBooking;
