import { redirect, useParams, usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react';
import { InitialState, Mode, User } from './type';
import axios, { AxiosResponse } from 'axios';
import Swal from 'sweetalert2';
import { OptionsFormat } from '@/components/pieces/Form/Dropdown';

const InitState : InitialState = {
    action : {
        handleOnChange(fieldName: string, selectedValue: any){},
        handleSubmit(){}
    },
    state : {
        user: {} as User,
        isLoading: false,
        mode: "create",
    },
    hooks: {
        router: {} as any,
        param: {},
        pathname: '',
        searchParams: {} as any
    }
}
const DataContext = React.createContext<InitialState>(InitState);

export function Provider(p: React.PropsWithChildren ) {
    const param = useParams()
    const searchParams = useSearchParams()

    const { mode = 'create' } = param;
    const { user_id } = searchParams as any;
    // if (['view', 'create', "edit"].indexOf(mode) < 0) return redirect(`/admin/users`);

    const pathname = usePathname()
    const router = useRouter()
    const [isLoading, setIsLoading]= useState<boolean>(false)
    const [user, setUser] = useState<User>({
        user_id: '',
        username: '',
        email: '',
        status: 'INACTIVE',
        password: '',
        confirm_password: '',
        role_name: '',
        role_id: 0,
    });

    useEffect(() => {
        const getData = async () => {
            const response = await axios.get(`${pathname.replace(mode as string, '')}api`, {params:{ user_id: user_id }});
            if(response.status === 200){
                setUser({
                    ...response.data.data,
                    password: ''
                })
            }
        }
        if(mode !== "create"){
            getData()
        }
    }, [])
      
    const handleOnChange = (fieldName: string, selectedValue: any) => {
        if(fieldName === "role_id"){
            let nObj:any = {}
            nObj.role_name = (selectedValue as OptionsFormat).label
            nObj.role_id = (selectedValue as OptionsFormat).value
            setUser((prevUser) => ({
                ...prevUser,
                ...nObj
            }))
        }else {
            setUser((prevUser) => ({
                ...prevUser,
                [fieldName]: selectedValue,
            }));
        }
    };
    
    const handleSubmit = async () => {
        try {
            if(mode === "view") return false

            setIsLoading(true)
            let response: AxiosResponse
            const pathApi = `${pathname.replace(mode as string, '')}/api`
            if(mode === 'create'){
                response = await axios.post(pathApi, {
                    data: {
                        ...user,
                    }
                });
            } else {
                response = await axios.patch(pathApi, {
                    data: {
                        ...user,
                    }
                }, {params:{ user_id: user.user_id}});
            }
            
            if(response.status === 200){
                Swal.fire({
                    title: "Berhasil",
                    text: `${mode === "create" ? "Save New" : "Update"} data user`,
                    icon: "success",
                    showCancelButton: false,
                    confirmButtonColor: "#3085d6",
                    confirmButtonText: "OK"
                  }).then(async (result) => {
                    if (result.isConfirmed) {
                        router.push(`${pathname.replace(mode as string, '')}`)
                    }
                })
            }else{
                Swal.fire({
                    icon: "error",
                    title: "Terjadi Kesalahan",
                    text: response?.data?.data?.message || ""
                })
            }
        } catch (error) {
            const res = (error as any).response || null
            let errMsg = res && res.statusText === "ERROR_VALIDATION" ? res.data.message : res.data.message
            Swal.fire({
                icon: "error",
                title: "Terjadi Kesalahan",
                text: errMsg
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <DataContext.Provider
            value={{
                action: {
                    handleOnChange,
                    handleSubmit,
                },
                state: {
                    mode: mode as Mode,
                    user,
                    isLoading,
                },
                hooks: {
                    param,
                    router,
                    pathname,
                    searchParams
                }
            }}
        >
            {p.children}
        </DataContext.Provider>
    );
}
export const useData = (): InitialState => useContext(DataContext);
