import React, { useState, useEffect } from 'react';
import { NavbarComponent } from './components/Navbar';
import { ToastComponent } from './components/Toast';
import { HomeContent } from './pages/HomePage';
import { AppsPage } from './pages/AppsPage';
import { AppDetailsPage } from './pages/AppDetailsPage';
import { MyInstallationsPage } from './pages/MyInstallationsPage';
import { AppsData, getInstalledApps, saveInstalledApps } from './data/AppService';

const useRouter = (defaultPath = 'home') => {
    const [path, setPath] = useState(defaultPath);

    const navigate = (newPath) => {
        setPath(newPath);
    };

    return { path, navigate };
};

export default function App() {
    const { path, navigate } = useRouter('home');
    const [installedApps, setInstalledApps] = useState([]);
    const [toast, setToast] = useState({ message: '', type: '' });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setInstalledApps(getInstalledApps());
            setIsLoading(false);
        }, 800);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (!isLoading) {
            saveInstalledApps(installedApps);
        }
    }, [installedApps, isLoading]);

    const handleInstall = (app) => {
        if (!installedApps.includes(app.id)) {
            setInstalledApps(prev => [...prev, app.id]);
            setToast({ message: `${app.title} installed successfully!`, type: 'success' });
        }
    };

    const handleUninstall = (appId) => {
        setInstalledApps(prev => prev.filter(id => id !== appId));
        const app = AppsData.find(a => a.id === appId);
        if (app) {
            setToast({ message: `${app.title} uninstalled.`, type: 'error' });
        }
    };

    const renderPage = () => {
        const [basePath, param] = path.split('/');

        switch (basePath) {
            case 'apps':
                return (
                    <AppsPage 
                        appsData={AppsData} 
                        installedApps={installedApps} 
                        onNavigate={navigate} 
                        onInstall={handleInstall}
                        isLoading={isLoading}
                    />
                );
            case 'details':
                return (
                    <AppDetailsPage 
                        appId={param} 
                        appsData={AppsData}
                        installedApps={installedApps}
                        onInstall={handleInstall}
                        onUninstall={handleUninstall}
                        onNavigate={navigate}
                        isLoading={isLoading}
                    />
                );
            case 'myinstall':
                return (
                    <MyInstallationsPage 
                        installedApps={installedApps} 
                        appsData={AppsData} 
                        onNavigate={navigate} 
                        onUninstall={handleUninstall}
                        isLoading={isLoading}
                    />
                );
            case 'home':
            default:
                return (
                    <HomeContent 
                        onNavigate={navigate} 
                        appsData={AppsData} 
                        installedApps={installedApps} 
                        onInstall={handleInstall} 
                        isLoading={isLoading}
                    />
                );
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <NavbarComponent 
                currentPath={path} 
                onNavigate={navigate} 
                installedCount={installedApps.length}
            />
            
            <main className="flex-grow">
                {renderPage()}
            </main>

            <ToastComponent toast={toast} setToast={setToast} />

            <footer className="bg-gray-800 text-white text-center p-6 mt-12">
                <p className="text-sm">&copy; {new Date().getFullYear()} HERO.IO. All rights reserved. | Built with React & Tailwind CSS.</p>
            </footer>
        </div>
    );
}
