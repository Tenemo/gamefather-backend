'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert('EventBoardGames', [
            {
                eventId: '73f3f28f-da64-4e1c-bddb-5a68626124b8',
                boardGameId: 'c895ef63-08d0-4c90-aade-fba59b919c9b',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                eventId: '73f3f28f-da64-4e1c-bddb-5a68626124b8',
                boardGameId: '0df0e82e-c00d-4f69-95ce-bc6de3fd6492',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                eventId: '73f3f28f-da64-4e1c-bddb-5a68626124b8',
                boardGameId: '9509fe08-5dc7-4564-b1b4-0bd9d36a200c',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                eventId: 'e84c497b-31cf-4d1c-b474-d6c49add2d04',
                boardGameId: '4528bfa1-1149-4426-b9b2-814b135c9f49',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('EventBoardGames', null, {});
    },
};
