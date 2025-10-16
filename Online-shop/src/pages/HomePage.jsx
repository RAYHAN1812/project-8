import React from 'react';
import { Download, Star, Zap, Apple, Play, Gauge, CheckCircle, Power, Clock, Trello, Plane } from 'lucide-react';
import { StoreButton, StatCard, FloatingIcon, LoadingIndicator } from "../components/Utils";
import { AppCard } from "../components/AppCard";

export const HomeContent = ({ onNavigate, appsData, installedApps, onInstall, isLoading }) => {
    const appStoreLink = "https://www.apple.com/app-store/";
    const playStoreLink = "https://play.google.com/store";

    const MobileMockupWithFeatures = () => {
        const heroImageUrl = "./hero.png";

        return (
            <div className="mt-8 sm:mt-16 flex justify-center w-full relative max-w-xl mx-auto py-16">
                <FloatingIcon icon={Gauge} className="hidden sm:block -left-4 top-0 md:-left-8 md:top-4 lg:-left-12" bgColor="bg-blue-100" iconColor="text-blue-500" />
                <FloatingIcon icon={CheckCircle} className="hidden sm:block -left-10 top-1/3 md:-left-16 lg:-left-20" bgColor="bg-green-100" iconColor="text-green-500" />
                <FloatingIcon icon={Power} className="hidden sm:block -left-4 bottom-0 md:-left-8 md:-bottom-4 lg:-left-12" bgColor="bg-green-100" iconColor="text-green-500" />
                <FloatingIcon icon={Clock} className="hidden sm:block -right-4 top-0 md:-right-8 md:-top-4 lg:-right-12" bgColor="bg-red-100" iconColor="text-red-500" />
                <FloatingIcon icon={Trello} className="hidden sm:block -right-10 top-1/3 md:-right-16 lg:-right-20" bgColor="bg-blue-100" iconColor="text-blue-500" />
                <FloatingIcon icon={Plane} className="hidden sm:block -right-4 bottom-0 md:-right-8 md:-bottom-4 lg:-right-12" bgColor="bg-sky-100" iconColor="text-sky-500" />

                <img
                    src={heroImageUrl}
                    alt="HERO.IO Mobile App Preview"
                    className="w-full max-w-xs h-auto rounded-[2.5rem] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] transform transition duration-500 ease-in-out cursor-pointer hover:scale-[1.05]"
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `https://placehold.co/400x500/6366f1/ffffff?text=HERO+MOCKUP`;
                    }}
                />
            </div>
        );
    };

    const HeroSection = () => (
        <section className="py-12 md:py-24 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight">
                We Build <span className="text-indigo-600">Productive Apps</span>
            </h1>
            <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-600">
                At HERO.IO, we craft innovative apps designed to make everyday life simpler, smarter, and more exciting. Our goal is to turn your ideas into digital experiences that truly make an impact.
            </p>
            <div className="mt-8 sm:mt-10 flex flex-wrap justify-center gap-4">
                <StoreButton icon={Play} text="Google Play" link={playStoreLink} />
                <StoreButton icon={Apple} text="App Store" link={appStoreLink} />
            </div>
            <MobileMockupWithFeatures />
        </section>
    );

    const StatsSection = () => (
        <section className="bg-indigo-700 w-full py-12 md:py-16 rounded-t-[3rem] shadow-2xl">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-8 md:mb-12">
                    Trusted By Millions, Built For You
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <StatCard value="29.6M" label="Total Downloads" subtext="21% More Than Last Month" icon={Download} />
                    <StatCard value="906K" label="Total Reviews" subtext="45% More Than Last Month" icon={Star} />
                    <StatCard value="132+" label="Active Apps" subtext="50 More Will Launch Soon" icon={Zap} />
                </div>
            </div>
        </section>
    );

    const AppListSection = () => {
        if (isLoading) return <LoadingIndicator text="Loading featured apps..." />;

        return (
            <section className="py-16 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Our Featured Apps</h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-12">
                    Explore a curated selection of our most popular and high-performing applications.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {appsData.slice(0, 4).map(app => (
                        <AppCard 
                            key={app.id} 
                            app={app} 
                            onNavigate={onNavigate} 
                            onInstall={onInstall} 
                            isInstalled={installedApps.includes(app.id)}
                        />
                    ))}
                </div>

                <div className="mt-12">
                    <button
                        onClick={() => onNavigate('apps')}
                        className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-white bg-indigo-600 shadow-xl hover:bg-indigo-700 transition duration-300 transform hover:scale-[1.05] focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50"
                    >
                        Show All Apps &rarr;
                    </button>
                </div>
            </section>
        );
    };

    return (
        <>
            <HeroSection />
            <StatsSection />
            <AppListSection />
        </>
    );
};
