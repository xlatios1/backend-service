'use strict'

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
	const userDevices = [
		{
			// id: 1,
			user_id: 1000,
			device_token:
				'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJ0ZXN0IiwiaWF0IjoxNzQwNDA1MTI0fQ.NDfojoB7vm0w04xVWCwOn8FZxOH2nGVcnowyDQVJCAw',
		},
	]
	await queryInterface.bulkInsert('user_devices', userDevices)
}
export async function down(queryInterface, Sequelize) {
	await queryInterface.bulkDelete('user_devices', { user_id: 1000 })
}
