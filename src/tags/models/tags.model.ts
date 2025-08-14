import {
	AllowNull,
	AutoIncrement,
	BelongsToMany,
	Column,
	CreatedAt,
	DataType,
	Model,
	PrimaryKey,
	Table,
	Unique,
	UpdatedAt,
} from 'sequelize-typescript'
import { RecipesDBModel } from '../../recipe/models/recipe.model'
import { RecipeTagsDBModel } from '../../recipe/models/recipeTags.model'
import { TagsType } from '../types/tags.type'

@Table({ tableName: 'tags' })
export class TagsDBModel extends Model<TagsType> {
	@PrimaryKey
	@AutoIncrement
	@Column(DataType.INTEGER)
	declare id: number

	@AllowNull(false)
	@Unique
	@Column({
		field: 'tag',
		type: DataType.STRING,
	})
	declare tag: string

	@BelongsToMany(() => RecipesDBModel, () => RecipeTagsDBModel)
	recipes: RecipesDBModel[]

	@AllowNull(false)
	@Column(DataType.INTEGER)
	declare order: number

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
