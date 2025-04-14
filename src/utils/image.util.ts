import { BadRequestError } from 'routing-controllers'

import { ImageData, MimeType } from './image.type'

export default class ImageUtils {
	public static getFileType = (file: ImageData) => {
		const mimeType = file.mimetype

		if (typeof mimeType !== 'string' || mimeType === null) {
			throw new BadRequestError('mimeType is missing in the uploaded file.')
		}

		const fileType = mimeType.split('/')[1]
		return fileType
	}

	public static validateImage(
		file: ImageData,
		allowedMimeTypes: MimeType[]
		// maximumSize: number,
	) {
		if (!allowedMimeTypes.includes(file.mimetype as MimeType)) {
			throw new BadRequestError(
				'Image must be of the following MIME types: ' + allowedMimeTypes
			)
		}

		// Commented this out as the size of the image on the phone seems to be different
		// from the size of the image received by the endpoint. I.e. an image can pass the
		// size validation on the phone but not in the backend. To take a look at this again
		// at some point.
		// if (file.size > maximumSize) {
		//   throw new BadRequestError(
		//     'Image is larger than the maximum allowed size (' + maximumSize + 'B)',
		//   );
		// }
	}
}
