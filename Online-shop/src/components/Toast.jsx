import React, { useEffect } from 'react';
import { CheckCircle, X } from 'lucide-react';

export const ToastComponent = ({ toast, setToast }) => {
    if (!toast.message) return null;

    const getStyle = (type) => {
        switch (type) {
            case 'success':
                return 'bg-green-500';
            case 'error':
                return 'bg-red-500';
            default:
                return 'bg-gray-700';
        }
    };

    useEffect(() => {
        if (toast.message) {
            const timer = setTimeout(() => {
                setToast({ message: '', type: '' });
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [toast.message, setToast]);

    return (
        <div
            className={`fixed bottom-5 right-5 p-4 rounded-lg text-white shadow-xl flex items-center space-x-3 transition-opacity duration-300 z-[100] ${getStyle(toast.type)}`}
            role="alert"
        >
            <CheckCircle className="w-5 h-5" />
            <p className="text-sm font-medium">{toast.message}</p>
            <button onClick={() => setToast({ message: '', type: '' })}>
                <X className="w-4 h-4" />
            </button>
        </div>
    );
};
