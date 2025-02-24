'use strict'

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
	const strawberryDatas = [
		{
			// id: 1,
			count: 3,
			user_id: 1000,
		},
		{
			// id: 1,
			count: -1,
			user_id: 1000,
		},
	]
	await queryInterface.bulkInsert('strawberries', strawberryDatas)
}
export async function down(queryInterface, Sequelize) {
	await queryInterface.bulkDelete('strawberries', { user_id: 1000 })
}
