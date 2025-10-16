import React from 'react';
import { renderStars, formatDownloads } from './Utils';
import { CheckCircle, Trash2 } from 'lucide-react';

export const AppCard = ({ app, onNavigate, onInstall, isInstalled, onUninstall, isInstalledPage = false }) => {
  const handleAction = (e) => {
    e.stopPropagation();
    if (isInstalledPage) {
      onUninstall(app.id);
    } else if (!isInstalled) {
      onInstall(app);
    }
  };

  return (
    <div
      className="bg-white p-4 sm:p-6 rounded-xl shadow-lg border border-gray-100 transition duration-300 hover:shadow-2xl hover:-translate-y-1 text-left cursor-pointer w-full sm:w-auto"
      onClick={() => onNavigate(`details/${app.id}`)}
    >
      <div className="flex items-start space-x-3 sm:space-x-4 mb-3 sm:mb-4">
        <img
          src={app.image}
          alt={`${app.title} icon`}
          className="flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 rounded-2xl object-cover shadow-md"
          onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/64x64/2563EB/ffffff?text=App"; }}
        />
        <div className="overflow-hidden">
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 truncate">{app.title}</h3>
          <p className="text-xs sm:text-sm text-indigo-600 font-medium truncate">{app.companyName}</p>
        </div>
      </div>

      <p className="mt-2 text-xs sm:text-sm text-gray-600 line-clamp-2">{app.description}</p>

      <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-100">
        <div className="flex items-center justify-between">
          {renderStars(app.ratingAvg)}
          <span className="ml-1 text-gray-800 font-semibold text-xs sm:text-sm">{app.ratingAvg.toFixed(1)}</span>
        </div>

        <div className="flex justify-between items-center mt-2 sm:mt-3 text-xs text-gray-500">
          <span>
            <span className="font-bold text-gray-800">{formatDownloads(app.downloads)}</span> Downloads
          </span>
          <span>{app.size} MB</span>
        </div>
      </div>

      <button
        onClick={handleAction}
        disabled={!isInstalledPage && isInstalled}
        className={`mt-3 sm:mt-4 w-full py-2 sm:py-2.5 rounded-lg text-sm sm:text-sm font-semibold transition duration-200 shadow-md hover:shadow-lg transform active:scale-95
          ${isInstalledPage
            ? 'bg-red-500 text-white hover:bg-red-600'
            : isInstalled
              ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
              : 'bg-indigo-600 text-white hover:bg-indigo-700'
          }`}
      >
        {isInstalledPage ? (
          <span className="flex items-center justify-center">
            <Trash2 className="w-4 h-4 mr-2" /> Uninstall
          </span>
        ) : isInstalled ? (
          <span className="flex items-center justify-center">
            <CheckCircle className="w-4 h-4 mr-2" /> Installed
          </span>
        ) : 'Get App'}
      </button>
    </div>
  );
};
