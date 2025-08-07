// utils/auth.ts

import { ForbiddenError } from '@errors/ForbiddenError'

export function assertOwnerOrThrow({
	currentUserId,
	resourceOwnerId,
	message = 'You are not authorized to access this resource',
}: {
	currentUserId: number
	resourceOwnerId: number
	message?: string
}) {
	if (currentUserId !== resourceOwnerId) {
		throw new ForbiddenError(message)
	}
}
