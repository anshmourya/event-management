export interface awsS3params {
  Bucket: string;
  body: Buffer;
  ContentType: string;
  key: string;
}

export interface orderOptions {
  amount: number;
  currency: string;
  receipt: string;
}

export interface paymentVerification {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}
declare module "express" {
  export interface Request {
    user: {
      id: string;
      name: string;
      role: string;
    };
  }
  export interface Response {
    user: {
      id: string;
      name: string;
      role: "admin" | "organizer" | "participant";
    };
  }
}
