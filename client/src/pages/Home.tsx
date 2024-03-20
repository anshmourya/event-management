import Spinner from "@/components/loader/Spinner";
import { H5, P } from "@/components/typograph";
import { format } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useEvent, { eventResponse } from "@/hooks/useEvent";
import { useQuery } from "@tanstack/react-query";

const Home = () => {
  const { getEventList } = useEvent();
  const eventList = useQuery<eventResponse[]>({
    queryKey: ["eventList"],
    queryFn: getEventList,
  });
  if (eventList.isLoading) {
    return (
      <Spinner className="absolute top-[50%]  h-full left-[50%] overflow-hidden" />
    );
  }
  return (
    <div className="">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
        {eventList.data.map((event) => (
          <Card
            className="max-w-[300px] capitalize m-3 cursor-pointer"
            key={event._id}
          >
            <CardHeader>
              <CardTitle>
                <H5>{event.name}</H5>
              </CardTitle>
              <CardDescription>{event.about}</CardDescription>
              <CardDescription>
                {format(event.start_date, "LLL dd, y")} -{" "}
                {format(event.end_date, "LLL dd, y")}
              </CardDescription>
            </CardHeader>

            <CardContent>
              <P className="my-3">
                only {event.max_ticket - event.ticket_booked} ticket left
              </P>
              <img
                src="https://static-cse.canva.com/blob/1396716/1600w-wlXEWqHuexQ.jpg"
                alt=" current event"
              />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Home;
