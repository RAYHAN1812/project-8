import React, { useState } from 'react';
import { Home as HomeIcon, List, Download } from 'lucide-react';

export const NavbarComponent = ({ currentPath, onNavigate, installedCount }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    const baseLinkClass = "text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition duration-200 flex items-center";
    const activeLinkClass = "text-indigo-700 underline decoration-2 decoration-indigo-700 underline-offset-4";
    const inactiveLinkClass = "hover:text-indigo-700";
    const mobileLinkClass = "text-gray-900 block px-3 py-2 rounded-md text-base font-medium transition duration-200 flex items-center";
    const mobileActiveLinkClass = "bg-indigo-100 text-indigo-700";
    const mobileInactiveLinkClass = "hover:bg-indigo-50";

    const NavButton = ({ targetPath, label, isMobile = false, icon: Icon, showCount = false }) => {
        const isActive = currentPath.startsWith(targetPath);
        const linkClasses = isMobile 
            ? `${mobileLinkClass} ${isActive ? mobileActiveLinkClass : mobileInactiveLinkClass}`
            : `${baseLinkClass} ${isActive ? activeLinkClass : inactiveLinkClass}`;
        
        return (
            <button
                onClick={() => { onNavigate(targetPath); setIsOpen(false); }}
                className={linkClasses}
            >
                {Icon && <Icon className="w-4 h-4 mr-1.5" />}
                {label}
                {showCount && installedCount > 0 && (
                    <span className="ml-2 px-2 py-0.5 text-xs font-bold text-white bg-red-500 rounded-full">
                        {installedCount}
                    </span>
                )}
            </button>
        );
    };

    return (
        <nav className="bg-white shadow-lg sticky top-0 z-50">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex-shrink-0 flex items-center">
                        <button onClick={() => onNavigate('home')} className="flex items-center">
                            <img
                                src="https://placehold.co/32x32/6366f1/ffffff?text=L"
                                alt="HERO.IO Logo"
                                className="w-8 h-8 rounded-lg"
                            />
                            <span className="ml-2 text-xl font-bold text-indigo-700">HERO.IO</span>
                        </button>
                    </div>

                    <div className="flex-1 flex justify-center">
                        <div className="hidden md:flex space-x-8">
                            <NavButton targetPath="home" label="Home" icon={HomeIcon} />
                            <NavButton targetPath="apps" label="Apps" icon={List} />
                            <NavButton targetPath="myinstall" label="My Installation" icon={Download} showCount={true} />
                        </div>
                    </div>

                    <div className="hidden md:flex items-center">
                        <a
                            href="https://github.com/RAYHAN1812/Hero_app"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ml-8 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 shadow-md hover:bg-indigo-700 transition duration-150"
                        >
                            Contribute
                        </a>
                    </div>

                    <div className="-mr-2 flex md:hidden">
                        <button
                            onClick={toggleMenu}
                            type="button"
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 transition duration-150"
                            aria-controls="mobile-menu"
                            aria-expanded={isOpen}
                        >
                            <span className="sr-only">Open main menu</span>
                            {!isOpen ? (
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            ) : (
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {isOpen && (
                <div className="md:hidden" id="mobile-menu">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <NavButton targetPath="home" label="Home" isMobile={true} icon={HomeIcon} />
                        <NavButton targetPath="apps" label="Apps" isMobile={true} icon={List} />
                        <NavButton targetPath="myinstall" label="My Installation" isMobile={true} icon={Download} showCount={true} />
                        <a
                            href="https://github.com/RAYHAN1812/Hero_app"
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => setIsOpen(false)}
                            className="mt-4 block w-full text-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150"
                        >
                            Contribute
                        </a>
                    </div>
                </div>
            )}
        </nav>
    );
};
