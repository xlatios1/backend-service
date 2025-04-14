import {
	CopyObjectCommand,
	DeleteObjectCommand,
	GetObjectCommand,
	PutObjectCommand,
} from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

import { s3Client } from '../../aws/config'
import { StorageService } from '../types/storage.type'

export class S3ImageStorageService implements StorageService {
	BASEURL = `https://${process.env.STORAGE_BUCKET_NAME}.s3.ap-southeast-1.amazonaws.com`

	async upload(
		filePath: string,
		imageBuffer: Buffer,
		mimeType: string
	): Promise<string> {
		return new Promise<string>((resolve, reject) => {
			s3Client
				.send(
					new PutObjectCommand({
						Bucket: process.env.STORAGE_BUCKET_NAME,
						Key: filePath,
						ContentType: mimeType,
						Body: imageBuffer,
						// ACL: 'public-read',
					})
				)
				.then(() => {
					console.log(`File ${filePath} uploaded successfully`)
					return resolve(filePath)
				})
				.catch((err) => {
					console.log(`File ${filePath} upload failed`, err.stack)
					return reject(filePath)
				})
		})
	}

	async delete(filePath: string): Promise<string> {
		return new Promise<string>((resolve, reject) => {
			s3Client
				.send(
					new DeleteObjectCommand({
						Bucket: process.env.STORAGE_BUCKET_NAME,
						Key: filePath,
					})
				)
				.then(() => {
					return resolve(filePath)
				})
				.catch((err) => {
					console.log(`Delete file failed ${err.stack}`)
					reject(filePath)
				})
		})
	}

	async move(fromPath: string, toPath: string): Promise<string> {
		return new Promise<string>((resolve, reject) => {
			s3Client
				.send(
					new CopyObjectCommand({
						Bucket: process.env.STORAGE_BUCKET_NAME,
						Key: toPath,
						CopySource: `${process.env.STORAGE_BUCKET_NAME}/${fromPath}`,
						// ACL: 'public-read',
					})
				)
				.then(() => {
					this.delete(fromPath)
					return resolve(toPath)
				})
				.catch((err) => {
					console.log(`Copy file failed ${err.stack}`)
					reject(toPath)
				})
		})
	}

	async getPresignedUrl(filePath: string): Promise<string> {
		return new Promise<string>((resolve, reject) => {
			const command = new GetObjectCommand({
				Bucket: process.env.STORAGE_BUCKET_NAME,
				Key: filePath,
			})

			// Set the expiration time for the presigned URL (in seconds)
			const expirationTime = 3600 // 1 hour

			getSignedUrl(s3Client, command, { expiresIn: expirationTime })
				.then((url) => {
					resolve(url)
				})
				.catch((err) => {
					reject(err)
				})
		})
	}
}
