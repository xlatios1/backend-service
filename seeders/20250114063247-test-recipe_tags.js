'use strict'

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
	const recipeTags = [
		{
			recipe_id: 1,
			tag_id: 2,
			created_at: new Date(),
			updated_at: new Date(),
		},
		{
			recipe_id: 1,
			tag_id: 3,
			created_at: new Date(),
			updated_at: new Date(),
		},
		{
			recipe_id: 2,
			tag_id: 2,
			created_at: new Date(),
			updated_at: new Date(),
		},
		{
			recipe_id: 2,
			tag_id: 3,
			created_at: new Date(),
			updated_at: new Date(),
		},
	]
	await queryInterface.bulkInsert('recipe_tags', recipeTags)
}
export async function down(queryInterface, Sequelize) {
	const Op = Sequelize.Op
	await queryInterface.bulkDelete('recipe_tags', {
		recipe_id: { [Op.in]: [1, 2] },
	})
}
