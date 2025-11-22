import { useAuth } from '../hooks/useAuth';

export default function Dashboard() {
    const { authState, logout } = useAuth();

    return (
        <div className="min-h-screen bg-slate-900 text-white p-6">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl font-bold">App Vendas</h1>
                    <button
                        onClick={logout}
                        className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition"
                    >
                        Sair
                    </button>
                </div>

                <div className="bg-slate-800 p-6 rounded-xl shadow">
                    <h2 className="text-xl font-semibold">Bem-vindo, {authState.user?.name}!</h2>
                    <p className="text-gray-300 mt-2">
                        Tenant: <span className="font-medium">{authState.user?.tenant.name}</span>
                    </p>
                    <p className="text-sm text-gray-400 mt-4">
                        Você está na área autenticada. Próximo passo: criar páginas de pedidos, produtos, etc.
                    </p>
                </div>
            </div>
        </div>
    );
}