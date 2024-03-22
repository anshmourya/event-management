import Spinner from "@/components/loader/Spinner";
import useBooking from "@/hooks/useBooking";
import { useQuery } from "@tanstack/react-query";

const Bookings = () => {
  const { MyBookings } = useBooking();
  const mybookingsList = useQuery({
    queryKey: ["myBookings"],
    queryFn: MyBookings,
  });

  if (mybookingsList.isLoading) {
    return <Spinner />;
  }
  return <div>Bookings</div>;
};

export default Bookings;
