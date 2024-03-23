import Spinner from "@/components/loader/Spinner";
import useBooking from "@/hooks/useBooking";
import { useQuery } from "@tanstack/react-query";
import { MdOutlineLocationOn, MdOutlineDateRange } from "react-icons/md"; // Import necessary icons
// import {} from "react-icons/io";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { format } from "date-fns";
import { AspectRatio } from "@/components/ui/aspect-ratio";
const Bookings = () => {
  const { MyBookings } = useBooking();
  const { data: mybookingsList, isLoading } = useQuery({
    queryKey: ["myBookings"],
    queryFn: MyBookings,
  });

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="w-full account-content" id="my-bookings">
      <div style={{ paddingTop: "2rem" }}>
        <h2 className="text-xl">My Bookings</h2>
        {/* Map over mybookingsList and render each booking */}
        {mybookingsList.map((booking) => (
          <div
            className="account-content"
            id="booking-details"
            key={booking._id}
          >
            {/* Render booking details */}
            <span>
              {/* <IoBedOutline /> */}

              <img
                src={booking.event.thumbnail}
                className="w-full max-w-[200px] rounded-md"
                alt="booking thubnamil"
              />
            </span>
            <span>
              <MdOutlineLocationOn />
              {booking.event.location}
            </span>
            <span>
              {/* <IoBedOutline /> */}
              {booking.event.name}
            </span>
            <span>
              <MdOutlineDateRange />
              {format(booking.event.start_date, "LLL dd, y")} -{" "}
              {format(booking.event.end_date, "LLL dd, y")}
            </span>
            <span>
              <LiaRupeeSignSolid />
              {booking.event.price}
            </span>
            {/* Render booking status based on some condition */}

            {booking.paid ? (
              <span className="font-semibold text-green-500">Success</span>
            ) : (
              <span className="font-semibold text-red-500">Failed</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bookings;
