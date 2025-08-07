import {
	AllowNull,
	AutoIncrement,
	BelongsTo,
	Column,
	CreatedAt,
	DataType,
	ForeignKey,
	Model,
	PrimaryKey,
	Table,
	UpdatedAt,
} from 'sequelize-typescript'
import { InstructionsType } from '../types/instructions.type'
import { RecipesDBModel } from './recipe.model'

@Table({ tableName: 'instructions' })
export class InstructionsDBModel extends Model<InstructionsType> {
	@PrimaryKey
	@AutoIncrement
	@Column(DataType.INTEGER)
	declare id: number

	@AllowNull(false)
	@ForeignKey(() => RecipesDBModel)
	@Column({
		field: 'recipe_id',
		type: DataType.INTEGER,
	})
	declare recipeId: number

	@BelongsTo(() => RecipesDBModel)
	Recipe: RecipesDBModel

	@AllowNull(false)
	@Column(DataType.STRING)
	declare item: string

	@Column(DataType.STRING)
	declare description: string

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
