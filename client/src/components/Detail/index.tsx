import { ReactNode, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { P } from "@/components/typograph";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { eventResponse } from "@/hooks/useEvent";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import useBooking from "@/hooks/useBooking";
import toast from "react-hot-toast";

interface detail {
  detail: eventResponse;
  children: ReactNode;
}
declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Razorpay: any;
  }
}
const Detail = ({ children, detail }: detail) => {
  const { createOrder, paymentVerification } = useBooking();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const handleModalOpen = () => setModalOpen(!modalOpen);
  const bookingHandler = useMutation({
    mutationKey: ["bookingHandler"],
    mutationFn: createOrder,
    onSuccess: (data) => {
      handleModalOpen();
      const razor = new (window as Window).Razorpay({
        ...data,
        handler: (response) => {
          paymentVerification({ ...response, eventId: detail._id });
        },
      });
      razor.open("payment.failed", (response) => {
        console.log(response);
      });
    },
  });

  const orderHandler = async () => {
    await toast.promise(bookingHandler.mutateAsync(detail._id), {
      loading: "processing..",
      success: "please make the payment to confrim you booking",
      error: bookingHandler?.error?.message,
    });
  };
  return (
    <Dialog open={modalOpen}>
      <DialogTrigger onClick={handleModalOpen}>{children}</DialogTrigger>
      <DialogContent className="w-full">
        <DialogHeader>
          <DialogTitle>{detail.name}</DialogTitle>
          <DialogDescription>
            {detail.about || "lorem lorem lorem lorem lorem"}
          </DialogDescription>
        </DialogHeader>
        <AspectRatio ratio={16 / 9}>
          <img src={detail.thumbnail} alt=" current event" />
        </AspectRatio>
        <P>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt
          laborum deleniti voluptatibus provident magni explicabo eos, obcaecati
          nam. Maxime praesentium obcaecati quas accusamus nesciunt, quo dicta
          laborum voluptatum beatae dolor.
        </P>
        <DialogFooter className="gap-6">
          <DialogClose>Close</DialogClose>
          <Button onClick={orderHandler}>Get Tickets</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Detail;
