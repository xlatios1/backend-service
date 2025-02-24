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
import { UsersDBModel } from '../../users/models/users.model'
import { StrawberryType } from '../types/strawberry.type'

@Table({ tableName: 'strawberries' })
export class StrawberryDBModel extends Model<StrawberryType> {
	@PrimaryKey
	@AutoIncrement
	@Column(DataType.INTEGER)
	id: number

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

	@CreatedAt
	@Column({
		field: 'created_at',
		type: DataType.DATE,
	})
	public readonly createdAt: Date

	@UpdatedAt
	@Column({
		field: 'updated_at',
		type: DataType.DATE,
	})
	public readonly updatedAt: Date
}
