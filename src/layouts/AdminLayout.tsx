"use client"
import React, { ReactNode, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faUser, faHome, faCogs, faRightFromBracket, faUsers } from '@fortawesome/free-solid-svg-icons';
import "@/appstyles/layout.css";
import Link from 'next/link';
import App from '@/app';
import { signOut } from 'next-auth/react';
interface AdminLayoutProps {
    children: ReactNode;
}
  
const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [showDropdown, setShowDropdown] = useState(false);

    const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
    };

    const menuItems = [
        {
            menu_name: "Dashboard",
            icon: faHome,
            url: "/admin/dashboard"
        },
        {
            menu_name: "Manage Users",
            icon: faUsers,
            url: "/admin/users"
        }
    ]

    return (
	    <App>
            <div className={`flex bg-gray-100`} style={{height: '100%'}}>
                <aside className={`flex flex-col bg-main text-white transition-all ease-in-out duration-300 ${!isSidebarOpen ? 'sidebar-collapse' : `sidebar-expands`}`}>
                    <div className="text-xl font-bold flex flex-col items-center justify-center" style={{marginBottom: "1rem", minHeight: "10%", marginTop:"0.5rem"}}>
                        {!isSidebarOpen ? (
                            <img src='/assets/small-icon.png' alt='user-logo' style={{width:"100%"}}></img>
                        ): (
                            <img src='/assets/logo-isii.png' alt='main-logo' style={{width:"80%"}}></img>
                        )}
                    </div>
                    <nav>
                        <ul>
                            {menuItems.map((item, index) => (
                                <li key={index} className='text-xl py-4 px-4 mr-8 transition-colors duration-300 hover:bg-half'>
                                    <Link href={item.url}>
                                        <FontAwesomeIcon icon={item.icon} size="xl" className="mr-2" />
                                        {isSidebarOpen && item.menu_name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </aside>
                <div className="flex flex-col flex-1 overflow-hidden w-full">
                    <header className="bg-white shadow p-4 flex justify-between items-center w-full">
                        <div className='py-2'>
                            <button onClick={toggleSidebar} className="mr-4">
                            <FontAwesomeIcon icon={faBars} className='text-main text-xl'/>
                            </button>
                        </div>
                        <div className="flex items-center mr-2 relative">
                            <button
                                onClick={() => setShowDropdown(!showDropdown)}
                                className="py-2 px-4 bg-gray-400 rounded-full flex items-center justify-center"
                                style={{ width: '40px', height: '40px', borderRadius: '50%' }}
                            >
                                <FontAwesomeIcon icon={faUser} className="text-main text-xl" />
                            </button>
                            {showDropdown && (
                                <div className="absolute bg-white border rounded shadow-md" style={{top:'2rem', right:'2rem', width:"8rem"}}>
                                    <ul>
                                        <li key={"actionIndex"}>
                                            <button
                                                onClick={() => {
                                                    signOut()
                                                    setShowDropdown(false);
                                                }}
                                                className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left"
                                            >
                                                <FontAwesomeIcon icon={faRightFromBracket} className='text-black mr-2'/>
                                                Logout
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    </header>
                    <div className="flex flex-col p-8 text-blue-900 overflow-auto">
                        {children}
                    </div>
                </div>
            </div>
        </App>
    );
};

export default AdminLayout;
