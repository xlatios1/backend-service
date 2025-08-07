import { RecipeType } from '@src/recipe/types/recipe.model'
import { UsersDBModel } from '@src/users/models/users.model'
import {
	AllowNull,
	AutoIncrement,
	BelongsTo,
	Column,
	CreatedAt,
	DataType,
	ForeignKey,
	HasMany,
	Model,
	PrimaryKey,
	Table,
	UpdatedAt,
} from 'sequelize-typescript'
import { InstructionsDBModel } from './instructions.model'

@Table({ tableName: 'recipes' })
export class RecipesDBModel extends Model<RecipeType> {
	@PrimaryKey
	@AutoIncrement
	@Column(DataType.INTEGER)
	declare id: number

	@HasMany(() => InstructionsDBModel)
	Instructions: InstructionsDBModel

	@AllowNull(false)
	@Column({
		field: 'recipe_name',
		type: DataType.STRING,
	})
	declare recipeName: string

	@Column(DataType.STRING)
	declare description: string

	@Column(DataType.STRING)
	declare note: string

	@Column({
		field: 'image_url',
		type: DataType.STRING,
	})
	declare imageUrl: string

	@AllowNull(false)
	@ForeignKey(() => UsersDBModel)
	@Column({
		field: 'created_by',
		type: DataType.INTEGER,
	})
	declare createdBy: number

	@BelongsTo(() => UsersDBModel)
	User: UsersDBModel

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
