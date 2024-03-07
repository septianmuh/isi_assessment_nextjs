import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import { Op } from "sequelize"
import { UserEntity, UserProps } from "./type"
import sequelize from "@/database/models"
import User from "@/database/models/Users"

User.initialize(sequelize)

type queryProps = {
    page: number
    limit: number
    search: string
}

export const getListUsers = async(props: queryProps): Promise<{
    rows: UserEntity[]
    total_rows: number
    page: number
    limit: number
}> => {
    try {
        const where: any = {
            [Op.or] : [
                {
                    username: {
                        [Op.like]: `%${props.search}%`,
                    },
                },
                {
                    email: {
                        [Op.like]: `%${props.search}%`,
                    },
                },
            ],
        }

        const totalRows = await User.count({
            where: where
        })

        if(totalRows === 0){
            return {
                rows: [],
                total_rows: 0,
                page: props.page,
                limit: props.limit,
            }
        }

        const result = await User.findAll({
            limit: props.limit,
            offset: (props.page - 1) * props.limit,
            where,
            order: [['created_at', 'desc']]
        })

        let data: UserEntity[] = []
        if(result.length > 0){  
            data = result.map((val) => ({
                ...val.dataValues,
            }));
        }
        return {
            rows: data,
            total_rows: totalRows,
            page: props.page,
            limit: props.limit,
        } 
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const saveData = async(props: UserProps, method:'update' | 'create'): Promise<{data: UserEntity | null, error?: string}> => {
    try {
        let hashedPassword = ''
        if(props.password){
            hashedPassword  = await bcrypt.hash(props.password, 10);
        }

        if(props.user_id && method === 'update'){
            let user = await detailUser(props.user_id);
            if(!user){
                return { data: null, error: 'user id not found' }
            }

            let upd = {
                ...user,
                username: props.username,
                status: props.status,
            }
            if(hashedPassword){
                upd.password = hashedPassword
            }

            if(props.role_id){
                upd.role_id = props.role_id
            }

            await User.update(upd, {
                where: {
                    user_id: props.user_id
                }
            });

            return { data: user }
        }else if (method === 'create'){
            let isEmailExists = await User.findOne({
                where: { email: props.email }
            });
            
            if(isEmailExists){
                return { data: null, error: 'email has been used' }
            }
            const user = await User.create({
                user_id: uuidv4(),
                username: props.username,
                email: props.email,
                status: props.status,
                password: hashedPassword,
                role_id: props.role_id,
                created_at: new Date(),
            });
            return { data: user }
        }else{
            throw new Error('Invalid method')
        }
    
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const detailUser = async(user_id: string): Promise<UserEntity | null> => {
    try {
        const result = await User.findOne({
            where: {
                user_id
            },
        })
        
        return result
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const deleteUser = async(user_id: string): Promise<{data: UserEntity | null, error?: string}> => {
    try {
        let user = await detailUser(user_id);
        if(!user){
            return { data: null, error: 'user id not found' }
        }

        await User.destroy({ where: { user_id } })
        return { data : user }

    } catch (error) {
        console.log(error)
        throw error
    }
}