'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('menu_permissions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      menu_name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      status: {
        allowNull: false,
        type: Sequelize.ENUM('ACTIVE', 'INACTIVE'),
        defaultValue: 'ACTIVE'
      },
      permission: {
        type: Sequelize.ENUM('view', 'edit', 'write', 'delete'),
        defaultValue: null
      },
      parent_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
            model: 'menu_permissions',
            key: 'id'
        }
      },
      ui_path: {
        type: Sequelize.STRING,
        allowNull: true
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('menu_permissions');
  }
};
