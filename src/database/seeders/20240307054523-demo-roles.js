'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('roles', [
      {
        id: 1,
        role_name: 'Admin',
        description: 'Administrator role',
        status: 'ACTIVE',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 2,
        role_name: 'User',
        description: 'Regular user role',
        status: 'ACTIVE',
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('roles', null, {});
  }
};
