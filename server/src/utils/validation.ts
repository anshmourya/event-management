import * as Yup from "Yup";

export const paymentVerificationSchema = Yup.object({
  body: Yup.object({
    eventId: Yup.string().required(),
    razorpay_order_id: Yup.string().required(),
    razorpay_payment_id: Yup.string().required(),
    razorpay_signature: Yup.string().required(),
  }),
});
