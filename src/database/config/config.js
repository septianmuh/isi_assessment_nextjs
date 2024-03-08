const dotenv = require("dotenv")
dotenv.config({ path: `${process.cwd()}/.env`})
module.exports = {
	development: {
		username: process.env.DATABASE_USER || 'sebastian',
		password: process.env.DATABASE_PASS || 'mantap2Jozz!',
		database: process.env.DATABASE_DB || 'assessment',
		host: process.env.DATABASE_HOST || 'localhost',
		port: parseInt(process.env.DATABASE_PORT || '') || 5432,
		logging: true,
		dialect: 'postgres',
	},
	test: {
		storage: ':memory',
		dialect: 'sqlite',
	},
	staging: {
		username: process.env.DATABASE_USER || 'postgres',
		password: process.env.DATABASE_PASS || 'strongPass99',
		database: process.env.DATABASE_DB || 'postgres',
		host: process.env.DATABASE_HOST || 'localhost',
		port: parseInt(process.env.DATABASE_PORT || '') || 5432,
		logging: false,
		dialect: 'postgres',
	},
	production: {
		username: process.env.DATABASE_USER || 'postgres',
		password: process.env.DATABASE_PASS || 'strongPass99',
		database: process.env.DATABASE_DB || 'postgres',
		host: process.env.DATABASE_HOST || 'localhost',
		port: parseInt(process.env.DATABASE_PORT || '') || 5432,
		logging: false,
		dialect: 'postgres',
	},
};

