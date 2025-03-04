'use strict'

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
	const userDevices = [
		{
			// id: 1,
			user_id: 1000,
			device_token:
				'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAwMCwidXNlcm5hbWUiOiJVc2VyMSIsImlhdCI6MTc0MTA4OTA4Nn0.vp-M-DB3tllUXBaCzEM13W2kp7q18pXibZo9jr8UHXw',
		},
		{
			// id: 2,
			user_id: 1001,
			device_token:
				'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAwMSwidXNlcm5hbWUiOiJVc2VyMiIsImlhdCI6MTc0MTA4OTExOX0.860akNKKU7DoGmOwI9mOIEljHUrmueImUI1NGYOJHQE',
		},
	]
	await queryInterface.bulkInsert('user_devices', userDevices)
}
export async function down(queryInterface, Sequelize) {
	const Op = Sequelize.Op
	await queryInterface.bulkDelete('user_devices', {
		user_id: { [Op.in]: [1000, 1001] },
	})
}
