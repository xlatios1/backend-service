'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('recipes', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			recipeName: {
				allowNull: false,
				field: 'recipe_name',
				type: Sequelize.STRING,
			},
			description: {
				field: 'description',
				type: Sequelize.STRING,
			},
			note: {
				field: 'note',
				type: Sequelize.STRING,
			},
			imageUrl: {
				field: 'image_url',
				type: Sequelize.STRING,
			},
			createdBy: {
				allowNull: false,
				field: 'created_by',
				type: Sequelize.INTEGER,
				references: {
					model: 'users',
					key: 'id',
				},
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
		await queryInterface.dropTable('recipes')
	},
}
