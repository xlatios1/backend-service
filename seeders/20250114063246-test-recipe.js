'use strict'

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
	const recipes = [
		{
			// id: 1,
			recipe_name: 'Fish Burger',
			description: 'This is a fish burger recipe',
			note: 'Testing note 1',
			image_url:
				'https://girlheartfood.com/wp-content/uploads/2019/06/Crispy-Fish-Burger-Recipe-8-Tall.jpg',
			created_by: 1000,
			created_at: new Date(),
			updated_at: new Date(),
		},
		{
			// id: 2,
			recipe_name: 'Kimchi Fried Rice',
			description: 'This is a kimchi fried rice recipe',
			note: 'Testing note 2',
			image_url:
				'https://cdn.apartmenttherapy.info/image/upload/f_auto,q_auto:eco,c_fill,g_auto,w_1456,h_1092/k%2FPhoto%2FRecipes%2F2023-12-kimchi-fried-rice%2Fkimchi-fried-rice-183-horizontal',
			created_by: 1001,
			created_at: new Date(),
			updated_at: new Date(),
		},
	]
	await queryInterface.bulkInsert('recipes', recipes)
}
export async function down(queryInterface, Sequelize) {
	const Op = Sequelize.Op
	await queryInterface.bulkDelete('recipes', {
		created_by: { [Op.in]: [1000, 1001] },
	})
}
