const Sequelize = require('sequelize');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert(
            'Events',
            [
                {
                    id: '73f3f28f-da64-4e1c-bddb-5a68626124b8',
                    ownerId: '93dcde81-a235-4650-a67b-831006094bf4',
                    name: 'Board Game Night',
                    datetime: new Date('2023-07-01T19:00:00Z'),
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    id: '87a16552-f3b7-4bcf-a356-7ea8750ec3c0',
                    ownerId: '93dcde81-a235-4650-a67b-831006094bf4',
                    name: 'Family Game Day',
                    datetime: new Date('2023-07-15T14:00:00Z'),
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    id: 'e84c497b-31cf-4d1c-b474-d6c49add2d04',
                    ownerId: '7591944a-5973-492b-88e7-e26f45c4ba73',
                    name: 'Weekend Gaming Marathon',
                    datetime: new Date('2023-08-05T09:00:00Z'),
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ],
            {},
        );
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Events', null, {});
    },
};
