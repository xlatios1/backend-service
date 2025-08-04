import { StrawberryType } from '@src/strawberry/types/strawberry.type'
import { UsersDBModel } from '@src/users/models/users.model'
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

@Table({ tableName: 'strawberries' })
export class StrawberryDBModel extends Model<StrawberryType> {
	@PrimaryKey
	@AutoIncrement
	@Column(DataType.INTEGER)
	declare id: number

	@AllowNull(false)
	@Column(DataType.INTEGER)
	count: number

	@AllowNull(false)
	@ForeignKey(() => UsersDBModel)
	@Column({
		field: 'user_id',
		type: DataType.INTEGER,
	})
	userId: number

	@BelongsTo(() => UsersDBModel)
	User: UsersDBModel

	@Column({
		field: 'comments',
		type: DataType.STRING,
	})
	comments: string

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
