'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('users', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			username: {
				allowNull: false,
				field: 'username',
				unique: true,
				type: Sequelize.STRING,
			},
			password: {
				allowNull: false,
				field: 'password',
				type: Sequelize.STRING,
			},
			displayName: {
				allowNull: false,
				field: 'display_name',
				type: Sequelize.STRING,
			},
			imageUrl: {
				field: 'image_url',
				type: Sequelize.STRING,
			},
			createdAt: {
				allowNull: false,
				field: 'created_at',
				type: Sequelize.DATE,
				defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
			},
			updatedAt: {
				allowNull: false,
				field: 'updated_at',
				type: Sequelize.DATE,
				defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
			},
		})
	},
	async down(queryInterface) {
		await queryInterface.dropTable('users')
	},
}
