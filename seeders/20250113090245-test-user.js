'use strict'

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
	const userData = [
		{
			id: 1000,
			username: 'Test',
			password: '$2b$10$RBPNFitPnDV1C6SH3YyVHu2NTHS.s0A1hbYS7k4xvTqHcElDG44LO',
			display_name: 'Test Users',
		},
	]

	await queryInterface.bulkInsert('users', userData)
}
export async function down(queryInterface, Sequelize) {
	await queryInterface.bulkDelete('users', { id: 1000 })
}
