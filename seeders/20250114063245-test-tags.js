'use strict'

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
	const tags = [
		{
			// id: 1,
			tag: 'Breakfast',
			order: 1,
			created_at: new Date(),
			updated_at: new Date(),
		},
		{
			// id: 2,
			tag: 'Lunch',
			order: 2,
			created_at: new Date(),
			updated_at: new Date(),
		},
		{
			// id: 3,
			tag: 'Dinner',
			order: 3,
			created_at: new Date(),
			updated_at: new Date(),
		},
	]
	await queryInterface.bulkInsert('tags', tags)
}
export async function down(queryInterface, Sequelize) {
	const Op = Sequelize.Op
	await queryInterface.bulkDelete('tags', {
		id: { [Op.in]: [1, 2, 3] },
	})
}
