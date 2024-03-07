import sequelize from "@/database/models"
import Roles from "@/database/models/Roles"
import { Op } from "sequelize"

type queryProps = {
    page: number
    limit: number
    search: string
}

type RoleEntity = {
    id: number;
    role_name: string;
    description: string;
    status: 'ACTIVE' | 'INACTIVE';
    created_at?: Date;
    updated_at?: Date;
}

type opt = {
    value: number,
    label: string
}
Roles.initialize(sequelize)
export const getList = async(props: queryProps): Promise<opt[]> => {
    try {
        const where: any = {
            [Op.or] : [
                {
                    role_name: {
                        [Op.iLike]: `%${props.search}%`,
                    },
                },
            ],
        }

        const totalRows = await Roles.count({
            where: where
        })

        if(totalRows === 0){
            return []
        }

        const result = await Roles.findAll({
            limit: props.limit,
            offset: (props.page - 1) * props.limit,
            where,
            order: [['created_at', 'desc']]
        })

        let data: opt[] = []
        if(result.length > 0){  
            data = result.map((val) => ({
                value: val.dataValues.id,
                label: val.dataValues.role_name
            }));
        }
        return data
    } catch (error) {
        console.log(error)
        throw error
    }
}