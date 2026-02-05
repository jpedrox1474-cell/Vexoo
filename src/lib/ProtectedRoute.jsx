import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, isLoadingAuth, user, getTrialInfo } = useAuth();
    const navigate = useNavigate();
    const { pathname } = window.location;

    useEffect(() => {
        if (!isLoadingAuth && !isAuthenticated) {
            navigate('/Login', { replace: true });
            return;
        }

        if (!isLoadingAuth && isAuthenticated && user) {
            const trial = getTrialInfo(user);
            const isModuleRoute = ['VetSystem', 'BarberSystem', 'EliteSystem', 'VidracariaSystem'].some(path => pathname.includes(path));

            if (trial.isExpired && isModuleRoute) {
                navigate('/ModulesDashboard', { replace: true });
            }
        }
    }, [isAuthenticated, isLoadingAuth, user, navigate, pathname, getTrialInfo]);

    if (isLoadingAuth) {
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-white">
                <div className="w-8 h-8 border-4 border-slate-200 border-t-indigo-600 rounded-full animate-spin"></div>
            </div>
        );
    }

    return isAuthenticated ? children : null;
};

export default ProtectedRoute;
