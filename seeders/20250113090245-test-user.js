'use strict'

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
	const userData = [
		{
			id: 1000,
			username: 'User1',
			password: '$2b$10$RBPNFitPnDV1C6SH3YyVHu2NTHS.s0A1hbYS7k4xvTqHcElDG44LO',
			display_name: 'Test Users 1',
		},
		{
			id: 1001,
			username: 'User2',
			password: '$2b$10$RBPNFitPnDV1C6SH3YyVHu2NTHS.s0A1hbYS7k4xvTqHcElDG44LO',
			display_name: 'Test Users 2',
		},
	]

	await queryInterface.bulkInsert('users', userData)
}
export async function down(queryInterface, Sequelize) {
	const Op = Sequelize.Op
	await queryInterface.bulkDelete('strawberries', {
		user_id: { [Op.in]: [1000, 1001] },
	})
}
