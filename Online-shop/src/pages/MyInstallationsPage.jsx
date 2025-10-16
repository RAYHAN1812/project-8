import React from 'react';
import { AppCard } from '../components/AppCard';
import { NoResults, LoadingIndicator } from '../components/Utils';
import { Download } from 'lucide-react';

export const MyInstallationsPage = ({ installedApps, appsData, onNavigate, onUninstall, isLoading }) => {
    const installedAppObjects = appsData.filter(app => installedApps.includes(app.id));

    if (isLoading) {
        return <LoadingIndicator text="Checking your installed apps..." />;
    }

    return (
        <div className="pt-12 pb-8 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
                <h1 className="text-4xl font-extrabold text-gray-900 mb-2">My Installations</h1>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">Manage the apps you have installed. Uninstall any app when you no longer need it.</p>
            </div>

            {installedAppObjects.length === 0 ? (
                <NoResults message="You haven't installed any apps yet." />
            ) : (
                <>
                    <p className="text-lg font-semibold text-gray-700 mb-8">
                        Total Installed Apps: <span className="text-indigo-600">{installedAppObjects.length}</span>
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {installedAppObjects.map(app => (
                            <AppCard
                                key={app.id}
                                app={app}
                                onNavigate={onNavigate}
                                onUninstall={onUninstall}
                                isInstalled={true}
                                isInstalledPage={true}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};
