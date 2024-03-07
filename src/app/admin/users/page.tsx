"use client"
import Button from '@/components/pieces/Form/Button';
import TextBox from '@/components/pieces/Form/Textbox';
import Table from '@/components/pieces/Table';
import TitlePage from '@/components/pieces/Titlepage';
import AdminLayout from '@/layouts/AdminLayout';
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faRefresh, faSearch } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2'
import axios from 'axios';
import { usePathname, useRouter } from 'next/navigation';
import LoadingOverlay from '@/components/pieces/Loading';
import { User } from './[mode]/type';

const Page = () => {
    const pathname = usePathname()
    const router = useRouter()
    const [filter, setFilter] = useState<string>("")
    const [tableData, setTableData] = useState<User[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [page, setPage] = useState<number>(1)
    const [totalRows, setTotalRows] = useState<number>(0)
    const [limit, setLimit] = useState<number>(10)

    const handleChangePage = async (paramPage: number, paramLimit: number) => {
        setPage(paramPage)
        setLimit(paramLimit)
    }

    const fetchData = async (refresh?:boolean) => {
        try {
            setLoading(true);
            const response = await axios.get(`${pathname}/api`, {params: {
                page: page,
                limit: limit,
                search: (refresh ? '' : filter)
            }});
            if(response.status === 200){
                setTableData(response.data.data.rows);
                setTotalRows(response.data.data.total_rows)
            }else{
                Swal.fire({
                    icon: "error",
                    title: "Terjadi Kesalahan",
                    text: response?.data?.message || ""
                })
            }

        } catch (error) {
            console.error('Error fetching table data data:', error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(()=>{
        fetchData()
    }, [limit, page])

    const handleFilter = () => {
        if(filter.length > 0){
            setPage(1)
            fetchData()
        }
    }

    const actionTable = async (row: any, param: string) => {
        if(param === "delete"){
            Swal.fire({
                title: "Apa anda yakin?",
                text: "Data yang dihapus tidak dapat dikembalikan",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Ya, Hapus!"
              }).then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        const response = await axios.delete(`${pathname}/api`, {
                            params: { user_id: row.user_id }
                        });
                        if(response.status === 200){
                            Swal.fire({
                                title: "Berhasil terhapus!",
                                text: `Data telah berhasil dihapus`,
                                icon: "success",
                                showCancelButton: false,
                                confirmButtonColor: "#3085d6",
                                confirmButtonText: "OK"
                              }).then(async (confirm) => {
                                if (confirm.isConfirmed) {
                                    setPage(1);
                                    setFilter('');
                                    fetchData(true)
                                }
                            })
                        }
                    } catch (error) {
                        const res = (error as any).response || null
                        let errMsg = res && res.data.data ? res.data.data.message : res.data.message
                        Swal.fire({
                            icon: "error",
                            title: "Terjadi Kesalahan",
                            text: errMsg
                        })
                    }
                }
            });
        }else{
            router.push(`/admin/users/${param}?user_id=${row.user_id}`)
        }
    }

    const tableAction = [
        {
            title: "Edit",
            param: "edit",
            handler: actionTable
        },
        {
            title: "View",
            param: "view",
            handler: actionTable
        },
        {
            title: "Hapus",
            param: "delete",
            handler: actionTable
        }
    ]

    const columns = [
        {
            field: "user_id",
            title: "User ID"
        },
        {
            field: "username",
            title: "Username"
        },
        {
            field: "email",
            title: "Email"
        },
        {
            field: "status",
            title: "Status",
            onRender: (val: string) => {
                return val === 'ACTIVE' ? (<span className='bg-green-400 p-2 rounded-full text-sm'>ACTIVE</span>) : (<span className='bg-red-400 p-2 rounded-full text-sm'>INACTIVE</span>)
            }
        }
    ]
    
    return (
        <AdminLayout>
            <LoadingOverlay isLoading={loading} />
            <TitlePage title='Management Users' />
            <div className='p-8 my-4 rounded-lg bg-white h-full text-black'>
                <h3 className='mb-4 font-bold text-xl'>User List</h3>
                <div className='flex items-end justify-end'>
                    <Button 
                        onClick={() => router.push(`${pathname}/create`)}
                    >
                        <span><FontAwesomeIcon icon={faPlusCircle} /> New User</span>
                    </Button>
                </div>
                <div className='w-full flex items-center mt-4 mb-2'>
                    <div className='basis-1/2 mr-2'>
                        <TextBox 
                            label='' 
                            setValue={(selectedValue) => setFilter(selectedValue)}
                            value={filter} key={'username'} 
                            placeholder='Search by username or email'
                        />
                    </div>
                    <div className='flex basis-1/4 ml-2 mb-2'>
                        <div className='mr-2'>
                            <Button 
                                onClick={handleFilter}
                            >
                                <span><FontAwesomeIcon icon={faSearch} /> Search</span>
                            </Button>
                        </div>
                        <div className='mr-2'>
                            <Button 
                                onClick={() => {
                                    setFilter('');
                                    setPage(1);
                                    fetchData(true)
                                }}
                            >
                                <span><FontAwesomeIcon icon={faRefresh} /></span>
                            </Button>
                        </div>
                    </div>
                </div>
                <Table 
                    serial={true}
                    columns={columns}
                    data={tableData}
                    actions={tableAction}
                    pagination={{
                        currentPage: page,
                        totalPages: Math.ceil(totalRows/limit),
                        defaultItemsPerPage: limit,
                        onPageChange: handleChangePage,
                    }}
                />
            </div>
        </AdminLayout>
    )
};

export default Page;
