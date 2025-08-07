import { UsersDBModel } from '@src/users/models/users.model'
import { UserDeviceType } from '@src/users/types/users-devices.type'
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

@Table({
	tableName: 'user_devices',
})
export class UserDevicesDBModel extends Model<UserDeviceType> {
	@PrimaryKey
	@AutoIncrement
	@Column(DataType.INTEGER)
	declare id: number

	@ForeignKey(() => UsersDBModel)
	@Column({
		field: 'user_id',
		type: DataType.INTEGER,
		onDelete: 'CASCADE',
		onUpdate: 'CASCADE',
	})
	declare userId: number

	@BelongsTo(() => UsersDBModel)
	user: UsersDBModel

	@AllowNull(false)
	@Column({
		field: 'device_token',
		type: DataType.STRING,
	})
	declare deviceToken: string

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
