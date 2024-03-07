import { DataTypes, Model, Sequelize, ModelStatic } from 'sequelize';

class AccessRole extends Model {
    public id!: number;
    public role_name!: string;
    public description!: string;
    public status!: 'ACTIVE' | 'INACTIVE';
    public created_at?: Date;
    public updated_at?: Date;

    static initialize(connection: Sequelize) {
        this.init({
            menu_permission_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                references: {
                    model: 'menu_permissions',
                    key: 'id'
                }
              },
              role_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                references: {
                    model: 'roles',
                    key: 'id'
                }
              }
            },
            {
                sequelize: connection,
                modelName: 'AccessRole',
                tableName: 'access_roles',
                timestamps: true,
                underscored: true,
            }
        );
        return this;
    }
}

export default AccessRole;
