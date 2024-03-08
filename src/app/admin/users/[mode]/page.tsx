"use client"
import TextBox from '@/components/pieces/Form/Textbox';
import TitlePage from '@/components/pieces/Titlepage';
import AdminLayout from '@/layouts/AdminLayout';
import React from 'react';
import Button from '@/components/pieces/Form/Button';
import LoadingOverlay from '@/components/pieces/Loading';
import SwitchButton from '@/components/pieces/Form/SwitchButton';
import { Provider, useData } from './provider';
import Dropdown from '@/components/pieces/Form/Dropdown';

function Client(): React.ReactElement {
    const { state, action } = useData()
    
    return (
        <AdminLayout>
            <LoadingOverlay isLoading={state.isLoading} />
            <TitlePage title='Management Users' />
            <div className='p-8 my-4 rounded-lg bg-white h-full overflow-auto'>
                <h3 className='text-xl font-bold mb-4'>
                    { state.mode === 'create' ? "Add New" : state.mode === 'edit' ? 'Update' : "Detail"} User
                </h3>
                <form className="p-4 text-black">
                    <div className='flex'>
                        { state.mode !== "create" && (
                            <div className='basis-1/2 mr-2'>
                                <TextBox 
                                    label='User ID' 
                                    setValue={(selectedValue) => action.handleOnChange('user_id', selectedValue)}
                                    value={state.user['user_id']} key={'user'} 
                                    disabled={true} 
                                />
                            </div>
                        )}
                        <div className={`basis-1/2 ${ state.mode !== "create" ? 'ml-2' : 'pr-2'}`}>
                            <TextBox 
                                label='Username' 
                                setValue={(selectedValue) => action.handleOnChange('username', selectedValue)}
                                value={state.user['username']} key={'username'} 
                            />
                        </div>
                    </div>
                    <div className='flex'>
                        <div className='basis-1/2 mr-2'>
                            <TextBox 
                                label='Email' 
                                setValue={(selectedValue) => action.handleOnChange('email', selectedValue)}
                                value={state.user['email']} key={'email'} 
                                disabled={state.mode !== 'create'}
                            />
                        </div>
                        <div className='basis-1/2 ml-2'>
                            <SwitchButton 
                                label='Status'
                                onChange={(t:string) => action.handleOnChange('status', t)}
                                selectedValue={state.user['status']}
                                disabled={false}
                            />
                        </div>
                    </div>
                    <div className='flex'>
                        <div className='basis-1/2 mr-2'>
                            <TextBox 
                                label='Password' 
                                setValue={(selectedValue) => action.handleOnChange('password', selectedValue)}
                                value={state.user['password']} key={'password'} 
                                type='password'
                            />
                        </div>
                        <div className='basis-1/2 ml-2'>
                            <TextBox 
                                label='Confirm Password' 
                                setValue={(selectedValue) => action.handleOnChange('confirm_password', selectedValue)}
                                value={state.user['confirm_password']} key={'confirm_password'} 
                                type='password'
                            />
                        </div>
                    </div>
                    <div className='flex'>
                        <div className='basis-1/2 mr-2'>
                            <Dropdown 
                                apiUrl='/api/roles'
                                label='Role User'
                                onSelect={(selectedValue) => action.handleOnChange('role_id', selectedValue)}
                                key={'drp'}
                                selectedOption={{
                                    label: state.user['role_name'],
                                    value: state.user['role_id']
                                }}
                            />
                        </div>
                    </div>
                </form>
                {state.mode !== "view" && (
                    <div className='flex justify-end p-4'>
                        <Button 
                            disabled={state.isLoading}
                            onClick={action.handleSubmit}
                        ><span>Simpan</span></Button>
                    </div>
                )}
            </div>
        </AdminLayout>
    )
};

const Page = () => {
    return (
       <Provider>
          <Client />
       </Provider>
    )
 }
export default Page;
