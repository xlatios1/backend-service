'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('recipe_tags', {
			recipeId: {
				field: 'recipe_id',
				type: Sequelize.INTEGER,
				references: { model: 'recipes', key: 'id' },
			},
			tagId: {
				field: 'tag_id',
				type: Sequelize.INTEGER,
				references: { model: 'tags', key: 'id' },
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
		await queryInterface.dropTable('recipe_tags')
	},
}
