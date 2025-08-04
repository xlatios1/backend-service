export interface ImageData {
  fieldName: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  buffer: Buffer;
  size: number;
}

export interface ImageUploadResponse {
  imageUrl: string;
  imageKey: string | null;
}

export enum MimeType {
  JPEG = "image/jpeg",
  PNG = "image/png",
}

export enum FileExtension {
  PDF = "pdf",
  EXCEL = "xlsx",
}
