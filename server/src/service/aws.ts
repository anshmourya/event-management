import { s3 } from "@config/aws";
import { S3 } from "aws-sdk";
import { awsS3params } from "@type/global.types";

class Aws {
  private presignedUrlParams = {
    Bucket: process.env.BUCKET_NAME,
    Expires: 43200,
    ContentType: "image/jpeg",
    Key: "42423.jpg",
  };

  async perSignedPostUrl(fileName: string) {
    if (!fileName) throw new Error("File name must be provided");
    return s3.getSignedUrl("putObject", this.presignedUrlParams);
  }

  async uploadImage(params: awsS3params) {
    const uploadParams: S3.Types.PutObjectRequest = {
      Bucket: params.Bucket,
      Key: params.key,
      Body: params.body,
      ContentType: params.ContentType,
    };
    console.log(uploadParams);
    const data = await s3.upload(uploadParams).promise();
    return data;
  }
}

export const aws = new Aws();
