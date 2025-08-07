export function encodeCursor(id: number): string {
	return Buffer.from(`recipe:${id}`).toString('base64')
}

export function decodeCursor(cursor: string): number | null {
	try {
		const decoded = Buffer.from(cursor, 'base64').toString('utf8')
		const [, id] = decoded.split(':')
		return Number(id)
	} catch {
		console.log('Failed to decode cursor:', cursor)
		return 0
	}
}
