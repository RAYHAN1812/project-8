import React from 'react';
import { Star, Zap, Download, Apple, Play, CheckCircle, X, Trash2, Loader, Search } from 'lucide-react';

export const ResponsiveContainer = ({ children, width = '100%', height = 300 }) => (
  <div style={{ width, height, margin: '0 auto' }}>{children}</div>
);
export const LineChart = ({ children }) => <div className="p-4 bg-white rounded-xl shadow-inner">{children}</div>;
export const Line = () => <div className="h-1 bg-indigo-500 rounded-full w-full" style={{ opacity: 0.7 }} />;
export const XAxis = ({ dataKey }) => <div className="text-xs text-gray-500 pt-2 border-t border-gray-200">X-Axis ({dataKey})</div>;
export const YAxis = () => <div className="text-xs text-gray-500 pt-2 border-l border-gray-200 pl-2">Y-Axis (Reviews)</div>;
export const Tooltip = () => <div className="absolute top-0 right-0 p-1 text-xs bg-gray-800 text-white rounded-md shadow-lg">Data Point Mock</div>;
export const ChartPlaceholder = ({ data }) => {
  const chartHeight = 200;
  const dataPoints = data.map(d => d.value);
  const maxVal = Math.max(...dataPoints);
  return (
    <ResponsiveContainer>
      <div className="relative w-full h-full p-4">
        <div className="absolute inset-0 flex flex-col justify-between">
          <div className="h-px bg-gray-200"></div>
          <div className="h-px bg-gray-200"></div>
          <div className="h-px bg-gray-200"></div>
        </div>
        <div className="flex justify-between items-end h-full relative">
          {data.map((point, index) => (
            <div key={index} className="flex flex-col items-center h-full justify-end">
              <div
                className="w-4 bg-indigo-500 rounded-t-lg transition-all duration-500 hover:bg-indigo-600"
                style={{ height: `${(point.value / maxVal) * chartHeight}px`, minHeight: '5px' }}
              ></div>
              <span className="text-xs text-gray-600 mt-1">{point.name}</span>
            </div>
          ))}
        </div>
        <p className="text-center text-sm font-medium text-gray-500 mt-4">Review Chart (Mock Recharts Visualization)</p>
      </div>
    </ResponsiveContainer>
  );
};

export const formatDownloads = (num) => {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M+';
  if (num >= 1000) return (num / 1000).toFixed(0) + 'K+';
  return num.toLocaleString();
};

export const renderStars = (rating) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.3 && rating % 1 < 0.8;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  const StarIcon = ({ type }) => {
    if (type === 'full') return <Star className="w-4 h-4 text-yellow-500 fill-current" />;
    if (type === 'half') return <Star className="w-4 h-4 text-yellow-500 fill-current opacity-50" />;
    return <Star className="w-4 h-4 text-gray-300" />;
  };

  return (
    <div className="flex items-center text-sm space-x-0.5">
      {Array(fullStars).fill(0).map((_, i) => (<StarIcon key={`full-${i}`} type="full" />))}
      {hasHalfStar && (<StarIcon key="half" type="half" />)}
      {Array(emptyStars).fill(0).map((_, i) => (<StarIcon key={`empty-${i}`} type="empty" />))}
    </div>
  );
};

export const StoreButton = ({ icon: Icon, text, link }) => (
  <a
    href={link}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center space-x-2 px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-gray-900 text-white font-semibold text-sm shadow-lg hover:bg-indigo-700 transition duration-300 transform hover:scale-[1.02] active:scale-[0.98] border border-gray-700"
  >
    <Icon className="w-5 h-5" />
    <span className="flex flex-col items-start leading-none">
      <span className="text-xs font-light">GET IT ON</span>
      <span className="text-base">{text}</span>
    </span>
  </a>
);

export const StatCard = ({ value, label, subtext, icon: Icon }) => (
  <div className="flex flex-col items-center p-4 sm:p-6">
    <Icon className="w-8 h-8 text-indigo-200 mb-3" />
    <div className="text-3xl sm:text-5xl font-extrabold text-white mb-1">{value}</div>
    <p className="text-sm font-medium text-indigo-300 uppercase tracking-wider mb-1">{label}</p>
    <p className="text-xs text-indigo-400 font-light italic">{subtext}</p>
  </div>
);

export const FloatingIcon = ({ icon: Icon, className, iconColor, bgColor }) => (
  <div className={`absolute p-3 rounded-full shadow-xl transition duration-500 hover:scale-110 ${className} ${bgColor}`}>
    <Icon className={`w-6 h-6 ${iconColor}`} />
  </div>
);

export const LoadingIndicator = ({ text = "Loading..." }) => (
  <div className="flex items-center justify-center p-10 text-lg font-medium text-indigo-600">
    <Loader className="w-6 h-6 mr-3 animate-spin" />
    {text}
  </div>
);

export const NoResults = ({ message = "No applications found matching your criteria." }) => (
  <div className="text-center p-16 bg-gray-50 rounded-xl shadow-inner my-8">
    <Search className="w-10 h-10 mx-auto text-gray-400 mb-4" />
    <p className="text-xl font-medium text-gray-700">{message}</p>
    <p className="text-gray-500 mt-2">Try adjusting your search query or filters.</p>
  </div>
);

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
