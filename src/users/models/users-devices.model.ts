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
import { UserDeviceType } from '../types/users-devices.type'
import { UsersDBModel } from './users.model'

@Table({
	tableName: 'user_devices',
})
export class UserDevicesDBModel extends Model<UserDeviceType> {
	@PrimaryKey
	@AutoIncrement
	@Column(DataType.INTEGER)
	id: number

	@ForeignKey(() => UsersDBModel)
	@Column({
		field: 'user_id',
		type: DataType.INTEGER,
		onDelete: 'CASCADE',
		onUpdate: 'CASCADE',
	})
	userId: number

	@BelongsTo(() => UsersDBModel)
	user: UsersDBModel

	@AllowNull(false)
	@Column({
		field: 'device_token',
		type: DataType.STRING,
	})
	deviceToken: string

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
