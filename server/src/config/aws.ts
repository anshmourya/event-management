import S3 from "aws-sdk/clients/s3.js";
const credentials = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_ACCESS_KEY_ID,
  region: "us-east-1",
  apiVersion: "2006-03-01",
  signatureVersion: "v3",
};

export const s3 = new S3(credentials);
