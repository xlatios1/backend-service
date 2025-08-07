'use strict'

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
	const instructions = [
		{
			// id: 1,
			recipe_id: 1,
			item: 'Bun',
			description: 'Take a burger bun.',
			order: 1,
		},
		{
			// id: 2,
			recipe_id: 1,
			item: 'Fish Patty',
			description: 'Add a Fish Patty.',
			order: 2,
		},
		{
			// id: 3,
			recipe_id: 2,
			item: 'Rice',
			description: 'Take leftover chilled rice.',
			order: 1,
		},
		{
			// id: 4,
			recipe_id: 2,
			item: 'Kimchi',
			description: 'Stir fry the rice with kimchi',
			order: 2,
		},
	]
	await queryInterface.bulkInsert('instructions', instructions)
}
export async function down(queryInterface, Sequelize) {
	const Op = Sequelize.Op
	await queryInterface.bulkDelete('instructions', {
		recipe_id: { [Op.in]: [1, 2] },
	})
}
