'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert(
            'BoardGames',
            [
                {
                    id: 'c895ef63-08d0-4c90-aade-fba59b919c9b',
                    ownerId: '93dcde81-a235-4650-a67b-831006094bf4',
                    name: 'Chess',
                    description: 'Classic strategy game',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    id: '0df0e82e-c00d-4f69-95ce-bc6de3fd6492',
                    ownerId: '93dcde81-a235-4650-a67b-831006094bf4',
                    name: 'Checkers',
                    description: 'Traditional board game',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    id: '9509fe08-5dc7-4564-b1b4-0bd9d36a200c',
                    ownerId: '93dcde81-a235-4650-a67b-831006094bf4',
                    name: 'Monopoly',
                    description: 'Popular trading and property game',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    id: '96ec9f53-414b-4dd5-a7a3-b60caa9d4dbb',
                    ownerId: '93dcde81-a235-4650-a67b-831006094bf4',
                    name: 'Scrabble',
                    description: 'Classic word game',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    id: '4528bfa1-1149-4426-b9b2-814b135c9f49',
                    ownerId: '7591944a-5973-492b-88e7-e26f45c4ba73',
                    name: 'Risk',
                    description:
                        'Strategy game of diplomacy, conflict and conquest',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    id: 'cfd4b2c9-b49b-4b9c-b6f3-1a449d2b9fd0',
                    ownerId: '7591944a-5973-492b-88e7-e26f45c4ba73',
                    name: 'Catan',
                    description:
                        'Multiplayer board game where players gather resources and build settlements',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ],
            {},
        );
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('BoardGames', null, {});
    },
};
