"use client"
import React, { useEffect, useState } from 'react';
import LoadingOverlay from '@/components/pieces/Loading';
import Header from '@/components/Header';
import { useRouter } from 'next/navigation';

const Page: React.FC  = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const router = useRouter()

    const handleScroll = () => {
        const header = document.querySelector('header');
        if (header) {
            const scrollY = window.scrollY;
            if (scrollY > 100) {
                header.classList.add('bg-main');
                header.classList.remove('bg-transparent')
            } else {
                header.classList.add('bg-transparent')
                header.classList.remove('bg-main');
            }
        }
    };

    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

    useEffect(() => {
        setCurrentYear(new Date().getFullYear());
    }, []);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className='bg-gray-100'>
            <LoadingOverlay isLoading={loading} />
            <Header isHomePage={true} />
            <div className="h-full flex items-center justify-center" style={{backgroundImage: "url(/assets/template.jpg)", height:"100vh", overflow: "hidden"}}>
                <div className='flex items-center'>
                    <button
                        className='flex py-8 px-16 font-bold 
                            rounded-full 
                            bg-gradient-to-r from-sky-300 to-cyan-600 text-blue-900
                            hover:from-cyan-600 hover:to-sky-300 hover:text-white text-2xl'
                        onClick={() => router.push('/auth/login')}
                    >
                        To Login Page
                    </button>
                </div>
            </div>
            <footer className="fixed bottom-0 bg-main text-white py-2 text-xs text-center flex justify-center w-full">
                <div >
                    &#169; {currentYear} Assessment ISI. All Right Reserved.
                </div>
            </footer>
        </div>
    );
};

export default Page;
