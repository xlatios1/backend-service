export interface StorageService {
  upload(
    filePath: string,
    imageBuffer: Buffer,
    mimeType: string,
  ): Promise<string>;
  delete(filePath: string): Promise<string>;
  getPresignedUrl(filePath: string): Promise<string>;
  BASEURL: string;
}
