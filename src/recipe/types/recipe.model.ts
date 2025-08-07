import { AddInstructionType, UpdateInstructionType } from './instructions.type'

export interface RecipeType {
	id: number
	recipeName: string
	description: string
	note: string
	imageUrl: string
	createdBy: number
	createdAt: Date
	updatedAt: Date
}

export interface AddRecipeType {
	recipeName: string
	description?: string
	note?: string
	imageUrl?: string
	createdBy: number
	steps: AddInstructionType[]
}

export interface UpdateRecipeType {
	id: number
	recipeName: string
	description?: string
	note?: string
	imageUrl?: string
	steps: UpdateInstructionType[]
}
