import { InstructionsDBModel } from './recipe/models/instructions.model'
import { RecipesDBModel } from './recipe/models/recipe.model'
import { StrawberryDBModel } from './strawberry/models/strawberry.model'
import { UserDevicesDBModel } from './users/models/users-devices.model'
import { UsersDBModel } from './users/models/users.model'

export const models = [
	StrawberryDBModel,
	UsersDBModel,
	UserDevicesDBModel,
	RecipesDBModel,
	InstructionsDBModel,
]
