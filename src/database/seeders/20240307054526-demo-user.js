'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const usersData = [
        {
            user_id: "587ee805-b375-4af8-be0c-cbcda8266439",
            username: 'superadmin',
            email: 'superadmin@assessment.com',
            password: "$2a$12$1xeyRb5Y3yGTZ6AYVZQIh.NZggJvpnyfZ.055gC4ohCdu9GxvhMsa", // password
            status: 'ACTIVE',
            role_id: 1,
            created_at: new Date(),
            updated_at: new Date()
        },
        {
          user_id: '9250ff46-4874-4485-96bd-760c379129d2',
          username: 'john_doe',
          email: 'john@example.com',
          role_id: 2,
          password: '$2a$12$1xeyRb5Y3yGTZ6AYVZQIh.NZggJvpnyfZ.055gC4ohCdu9GxvhMsa',
          status: 'ACTIVE',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          user_id: 'aa03eb1e-4083-416f-95a1-64410fc69b1e',
          username: 'jane_smith',
          email: 'jane@example.com',
          role_id: 2, 
          password: '$2a$12$1xeyRb5Y3yGTZ6AYVZQIh.NZggJvpnyfZ.055gC4ohCdu9GxvhMsa',
          status: 'ACTIVE',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          user_id: '1a7e8066-4ac5-4490-b555-05cb400bf681',
          username: 'alice',
          email: 'alice@example.com',
          role_id: 2,
          password: '$2a$12$1xeyRb5Y3yGTZ6AYVZQIh.NZggJvpnyfZ.055gC4ohCdu9GxvhMsa',
          status: 'INACTIVE',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          user_id: '64809580-2777-4105-afff-dfd779481b9a',
          username: 'bob',
          email: 'bob@example.com',
          role_id: 2,
          password: '$2a$12$1xeyRb5Y3yGTZ6AYVZQIh.NZggJvpnyfZ.055gC4ohCdu9GxvhMsa',
          status: 'ACTIVE',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          user_id: '99c315de-7abe-4bc2-8bfa-94b808ddd2f4',
          username: 'charlie',
          email: 'charlie@example.com',
          role_id: 2,
          password: '$2a$12$1xeyRb5Y3yGTZ6AYVZQIh.NZggJvpnyfZ.055gC4ohCdu9GxvhMsa',
          status: 'INACTIVE',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          user_id: '40949b7f-8f9d-4c94-807e-31f4d9482e4e',
          username: 'david',
          email: 'david@example.com',
          role_id: 2,
          password: '$2a$12$1xeyRb5Y3yGTZ6AYVZQIh.NZggJvpnyfZ.055gC4ohCdu9GxvhMsa',
          status: 'ACTIVE',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          user_id: '89298a05-613c-4238-bcbf-1e21405d358f',
          username: 'charlez',
          email: 'charlezalkantara@example.com',
          role_id: 2,
          password: '$2a$12$1xeyRb5Y3yGTZ6AYVZQIh.NZggJvpnyfZ.055gC4ohCdu9GxvhMsa',
          status: 'ACTIVE',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          user_id: '900f0581-eeb7-40b4-b2d2-a877ce01c279',
          username: 'chavez',
          email: 'chavez@example.com',
          role_id: 2,
          password: '$2a$12$1xeyRb5Y3yGTZ6AYVZQIh.NZggJvpnyfZ.055gC4ohCdu9GxvhMsa',
          status: 'ACTIVE',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          user_id: '50c8fb4b-ab46-411c-9f40-175547f184b5',
          username: 'enigma',
          email: 'enigma@example.com',
          role_id: 2,
          password: '$2a$12$1xeyRb5Y3yGTZ6AYVZQIh.NZggJvpnyfZ.055gC4ohCdu9GxvhMsa',
          status: 'ACTIVE',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          user_id: '5d385788-93fb-4590-a80f-56c62e2589bd',
          username: 'burhan',
          email: 'burhan@example.com',
          role_id: 2,
          password: '$2a$12$1xeyRb5Y3yGTZ6AYVZQIh.NZggJvpnyfZ.055gC4ohCdu9GxvhMsa',
          status: 'ACTIVE',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          user_id: '8687697d-e11c-4734-9cc4-ade298a8a99d',
          username: 'thobias',
          email: 'thobias@example.com',
          role_id: 2,
          password: '$2a$12$1xeyRb5Y3yGTZ6AYVZQIh.NZggJvpnyfZ.055gC4ohCdu9GxvhMsa',
          status: 'ACTIVE',
          created_at: new Date(),
          updated_at: new Date()
        },
    ];

    await queryInterface.bulkInsert('users', usersData, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  }
};
