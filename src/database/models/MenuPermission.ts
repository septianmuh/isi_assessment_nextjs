import { DataTypes, Model, Sequelize, ModelStatic } from 'sequelize';

class MenuPermission extends Model {
    public id!: number;
    public menu_name!: string;
    public status!: 'ACTIVE' | 'INACTIVE';
    public parent_id!: number;
    public ui_path!: string;
    public created_at?: Date;
    public updated_at?: Date;

    static initialize(connection: Sequelize) {
        this.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },
                menu_name: {
                    type: DataTypes.STRING,
                    allowNull: false
                },
                status: {
                    type: DataTypes.ENUM('ACTIVE', 'INACTIVE'),
                    defaultValue: 'INACTIVE',
                    allowNull: false
                },
                permission: {
                    type: DataTypes.ENUM('view', 'edit', 'write', 'delete'),
                    defaultValue: null
                },
                parent_id: {
                    type: DataTypes.INTEGER,
                    allowNull: true,
                    references: {
                        model: 'menu_permissions',
                        key: 'id'
                    }
                },
                ui_path: {
                    type: DataTypes.STRING,
                    allowNull: true
                }
            },
            {
                sequelize: connection,
                modelName: 'MenuPermission',
                tableName: 'menu_permissions',
                timestamps: true,
                underscored: true,
            }
        );
        return this;
    }
}

export default MenuPermission;
