import { DataTypes, Model, Sequelize, ModelStatic } from 'sequelize';

class User extends Model {
    public user_id!: string;
    public username!: string;
    public email!: string;
    public status!: 'ACTIVE' | 'INACTIVE';
    public role_id!: number;
    public password!: string;
    public created_at?: Date;
    public updated_at?: Date;

    static initialize(connection: Sequelize) {
        this.init(
            {
                user_id: {
                    type: DataTypes.STRING,
                    autoIncrement: true,
                    primaryKey: true,
                },
                username: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                email: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    unique: true,
                },
                password: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                status: {
                    type: DataTypes.ENUM('ACTIVE', 'INACTIVE')
                },
                role_id: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    references: {
                        model: 'roles',
                        key: 'id'
                    }
                }
            },
            {
                sequelize: connection,
                modelName: 'User',
                tableName: 'users',
                timestamps: true,
                underscored: true,
            }
        );
        return this;
    }
}

export default User;
