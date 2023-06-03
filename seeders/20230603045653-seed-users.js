'use strict';

const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            'Users',
            [
                {
                    id: '93dcde81-a235-4650-a67b-831006094bf4',
                    username: 'Alice',
                    password: await bcrypt.hash('password123', 10),
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    id: '7591944a-5973-492b-88e7-e26f45c4ba73',
                    username: 'Bob',
                    password: await bcrypt.hash('password123', 10),
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ],
            {},
        );
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Users', null, {});
    },
};
