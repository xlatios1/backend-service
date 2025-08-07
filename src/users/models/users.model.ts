import { RecipesDBModel } from '@src/recipe/models/recipe.model'
import { StrawberryDBModel } from '@src/strawberry/models/strawberry.model'
import { UsersType } from '@src/users/types/users.type'
import {
	AllowNull,
	AutoIncrement,
	Column,
	CreatedAt,
	DataType,
	HasMany,
	Model,
	PrimaryKey,
	Table,
	Unique,
	UpdatedAt,
} from 'sequelize-typescript'

@Table({ tableName: 'users' })
export class UsersDBModel extends Model<UsersType> {
	@PrimaryKey
	@AutoIncrement
	@Column(DataType.INTEGER)
	declare id: number

	@AllowNull(false)
	@Unique
	@Column({
		field: 'username',
		type: DataType.STRING,
	})
	username: string

	@AllowNull(false)
	@Column({
		field: 'password',
		type: DataType.STRING,
	})
	password: string

	@AllowNull(false)
	@Column({
		field: 'display_name',
		type: DataType.STRING,
	})
	displayName: string

	@Column({
		field: 'image_url',
		type: DataType.STRING,
	})
	imageUrl: string

	@HasMany(() => StrawberryDBModel)
	Strawberries: StrawberryDBModel

	@HasMany(() => RecipesDBModel)
	recipes: RecipesDBModel

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
