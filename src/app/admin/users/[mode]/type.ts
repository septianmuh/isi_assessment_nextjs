import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"
import { Params } from "next/dist/shared/lib/router/utils/route-matcher"
import { ReadonlyURLSearchParams } from "next/navigation"

export type Mode = "create" | "edit" |"view"
export interface User {
    role_name: string
    role_id: number
    user_id: string
    username: string
    email: string
    status: 'ACTIVE' | 'INACTIVE'
    password: string
    confirm_password: string
}

export type InitialState = {
    action : {
        handleOnChange(fieldName: string, selectedValue: any): any
        handleSubmit(): any
    }
    state : {
        user: User
        isLoading: boolean
        mode: Mode
    },
    hooks: {
        router: AppRouterInstance
        param: Params
        pathname: string
        searchParams: ReadonlyURLSearchParams
    }
}