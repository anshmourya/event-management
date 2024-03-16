import { instance } from "@config/razorpay";
import { orderOptions, paymentVerification } from "@type/global.types";
import crypto from "crypto";
import { event } from "./event";
class Payment {
  async createOrder(options: orderOptions) {
    try {
      const order = await instance.orders.create(options);
      return order;
    } catch (error) {
      console.error("error creating the order", error);
      throw error;
    }
  }

  async verfiication(verfiication: paymentVerification) {
    try {
      const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
        verfiication;
      const hmac = crypto.createHmac(
        "sha256",
        process.env.RAZOR_PAY_SECRET_KEY
      );
      const data = `${razorpay_order_id}|${razorpay_payment_id}`;
      const generated_signature = hmac.update(data.toString()).digest("hex");

      if (generated_signature !== razorpay_signature)
        throw new Error("payment signature is not vaild");

      const bookingDetails = {
        paymentId: verfiication.razorpay_payment_id,
        orderId: verfiication.razorpay_order_id,
        paymentSignature: verfiication.razorpay_signature,
        event: verfiication.eventId,
        createdBy: verfiication.userId,
        paid: true,
      };

      return await event.createBooking(bookingDetails);
    } catch (error) {
      console.error("error while verfiication of payment", error);
      throw error;
    }
  }
}

const payment = new Payment();

export default payment;
