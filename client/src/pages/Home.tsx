import { H5, P } from "@/components/typograph";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
const Home = () => {
  return (
    <div className="">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6, 6, 6, 6, 6].map((data) => (
          <Card
            className="max-w-[300px] capitalize m-3 cursor-pointer"
            key={data}
          >
            <CardHeader>
              <CardTitle>
                <H5>Ticket Left </H5>
              </CardTitle>
              <CardDescription>i dont know anything</CardDescription>
            </CardHeader>

            <CardContent>
              <P className="my-3">only 200 ticket left</P>
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
