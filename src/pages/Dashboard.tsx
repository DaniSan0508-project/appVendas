// src/pages/Dashboard.tsx
import React from 'react';
import Navbar from '../components/Navbar';
import { useAuth } from '../hooks/useAuth';

// Ícones em SVG inline (sem dependência extra)
const UserGroupIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1m6 4h6v-1m6 4h6v-1M3 16h18v-2a1 1 0 00-1-1H4a1 1 0 00-1 1v2zM6 8h12v2H6V8z" />
    </svg>
);

const GiftIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
    </svg>
);

const ChartBarIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
);

const TagIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 12V7a4 4 0 014-4z" />
    </svg>
);

const UsersIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
);

const CakeIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 15.546c-.523 0-1.046.151-1.5.454a3.002 3.002 0 01-5.196 0h-4.392a3.002 3.002 0 01-5.196 0c-.454-.303-.977-.454-1.5-.454-1.103 0-2 .897-2 2v4.5a2 2 0 002 2h18a2 2 0 002-2v-4.5c0-1.103-.897-2-2-2z" />
    </svg>
);

export default function Dashboard() {
    const { authState } = useAuth();

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Card genérico com ícone */}
                    {[
                        {
                            title: 'Melhores Clientes',
                            description: 'Clientes que mais compraram',
                            icon: <UserGroupIcon />,
                            value: 'Sem dados',
                            periodOptions: true,
                        },
                        {
                            title: 'Faturamento Campanhas',
                            description: 'Campanhas que mais faturaram',
                            icon: <ChartBarIcon />,
                            value: 'Sem dados',
                            periodOptions: true,
                        },
                        {
                            title: 'Ofertas Mais Desejadas',
                            description: 'Ofertas mais ativas pelo app',
                            icon: <TagIcon />,
                            value: 'Sem dados',
                            periodOptions: true,
                        },
                        {
                            title: 'Clientes',
                            description: 'Total de clientes ativos',
                            icon: <UsersIcon />,
                            value: '31',
                            periodOptions: false,
                        },
                        {
                            title: 'Aniversariantes',
                            description: 'Neste mês',
                            icon: <CakeIcon />,
                            value: '6',
                            periodOptions: false,
                        },
                    ].map((card, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300 p-6"
                        >
                            <div className="flex items-start justify-between">
                                <div>
                                    <div className="inline-flex p-2 bg-blue-50 rounded-lg text-blue-600 mb-3">
                                        {card.icon}
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-800">{card.title}</h3>
                                    <p className="text-sm text-gray-500 mt-1">{card.description}</p>
                                </div>
                            </div>

                            <div className="mt-4 text-center">
                                {card.value === 'Sem dados' ? (
                                    <p className="text-gray-400 text-sm">Não há registros</p>
                                ) : (
                                    <div className="text-3xl font-bold text-blue-600">{card.value}</div>
                                )}
                            </div>

                            {card.periodOptions && (
                                <div className="mt-4 flex justify-end">
                                    <select className="text-sm text-gray-700 bg-gray-50 border border-gray-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500">
                                        <option>Semana</option>
                                        <option>Mês</option>
                                        <option>Ano</option>
                                    </select>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}