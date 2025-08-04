import { S3Client } from "@aws-sdk/client-s3";

const region = "ap-southeast-1";

export const s3Client = new S3Client({ region });
