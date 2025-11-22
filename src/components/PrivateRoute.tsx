
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function PrivateRoute() {
    const { authState } = useAuth();

    if (authState.loading) {
        return (
            <div className="min-h-screen bg-slate-800 flex items-center justify-center text-white">
                Verificando sessão...
            </div>
        );
    }

    if (!authState.isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
}