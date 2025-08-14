import { InstructionsDBModel } from './recipe/models/instructions.model'
import { RecipesDBModel } from './recipe/models/recipe.model'
import { RecipeTagsDBModel } from './recipe/models/recipeTags.model'
import { StrawberryDBModel } from './strawberry/models/strawberry.model'
import { TagsDBModel } from './tags/models/tags.model'
import { UserDevicesDBModel } from './users/models/users-devices.model'
import { UsersDBModel } from './users/models/users.model'

export const models = [
	StrawberryDBModel,
	UsersDBModel,
	UserDevicesDBModel,
	RecipesDBModel,
	TagsDBModel,
	RecipeTagsDBModel,
	InstructionsDBModel,
]
