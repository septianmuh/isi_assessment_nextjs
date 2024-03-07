import { DataTypes, Model, Sequelize, ModelStatic } from 'sequelize';

class Roles extends Model {
    public id!: number;
    public role_name!: string;
    public description!: string;
    public status!: 'ACTIVE' | 'INACTIVE';
    public created_at?: Date;
    public updated_at?: Date;

    static initialize(connection: Sequelize) {
        this.init({
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: DataTypes.INTEGER
                },
                role_name: {
                    allowNull: false,
                    type: DataTypes.STRING
                },
                description: {
                    allowNull: true,
                    type: DataTypes.STRING
                },
                status: {
                    allowNull: false,
                    type: DataTypes.ENUM('ACTIVE', 'INACTIVE'),
                    defaultValue: 'INACTIVE'
                },
            },
            {
                sequelize: connection,
                modelName: 'Roles',
                tableName: 'roles',
                timestamps: true,
                underscored: true,
            }
        );
        return this;
    }
}

export default Roles;
