import { Sequelize } from 'sequelize';
import pg from 'pg';

export interface GConfigInf {
    username: string;
    password: string;
    database: string;
    host: string;
    port: number;
    logging: boolean;
    dialect: 'mysql' | 'postgres' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle';
}
  
export interface SConfigInf {
    dbDialect: 'sqlite';
    storage: string;
}

let opt: {
    logging: any;
    pool?: any;
};
opt = { logging: (msg: string) => console.log(msg) };
  
opt.pool = {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
};

const sequelize = new Sequelize({
    dialect: 'postgres',
    dialectModule: pg,
    host: "localhost",
    username: "sebastian",
    password: "mantap2Jozz!",
    database: "assessment",
    port: 5432,
    pool: opt.pool,
});
  
export default sequelize;
