import React, { useState } from 'react';
import {
    LayoutDashboard, Package, FolderOpen, ShoppingBag,
    UtensilsCrossed, Menu, X, LogOut, Bell, Settings
} from 'lucide-react';

const navItems = [
    { id: 'dashboard', label: 'Дашборд', icon: LayoutDashboard },
    { id: 'products', label: 'Продукты', icon: Package },
    { id: 'categories', label: 'Категории', icon: FolderOpen },
    { id: 'orders', label: 'Заказы', icon: ShoppingBag },
];

export default function AdminLayout({ currentPage, onNavigate, children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Sidebar */}
            <aside className={`fixed inset-y-0 left-0 z-30 w-64 bg-white border-r border-gray-200 transform transition-transform lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="p-6 border-b border-gray-100">
                    <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-green-600 to-emerald-500 flex items-center justify-center">
                            <UtensilsCrossed className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <span className="text-lg font-bold text-gray-900">ДагЕда</span>
                            <span className="block text-[10px] text-gray-400 -mt-0.5">Админ-панель</span>
                        </div>
                    </div>
                </div>

                <nav className="p-4 space-y-1">
                    {navItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => { onNavigate(item.id); setSidebarOpen(false); }}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                                currentPage === item.id
                                    ? 'bg-green-50 text-green-700 shadow-sm'
                                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                            }`}
                        >
                            <item.icon className="w-5 h-5" />
                            {item.label}
                        </button>
                    ))}
                </nav>

                <div className="absolute bottom-4 left-4 right-4">
                    <a href="/" className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-400 hover:bg-gray-50 hover:text-gray-600 transition-all">
                        <LogOut className="w-5 h-5" />
                        На сайт
                    </a>
                </div>
            </aside>

            {/* Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/30 z-20 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Main */}
            <div className="lg:pl-64">
                {/* Top bar */}
                <header className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b border-gray-100 px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="lg:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100"
                        >
                            <Menu className="w-5 h-5" />
                        </button>
                        <h1 className="text-lg font-bold text-gray-900 capitalize hidden lg:block">
                            {navItems.find(n => n.id === currentPage)?.label || 'Дашборд'}
                        </h1>
                        <div className="flex items-center gap-3">
                            <button className="p-2 rounded-lg text-gray-400 hover:bg-gray-100 relative">
                                <Bell className="w-5 h-5" />
                                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500" />
                            </button>
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-emerald-400 flex items-center justify-center text-white text-xs font-bold">
                                А
                            </div>
                        </div>
                    </div>
                </header>

                <main className="p-4 sm:p-6 lg:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}