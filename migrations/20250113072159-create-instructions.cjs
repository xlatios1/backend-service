'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('instructions', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			recipeId: {
				allowNull: false,
				field: 'recipe_id',
				type: Sequelize.INTEGER,
				references: {
					model: 'recipes',
					key: 'id',
				},
			},
			item: {
				field: 'item',
				type: Sequelize.STRING,
			},
			description: {
				field: 'description',
				type: Sequelize.TEXT,
			},
			imageUrl: {
				field: 'image_url',
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
		await queryInterface.dropTable('instructions')
	},
}
