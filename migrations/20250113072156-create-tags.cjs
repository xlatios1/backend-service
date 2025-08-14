'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('tags', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			tag: {
				allowNull: false,
				field: 'tag',
				type: Sequelize.STRING,
			},
			order: {
				allowNull: false,
				field: 'order',
				type: Sequelize.INTEGER,
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
		await queryInterface.dropTable('tags')
	},
}
