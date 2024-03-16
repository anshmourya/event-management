import * as yup from "yup";

export const paymentVerificationSchema = yup.object({
  body: yup.object({
    eventId: yup.string().required(),
    razorpay_order_id: yup.string().required(),
    razorpay_payment_id: yup.string().required(),
    razorpay_signature: yup.string().required(),
  }),
});
