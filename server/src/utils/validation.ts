import * as yup from "yup";

export const paymentVerificationSchema = yup.object().shape({
  eventId: yup.string().required(),
  razorpay_order_id: yup.string().required(),
  razorpay_payment_id: yup.string().required(),
  razorpay_signature: yup.string().required(),
  userId: yup.string().required(),
});
