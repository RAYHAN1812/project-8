import React from 'react';
import { StoreButton, renderStars, formatDownloads, ChartPlaceholder, LoadingIndicator } from '../components/Utils';
import { Apple, Play, Download, Star, Power, Clock, Trello } from 'lucide-react';

export const AppDetailsPage = ({ appId, appsData, installedApps, onInstall, onUninstall, onNavigate, isLoading }) => {
    const app = appsData.find(a => a.id === parseInt(appId));
    const isInstalled = installedApps.includes(parseInt(appId));

    const appStoreLink = "https://www.apple.com/app-store/";
    const playStoreLink = "https://play.google.com/store";

    if (isLoading) {
        return <LoadingIndicator text="Loading app details..." />;
    }

    if (!app) {
        return (
            <div className="p-16 text-center">
                <h1 className="text-3xl font-bold text-red-600">404 - App Not Found</h1>
                <p className="mt-4 text-gray-600">The application you are looking for does not exist.</p>
                <button 
                    onClick={() => onNavigate('apps')}
                    className="mt-6 px-6 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition"
                >
                    Go to App Store
                </button>
            </div>
        );
    }

    const handleAction = () => {
        if (isInstalled) {
            onUninstall(app.id);
        } else {
            onInstall(app);
        }
    };

    const actionText = isInstalled ? 'Uninstall' : 'Install Now';
    const actionIcon = isInstalled ? <Power className='w-5 h-5 mr-2'/> : <Download className='w-5 h-5 mr-2'/>;
    const actionClass = isInstalled ? 'bg-red-500 hover:bg-red-600' : 'bg-indigo-600 hover:bg-indigo-700';

    const FeatureCard = ({ icon: Icon, title, description, color }) => (
        <div className="p-6 bg-white rounded-xl shadow-md border border-gray-100 text-left">
            <Icon className={`w-8 h-8 ${color} mb-3`} />
            <h3 className="font-bold text-lg text-gray-900">{title}</h3>
            <p className="text-sm text-gray-600 mt-1">{description}</p>
        </div>
    );

    return (
        <div className="pt-12 pb-16 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <button 
                onClick={() => onNavigate('apps')}
                className="flex items-center text-indigo-600 hover:text-indigo-800 transition mb-8 text-sm font-medium"
            >
                &larr; Back to All Apps
            </button>
            
            <div className="flex flex-col md:flex-row md:items-start space-y-8 md:space-y-0 md:space-x-12 p-8 bg-white rounded-2xl shadow-xl">
                <img 
                    src={app.image} 
                    alt={`${app.title} icon`} 
                    className="flex-shrink-0 w-32 h-32 sm:w-40 sm:h-40 rounded-3xl object-cover shadow-2xl border-4 border-white"
                    onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/160x160/2563EB/ffffff?text=App"; }}
                />
                
                <div className="flex-grow">
                    <p className="text-sm text-indigo-600 font-semibold mb-1 uppercase tracking-wider">{app.companyName}</p>
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">{app.title}</h1>
                    <p className="mt-3 text-lg text-gray-700">{app.description}</p>
                    
                    <div className="mt-6 flex flex-wrap items-center gap-6">
                        <div className="flex flex-col items-center">
                            <span className="text-3xl font-bold text-gray-900">{app.ratingAvg.toFixed(1)}</span>
                            {renderStars(app.ratingAvg)}
                            <span className="text-xs text-gray-500 mt-1">{app.reviews.toLocaleString()} reviews</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="text-3xl font-bold text-gray-900">{formatDownloads(app.downloads)}</span>
                            <span className="text-sm text-gray-500 mt-1">Downloads</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="text-3xl font-bold text-gray-900">{app.size} MB</span>
                            <span className="text-sm text-gray-500 mt-1">Size</span>
                        </div>
                    </div>
                    
                    <div className="mt-8 flex items-center space-x-4">
                        <button
                            onClick={handleAction}
                            className={`flex items-center justify-center px-8 py-3 rounded-full text-base font-semibold text-white shadow-xl transition duration-300 transform hover:scale-[1.02] active:scale-95 ${actionClass}`}
                        >
                            {actionIcon}
                            {actionText}
                        </button>
                        
                        <div className="flex space-x-2">
                            <StoreButton icon={Play} text="" link={playStoreLink} />
                            <StoreButton icon={Apple} text="" link={appStoreLink} />
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2">
                    <h2 className="text-3xl font-extrabold text-gray-900 mb-6">Review Analytics</h2>
                    <div className="p-6 bg-gray-50 rounded-xl shadow-lg border border-gray-100">
                        <ChartPlaceholder data={app.reviewData} />
                    </div>
                    
                    <h2 className="text-3xl font-extrabold text-gray-900 mt-12 mb-6">Key Features</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <FeatureCard icon={Power} title="High Performance" description="Optimized for speed and efficiency across all devices." color="text-green-600" />
                        <FeatureCard icon={Clock} title="Real-time Sync" description="Keep your data consistent and up-to-date instantly." color="text-red-600" />
                        <FeatureCard icon={Trello} title="Cross-Platform" description="Seamless experience on web, iOS, and Android." color="text-blue-600" />
                        <FeatureCard icon={Star} title="User-Focused" description="Designed with a beautiful, intuitive user interface." color="text-yellow-600" />
                    </div>
                </div>
                
                <aside className="lg:col-span-1">
                    <div className="sticky top-24 p-6 bg-indigo-50 rounded-xl shadow-inner border-t-4 border-indigo-600">
                        <h3 className="text-xl font-bold text-indigo-900 mb-4">Why Choose {app.title}?</h3>
                        <ul className="space-y-3 text-gray-700">
                            <li className="flex items-start">
                                <span className="text-indigo-600 mr-3 text-lg">&bull;</span>
                                Trusted by {formatDownloads(app.downloads)} users worldwide.
                            </li>
                            <li className="flex items-start">
                                <span className="text-indigo-600 mr-3 text-lg">&bull;</span>
                                Rated an average of {app.ratingAvg.toFixed(1)} stars.
                            </li>
                            <li className="flex items-start">
                                <span className="text-indigo-600 mr-3 text-lg">&bull;</span>
                                Regular updates with new features and improvements.
                            </li>
                            <li className="flex items-start">
                                <span className="text-indigo-600 mr-3 text-lg">&bull;</span>
                                Dedicated support team available 24/7.
                            </li>
                        </ul>
                    </div>
                </aside>
            </div>
        </div>
    );
};
