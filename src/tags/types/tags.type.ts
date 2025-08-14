export interface TagsType {
	id: number
	tag: string
	order: number
	createdAt: Date
	updatedAt: Date
}

export interface AddTagType {
	tag: string
	order: number
}

export interface AddRecipeTagType {
	recipeId: number
	tagId: number
}

export interface UpdateRecipeTagType {
	recipeId: number
	tagIds: number[]
}

export interface UpdateTagType {
	id: number
	tag?: string
	order?: number
}
