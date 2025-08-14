import {
	AllowNull,
	BelongsTo,
	Column,
	CreatedAt,
	DataType,
	ForeignKey,
	Model,
	Table,
	UpdatedAt,
} from 'sequelize-typescript'
import { TagsDBModel } from '../../tags/models/tags.model'
import { RecipesDBModel } from './recipe.model'

@Table({ tableName: 'recipe_tags' })
export class RecipeTagsDBModel extends Model<RecipeTagsDBModel> {
	@ForeignKey(() => RecipesDBModel)
	@AllowNull(false)
	@Column({
		field: 'recipe_id',
		type: DataType.INTEGER,
	})
	declare recipeId: number

	@ForeignKey(() => TagsDBModel)
	@AllowNull(false)
	@Column({
		field: 'tag_id',
		type: DataType.INTEGER,
	})
	declare tagId: number

	@BelongsTo(() => RecipesDBModel)
	declare recipe: RecipesDBModel

	@BelongsTo(() => TagsDBModel)
	declare tag: TagsDBModel

	@CreatedAt
	@Column({
		field: 'created_at',
		type: DataType.DATE,
	})
	public declare readonly createdAt: Date

	@UpdatedAt
	@Column({
		field: 'updated_at',
		type: DataType.DATE,
	})
	public declare readonly updatedAt: Date
}
