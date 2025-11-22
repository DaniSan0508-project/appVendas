// src/components/Navbar.tsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Link, useLocation, useNavigate } from 'react-router-dom';

// Ícones SVG
const MenuIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
);

const XIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const ChevronDownIcon = () => (
    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
);

const BellIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM10.5 3.5a6 6 0 100 12 6 6 0 000-12zm-2 12a8 8 0 1110.5 0c0 7.5-8 12-8 12s-2.5-4.5-2.5-12z" />
    </svg>
);

export default function Navbar() {
    const { authState, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [cadastroOpen, setCadastroOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/login', { replace: true });
        setMobileMenuOpen(false);
    };

    // Fecha menus ao mudar de rota
    useEffect(() => {
        setMobileMenuOpen(false);
        setCadastroOpen(false);
    }, [location.pathname]);

    const cadastroItems = [
        { name: 'Consumidores', path: '/cadastro/consumidores' },
        { name: 'Lojas', path: '/cadastro/lojas' },
        { name: 'Produtos', path: '/cadastro/produtos' },
        { name: 'Usuários', path: '/cadastro/usuarios' },
    ];

    const isActive = (path: string) => location.pathname === path;

    return (
        <>
            {/* Overlay para mobile */}
            {mobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
                    onClick={() => setMobileMenuOpen(false)}
                ></div>
            )}

            <nav className="bg-[#27AAE1] text-white shadow-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        {/* Logo */}
                        <div className="flex-shrink-0 flex items-center">
                            <span className="text-xl font-bold tracking-wide">MEDIFARMA</span>
                        </div>

                        {/* Menu desktop */}
                        <div className="hidden md:flex items-center space-x-6">
                            <Link
                                to="/dashboard"
                                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${isActive('/dashboard') ? 'bg-blue-700' : 'hover:bg-blue-700'
                                    }`}
                            >
                                Indicadores
                            </Link>

                            {/* Dropdown Cadastro - Desktop (corrigido) */}
                            <div className="relative">
                                <button
                                    className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${cadastroOpen ? 'bg-blue-700' : 'hover:bg-blue-700'
                                        }`}
                                    onMouseEnter={() => setCadastroOpen(true)}
                                    onFocus={() => setCadastroOpen(true)}
                                >
                                    Cadastro
                                    <ChevronDownIcon />
                                </button>

                                {cadastroOpen && (
                                    <div
                                        className="dropdown-menu absolute left-0 mt-2 w-56 bg-white text-gray-800 rounded-lg shadow-lg border border-blue-100 z-50"
                                        onMouseEnter={() => setCadastroOpen(true)}
                                        onMouseLeave={() => {
                                            setTimeout(() => {
                                                setCadastroOpen(false);
                                            }, 200);
                                        }}
                                    >
                                        {cadastroItems.map((item) => (
                                            <Link
                                                key={item.path}
                                                to={item.path}
                                                className="block px-4 py-3 text-sm hover:bg-blue-50 transition-colors"
                                                onClick={() => setCadastroOpen(false)}
                                            >
                                                {item.name}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <Link
                                to="/gestao"
                                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${isActive('/gestao') ? 'bg-blue-700' : 'hover:bg-blue-700'
                                    }`}
                            >
                                Gestão
                            </Link>

                            <Link
                                to="/configuracoes"
                                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${isActive('/configuracoes') ? 'bg-blue-700' : 'hover:bg-blue-700'
                                    }`}
                            >
                                Configurações
                            </Link>
                        </div>

                        {/* Ícone hamburguer (mobile) */}
                        <div className="md:hidden flex items-center">
                            <button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="p-2 rounded-md hover:bg-blue-700 focus:outline-none"
                            >
                                {mobileMenuOpen ? <XIcon /> : <MenuIcon />}
                            </button>
                        </div>

                        {/* Área do usuário (desktop apenas) */}
                        <div className="hidden md:flex items-center space-x-4">
                            <button className="p-2 rounded-full hover:bg-blue-700 transition-colors relative">
                                <BellIcon />
                                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                            </button>

                            <div className="flex items-center space-x-2">
                                <div className="text-right">
                                    <div className="text-sm font-medium">
                                        {authState.user?.name || 'Usuário'}
                                    </div>
                                    <div className="text-xs opacity-90">
                                        {authState.user?.profile.name || 'Usuário'}
                                    </div>
                                </div>
                                <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-[#27AAE1] font-bold">
                                    {authState.user?.name?.charAt(0)?.toUpperCase() || 'U'}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Menu mobile */}
                {mobileMenuOpen && (
                    <div className="md:hidden fixed inset-y-0 right-0 w-64 bg-white text-gray-800 shadow-xl z-50 overflow-y-auto">
                        <div className="px-4 pt-4 pb-3 flex justify-between items-center border-b">
                            <span className="font-bold text-[#27AAE1]">Menu</span>
                            <button
                                onClick={() => setMobileMenuOpen(false)}
                                className="p-1 rounded-full hover:bg-gray-200"
                            >
                                <XIcon />
                            </button>
                        </div>

                        <div className="px-4 py-6 space-y-2">
                            <Link
                                to="/dashboard"
                                className={`block px-3 py-2 rounded-md ${isActive('/dashboard')
                                        ? 'bg-blue-100 text-[#27AAE1] font-medium'
                                        : 'text-gray-700 hover:bg-gray-100'
                                    }`}
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Indicadores
                            </Link>

                            {/* Cadastro mobile */}
                            <div>
                                <button
                                    onClick={() => setCadastroOpen(!cadastroOpen)}
                                    className="flex justify-between items-center w-full px-3 py-2 text-left text-gray-700 hover:bg-gray-100 rounded-md"
                                >
                                    <span>Cadastro</span>
                                    <ChevronDownIcon />
                                </button>
                                {cadastroOpen && (
                                    <div className="mt-1 ml-4 space-y-1">
                                        {cadastroItems.map((item) => (
                                            <Link
                                                key={item.path}
                                                to={item.path}
                                                className={`block px-3 py-2 rounded-md ${isActive(item.path)
                                                        ? 'bg-blue-100 text-[#27AAE1] font-medium'
                                                        : 'text-gray-600 hover:bg-gray-100'
                                                    }`}
                                                onClick={() => {
                                                    setMobileMenuOpen(false);
                                                    setCadastroOpen(false);
                                                }}
                                            >
                                                {item.name}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <Link
                                to="/gestao"
                                className={`block px-3 py-2 rounded-md ${isActive('/gestao')
                                        ? 'bg-blue-100 text-[#27AAE1] font-medium'
                                        : 'text-gray-700 hover:bg-gray-100'
                                    }`}
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Gestão
                            </Link>

                            <Link
                                to="/configuracoes"
                                className={`block px-3 py-2 rounded-md ${isActive('/configuracoes')
                                        ? 'bg-blue-100 text-[#27AAE1] font-medium'
                                        : 'text-gray-700 hover:bg-gray-100'
                                    }`}
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Configurações
                            </Link>

                            <div className="pt-4 mt-4 border-t">
                                <button
                                    onClick={handleLogout}
                                    className="w-full flex items-center px-3 py-2 text-red-600 hover:bg-red-50 rounded-md"
                                >
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                    </svg>
                                    Sair
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </nav>
        </>
    );
}