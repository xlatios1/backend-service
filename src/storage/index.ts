import * as iconv from 'iconv-lite'
import path, { join } from 'path'
import { v4 as uuid } from 'uuid'

import { ImageData, FileExtension } from '../utils/image.type'
import ImageUtils from '../utils/image.util'
import { LocalImageStorageService } from './services/local-image-storage.service'
import { S3ImageStorageService } from './services/s3-image-storage.service'
import { StorageService } from './types/storage.type'

let storageService: StorageService
const awsEnviroments = ['development', 'production']

if (awsEnviroments.includes(process.env.NODE_ENV)) {
	storageService = new S3ImageStorageService()
} else {
	storageService = new LocalImageStorageService()
}

/**
 * Uploads an image stored in the imageBuffer to the specified filePath.
 * @param filePath Destination filePath to upload this image.
 * @param imageBuffer The imageBuffer of the image.
 * @param mimeType The nature and format of the document.
 * @returns The filePath of the created file.
 */
export const upload = async (
	filePath: string,
	imageBuffer: Buffer,
	mimeType: string
): Promise<string> => {
	return storageService.upload(filePath, imageBuffer, mimeType)
}

export const storeImageIntoBucket = async (
	folder: string,
	image: ImageData
): Promise<string> => {
	const fileName = image.originalname
	const decodedFileName = iconv.decode(Buffer.from(fileName, 'binary'), 'utf-8')
	const fileNameWithoutExtension = decodedFileName
		.split('.')
		.slice(0, -1)
		.join('.')
	const uniqueFileName = `${fileNameWithoutExtension}_${uuid()}`
	const fileType = ImageUtils.getFileType(image)
	const originalFilePath = `${folder}/${uniqueFileName}.${fileType}`
	const path = await upload(originalFilePath, image.buffer, image.mimetype)
	return path
}

export const storeFileIntoBucket = async (params: {
	folderPath: string
	fileBuffer: Buffer
	fileName: string
	fileExtension: FileExtension
}): Promise<string> => {
	const { folderPath, fileBuffer, fileName, fileExtension } = params

	const fileMap: Record<FileExtension, string> = {
		pdf: 'application/pdf',
		xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
	}

	const fileType = fileMap[fileExtension]

	const uniqueFileName = `${fileName}_${uuid()}.${fileExtension}`
	const fileUploadPath = join(folderPath, uniqueFileName)

	const path = await upload(fileUploadPath, fileBuffer, fileType)

	return path
}

export const deleteObject = async (filePath: string): Promise<string> => {
	if (awsEnviroments.includes(process.env.NODE_ENV)) {
		return storageService.delete(filePath)
	}
}

export const getPreSignedUrl = async (filePath: string): Promise<string> => {
	return storageService.getPresignedUrl(filePath)
}

/**
 * Gets the URL of the file in the storage.
 * @param key The url of the file.
 * @returns A URL that points directly to the stored file. Can access the file directly by using this returned URL.
 */
export const getBaseUrl = (key: string): string => {
	return `${storageService.BASEURL}/${key}`
}

export const getOriginalPath = (url: string, directoryPath: string): string => {
	const originalPath =
		url.split(`${storageService.BASEURL}/`)[1] ||
		url.split(
			`https://${process.env.STORAGE_BUCKET_NAME}.s3.ap-southeast-1.amazonaws.com/`
		)[1]

	if (awsEnviroments.includes(process.env.NODE_ENV)) {
		return originalPath
	}

	if (typeof originalPath === 'undefined') {
		throw new Error('originalPath is undefined')
	}

	return path.join(directoryPath, originalPath)
}
