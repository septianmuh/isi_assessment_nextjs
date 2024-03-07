'use client'
import React from 'react';
import TextBox from '@/components/pieces/Form/Textbox';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { signIn, useSession } from 'next-auth/react';

import Head from 'next/head';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import LoadingOverlay from '@/components/pieces/Loading';

const Login: React.FC = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [hidePass, setHidePass] = useState(true);
    const [loading, setLoading] = useState<boolean>(false);
	const session = useSession();
    const router = useRouter();

    useEffect(() => {
		if (session.status === 'authenticated') {
			router.push('/admin/dashboard');
		}
	}, [session, router]);

    const handleSubmit = async (e: any) => {
        try {
            e.preventDefault();
            setLoading(true);
        
            let rsp = await signIn('credentials', {
                email,
                password,
                redirect: false
            });

            if(rsp?.ok){
                return router.push('/admin/dashboard');
            }

            Swal.fire({
                icon: "error",
                title: 'Invalid Credentials',
                text: rsp?.error || ""
            });
           
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex h-screen">
            <LoadingOverlay isLoading={loading} />
            <Head>
                <title>Login Page</title>
            </Head>
            <div className="flex items-center justify-center w-full bg-cover bg-center" style={{ backgroundImage: 'url("/assets/template.jpg")' }}>
                <div className="bg-white p-8 rounded-lg shadow-md md:w-1/3 sm:w-2/3">
                    <h1 className="text-2xl font-bold mb-4 text-center text-main">Login Admin</h1>
                    <form>
                        <div className="mb-8">
                            <TextBox 
                                label='Email'
                                setValue={(selectedValue) => setEmail(selectedValue)}
                                value={email}
                                placeholder='Masukan e-mail Admin'
                            />
                        </div>
                        <div className="mb-8">
                            <TextBox 
                                label='Password'
                                setValue={(selectedValue) => setPassword(selectedValue)}
                                value={password}
                                placeholder='Masukan password anda'
                                type={hidePass ? 'password' : 'text'}
                            >
                                {
                                    !hidePass ? (
                                        <FontAwesomeIcon className="text-main text-lg" icon={faEye} onClick={() => setHidePass(true)} />
                                    ) : (
                                        <FontAwesomeIcon className="text-main text-lg" icon={faEyeSlash}  onClick={() => setHidePass(false)} />
                                    )
                                }
                            </TextBox>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-main mt-2 text-white px-4 py-4 text-xl font-bold rounded-full hover:bg-cyan-600 focus:outline-none focus:bg-blue-600"
                            onClick={handleSubmit}
                        >
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
