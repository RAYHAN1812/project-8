import React, { useState, useMemo, useEffect } from 'react';
import { Search, Sliders } from 'lucide-react';
import { AppCard } from '../components/AppCard';
import { LoadingIndicator, NoResults } from '../components/Utils';

export const AppsPage = ({ appsData, installedApps, onNavigate, onInstall, isLoading }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('none');
    const [isSearching, setIsSearching] = useState(false);

    const filteredAndSortedApps = useMemo(() => {
        const filtered = appsData.filter(app =>
            app.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
            app.companyName.toLowerCase().includes(searchTerm.toLowerCase())
        );

        const sorted = [...filtered];

        if (sortBy === 'high-low') {
            sorted.sort((a, b) => b.downloads - a.downloads);
        } else if (sortBy === 'low-high') {
            sorted.sort((a, b) => a.downloads - b.downloads);
        } else if (sortBy === 'rating') {
            sorted.sort((a, b) => b.ratingAvg - a.ratingAvg);
        }
        return sorted;
    }, [appsData, searchTerm, sortBy]);

    useEffect(() => {
      if (searchTerm) {
        setIsSearching(true);
        const timer = setTimeout(() => setIsSearching(false), 500);
        return () => clearTimeout(timer);
      } else {
        setIsSearching(false);
      }
    }, [searchTerm]);

    if (isLoading) {
      return <LoadingIndicator text="Loading all apps..." />;
    }

    return (
      <div className="pt-12 pb-8 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-10">
              <h1 className="text-4xl font-extrabold text-gray-900 mb-2">The HERO.IO App Store</h1>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">Discover the best tools to enhance your productivity and daily life. Find the perfect app for every need.</p>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
              <p className="text-lg font-semibold text-gray-700">
                  Total Apps: <span className="text-indigo-600">{filteredAndSortedApps.length}</span>
              </p>
              
              <div className="flex w-full md:w-auto space-x-4">
                  <div className="relative flex-grow">
                      <input
                          type="text"
                          placeholder="Search apps..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="w-full md:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
                      />
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      {isSearching && (
                        <Loader className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-indigo-500 animate-spin" />
                      )}
                  </div>
                  
                  <div className="relative">
                      <select
                          value={sortBy}
                          onChange={(e) => setSortBy(e.target.value)}
                          className="appearance-none w-full md:w-40 pl-4 pr-10 py-2 border border-gray-300 rounded-xl bg-white focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 text-gray-700"
                      >
                          <option value="none">Sort By</option>
                          <option value="rating">Rating (Highest)</option>
                          <option value="high-low">Downloads (High to Low)</option>
                          <option value="low-high">Downloads (Low to High)</option>
                      </select>
                      <Sliders className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                  </div>
              </div>
          </div>
          
          {filteredAndSortedApps.length === 0 ? (
              <NoResults />
          ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {filteredAndSortedApps.map(app => (
                      <AppCard 
                          key={app.id} 
                          app={app} 
                          onNavigate={onNavigate} 
                          onInstall={onInstall}
                          isInstalled={installedApps.includes(app.id)}
                      />
                  ))}
              </div>
          )}
      </div>
    );
};