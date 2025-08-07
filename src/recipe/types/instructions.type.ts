export interface InstructionsType {
	id: number
	recipeId: number
	item: string
	description?: string
	order: number
	createdAt: Date
	updatedAt: Date
}

export interface AddInstructionType {
	item: string
	description?: string
	order: number
}

export interface UpdateInstructionType {
	item: string
	description?: string
	order: number
}
