'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        const dataMenu = [
            {
                "id" : 1,
                "menu_name" : "Management Users",
                "status" : "ACTIVE",
                "permission" : null,
                "parent_id" : null,
                "ui_path" : "/admin/users",
                "created_at" : "2024-03-07T11:30:00.000Z",
                "updated_at" : "2024-03-07T11:30:00.000Z"
            },
            {
                "id" : 7,
                "menu_name" : "Dashboard",
                "status" : "ACTIVE",
                "permission" : null,
                "parent_id" : null,
                "ui_path" : "/admin/dashboard",
                "created_at" : "2024-03-07T11:30:00.000Z",
                "updated_at" : "2024-03-07T11:30:00.000Z"
            },
            {
                "id" : 3,
                "menu_name" : "View Management Users",
                "status" : "ACTIVE",
                "permission" : "view",
                "parent_id" : 1,
                "ui_path" : "/admin/users/view",
                "created_at" : "2024-03-07T11:30:00.000Z",
                "updated_at" : "2024-03-07T11:30:00.000Z"
            },
            {
                "id" : 4,
                "menu_name" : "Edit Management Users",
                "status" : "ACTIVE",
                "permission" : "edit",
                "parent_id" : 1,
                "ui_path" : "/admin/users/edit",
                "created_at" : "2024-03-07T11:30:00.000Z",
                "updated_at" : "2024-03-07T11:30:00.000Z"
            },
            {
                "id" : 5,
                "menu_name" : "Create Management Users",
                "status" : "ACTIVE",
                "permission" : "write",
                "parent_id" : 1,
                "ui_path" : "/admin/users/create",
                "created_at" : "2024-03-07T11:30:00.000Z",
                "updated_at" : "2024-03-07T11:30:00.000Z"
            },
            {
                "id" : 6,
                "menu_name" : "Delete Management Users",
                "status" : "ACTIVE",
                "permission" : "delete",
                "parent_id" : 1,
                "ui_path" : "/admin/users/delete",
                "created_at" : "2024-03-07T11:30:00.000Z",
                "updated_at" : "2024-03-07T11:30:00.000Z"
            }
        ]
        await queryInterface.bulkInsert('menu_permissions', dataMenu, {});
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('menu_permissions', null, {});
    }
};
    
    