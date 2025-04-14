import * as fs from 'fs'
import path from 'path'

import { StorageService } from '../types/storage.type'

export const TEMP_PATH = path.join('temp')
export class LocalImageStorageService implements StorageService {
	BASEURL = `http://localhost:${process.env.PORT}/temp`

	async upload(filePath: string, imageBuffer: Buffer): Promise<string> {
		return new Promise<string>((resolve) => {
			fs.mkdirSync(path.join(TEMP_PATH, path.dirname(filePath)), {
				recursive: true,
			})
			fs.writeFileSync(path.join(TEMP_PATH, filePath), imageBuffer)
			return resolve(filePath)
		})
	}

	async delete(filePath: string) {
		fs.unlinkSync(filePath)
		return filePath
	}

	async getPresignedUrl(filePath: string) {
		return `${this.BASEURL}/${filePath}`
	}
}
