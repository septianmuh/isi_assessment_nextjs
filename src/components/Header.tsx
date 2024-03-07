import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons/faBars';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect } from 'react';

type HeaderProps = {
    isHomePage?: boolean
}
const Header = (props: HeaderProps) => {
    const [isMobileView, setIsMobileView] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    useEffect(() => {
        const handleResize = () => {
            setIsMobileView(window.innerWidth < 768);
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <header className={`fixed top-0 z-50 w-full transition-colors duration-300 ${isMenuOpen ? 'bg-second' : 'bg-transparent'}`}>
            <div className="px-[10%] sm:px-[5%] flex justify-between items-center">
                <div className="text-white h-20 p-4 sm:p-2">
                    <img src="/assets/logo-isii.png" alt="Logo Company" className="w-full h-full object-cover" />
                </div>
            </div>
        </header>
    );
};

export default Header;
