export interface UserEntity {
    user_id: string
    username: string
    email: string
    status: 'ACTIVE' | 'INACTIVE'
    password: string
    role_id: number
    created_at?: Date
    updated_at?: Date
}

export interface UserProps {
    user_id?: string
    username: string
    email: string
    status: 'ACTIVE' | 'INACTIVE'
    password: string
    role_id: number
    created_at?: Date
    updated_at?: Date
}