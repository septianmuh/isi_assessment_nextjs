'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        const accessRoles = [
            {
                "menu_permission_id" : 1,
                "role_id" : 1,
                "created_at" : "2024-03-07T11:30:00.000Z",
                "updated_at" : "2024-03-07T11:30:00.000Z"
            },
            {
                "menu_permission_id" : 3,
                "role_id" : 1,
                "created_at" : "2024-03-07T11:30:00.000Z",
                "updated_at" : "2024-03-07T11:30:00.000Z"
            },
            {
                "menu_permission_id" : 4,
                "role_id" : 1,
                "created_at" : "2024-03-07T11:30:00.000Z",
                "updated_at" : "2024-03-07T11:30:00.000Z"
            },
            {
                "menu_permission_id" : 5,
                "role_id" : 1,
                "created_at" : "2024-03-07T11:30:00.000Z",
                "updated_at" : "2024-03-07T11:30:00.000Z"
            },
            {
                "menu_permission_id" : 6,
                "role_id" : 1,
                "created_at" : "2024-03-07T11:30:00.000Z",
                "updated_at" : "2024-03-07T11:30:00.000Z"
            },
            {
                "menu_permission_id" : 7,
                "role_id" : 1,
                "created_at" : "2024-03-07T11:30:00.000Z",
                "updated_at" : "2024-03-07T11:30:00.000Z"
            },
            {
                "menu_permission_id" : 7,
                "role_id" : 2,
                "created_at" : "2024-03-07T11:30:00.000Z",
                "updated_at" : "2024-03-07T11:30:00.000Z"
            }
        ]
            
        await queryInterface.bulkInsert('access_roles', accessRoles, {});
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('access_roles', null, {});
    }
};
    
    