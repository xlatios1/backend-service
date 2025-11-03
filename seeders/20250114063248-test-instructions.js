'use strict'

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
	const instructions = [
		{
			// id: 1,
			recipe_id: 1,
			item: 'Bun',
			description: 'Take a burger bun.',
			image_url:
				'https://www.backerhausveit.com/wp-content/uploads/2021/03/45113-1.jpg.webp',
			order: 1,
			created_at: new Date(),
			updated_at: new Date(),
		},
		{
			// id: 2,
			recipe_id: 1,
			item: 'Fish Patty',
			description: 'Add a Fish Patty.',
			image_url:
				'https://oceanwaves.sg/cdn/shop/products/fish-burger-patties-1_1080x.jpg?v=1626398931',
			order: 2,
			created_at: new Date(),
			updated_at: new Date(),
		},
		{
			// id: 3,
			recipe_id: 2,
			item: 'Rice',
			description: 'Take leftover chilled rice.',
			image_url:
				'https://www.health.com/thmb/AcaOIOijkWe2IaNA13jnRHlMPuM=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/GettyImages-1734160670-0157c2daf8e841d6a783b38aedc51aa8.jpg',
			order: 1,
			created_at: new Date(),
			updated_at: new Date(),
		},
		{
			// id: 4,
			recipe_id: 2,
			item: 'Kimchi',
			description: 'Stir fry the rice with kimchi',
			image_url:
				'https://www.seriouseats.com/thmb/vENU2PpyC7GD8YzGMQHoQBvbnm0=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/20210527-baechu-kimchi-vicky-wasik-seriouseats-seriouseats-3-18a2d6d7d1d74a7a82cb13ed350218be.jpg',
			order: 2,
			created_at: new Date(),
			updated_at: new Date(),
		},
		{
			// id: 5,
			recipe_id: 2,
			item: 'Eggs',
			description: 'Take Eggs.',
			image_url:
				'https://img.freepik.com/free-photo/brown-egg_2829-13453.jpg?t=st=1755615694~exp=1755619294~hmac=1cbb624acc9cb07b9c4a1a3c09edd428cc9a7de0e81cd4b0f49fd6986e5852b9&w=1480',
			order: 1,
			created_at: new Date(),
			updated_at: new Date(),
		},
		{
			// id: 6,
			recipe_id: 2,
			description: 'Fry the eggs',
			image_url:
				'https://static01.nyt.com/images/2021/12/07/dining/AS-olive-oil-fried-egg/merlin_195254193_650a29e7-3d2c-4b62-9735-a9a1999d8fff-threeByTwoMediumAt2X.jpg?quality=75&auto=webp',
			order: 2,
			created_at: new Date(),
			updated_at: new Date(),
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
