import { AddInstructionType } from './instructions.type'

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
	tags: string[]
	instructions: AddInstructionType[]
}

export interface UpdateRecipeType {
	recipeName?: string
	description?: string
	note?: string
	imageUrl?: string
	tags?: number[]
	instructions?: AddInstructionType[]
}
