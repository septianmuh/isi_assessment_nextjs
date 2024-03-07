'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('users', {
            user_id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.STRING
            },
            username: {
                allowNull: false,
                type: Sequelize.STRING
            },
            email: {
                allowNull: false,
                type: Sequelize.STRING
            },
            password: {
                allowNull: false,
                type: Sequelize.STRING
            },
            role_id: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references: {
                    model: 'roles',
                    key: 'id'
                }
            },
            status: {
                allowNull: false,
                type: Sequelize.ENUM('ACTIVE', 'INACTIVE'),
                defaultValue: 'INACTIVE'
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
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('users');
    }
};