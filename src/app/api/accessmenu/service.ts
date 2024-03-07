import sequelize from "@/database/models";
import AccessRole from "@/database/models/AccessRole";
import MenuPermission from "@/database/models/MenuPermission";
import Roles from "@/database/models/Roles";
import User from "@/database/models/Users";
import { Op } from "sequelize";

export interface CheckAccessProps {
    role_id: number;
    user_id: string;
    method: string;
    req_type: 'api' | 'ui'
    url_path: string;
}

// init model
Roles.initialize(sequelize)
MenuPermission.initialize(sequelize)
User.initialize(sequelize)
AccessRole.initialize(sequelize)

User.belongsTo(Roles, {as : 'roles', foreignKey: 'role_id'})
AccessRole.hasMany(User, { as: 'user', foreignKey: 'role_id'})
MenuPermission.hasMany(AccessRole, { as: 'access_role', foreignKey: 'menu_permission_id'})

export const checkAccessRole = async (props: CheckAccessProps): Promise<{isAuthorized: boolean, error?: string}> => {
    try {
        const user = await User.findOne({
            where: {
                user_id: props.user_id,
                role_id: props.role_id
            },
        })

        if(!user){
            return { isAuthorized: false, error: "user and role not found"}
        }

        if(props.req_type === 'ui'){
            const permission = await MenuPermission.findOne({
                where: {
                    ui_path : {
                        [Op.iLike]: `%${props.url_path}%`,
                    }
                },
                include: [
                    {
                        model: AccessRole,
                        as: 'access_role',
                        required: true,
                        where: {
                            role_id: props.role_id
                        }
                    }
                ]
            })
            if(!permission){
                return { isAuthorized: false, error: "user and role is unauthorized"}
            }
        } else {
            const permissionMethod = (props.method === 'POST' ? 'write' : (props.method === 'PATCH' ? 'edit' : (props.method === 'GET' ? 'view' : (props.method === 'DELETE' ? 'delete' : ''))))
            const newUrl = (props.url_path).replace('/api', '');
            const permission = await MenuPermission.findOne({
                where: {
                    ui_path : {
                        [Op.iLike]: `%${newUrl}%`,
                    },
                    permission: permissionMethod,
                },
                include: [
                    {
                        model: AccessRole,
                        as: 'access_role',
                        required: true,
                        where: {
                            role_id: props.role_id,
                        }
                    }
                ]
            })
            if(!permission){
                return { isAuthorized: false, error: "user and role is unauthorized"}
            }
        }

        return { isAuthorized: true }
    } catch (error) {
        console.log(error)
        throw error
    }
}