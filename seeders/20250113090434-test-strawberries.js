'use strict'

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
	const strawberryDatas = [
		{
			count: 3,
			user_id: 1000,
			comments: 'testing user1 first comment',
			created_at: new Date(),
			updated_at: new Date(),
		},
		{
			count: -1,
			user_id: 1000,
			comments: 'testing user1 second comment',
			created_at: new Date(),
			updated_at: new Date(),
		},
		{
			count: 3,
			user_id: 1001,
			comments: 'testing user2 first comment',
			created_at: new Date(),
			updated_at: new Date(),
		},
		{
			count: -1,
			user_id: 1001,
			comments: 'testing user2 second comment',
			created_at: new Date(),
			updated_at: new Date(),
		},
	]
	await queryInterface.bulkInsert('strawberries', strawberryDatas)
}
export async function down(queryInterface, Sequelize) {
	const Op = Sequelize.Op
	await queryInterface.bulkDelete('strawberries', {
		user_id: { [Op.in]: [1000, 1001] },
	})
}
