import React, { useEffect, useState } from 'react';
import {
    Package, ShoppingBag, DollarSign, TrendingUp,
    Clock, Users, ArrowUpRight
} from 'lucide-react';

export default function Dashboard() {
    const [stats, setStats] = useState(null);

    useEffect(() => {
        fetch('/api/admin/dashboard/stats')
            .then(r => r.json())
            .then(setStats)
            .catch(() => {
                // Demo fallback
                setStats({
                    total_products: 18,
                    active_products: 15,
                    total_categories: 6,
                    total_orders: 247,
                    new_orders: 5,
                    total_revenue: 485600,
                    today_orders: 12,
                    today_revenue: 18400,
                    total_reviews: 42,
                    recent_orders: [],
                });
            });
    }, []);

    if (!stats) return (
        <div className="flex items-center justify-center h-64">
            <div className="w-8 h-8 border-4 border-green-200 border-t-green-600 rounded-full animate-spin" />
        </div>
    );

    const cards = [
        { label: 'Всего заказов', value: stats.total_orders, icon: ShoppingBag, color: 'from-green-500 to-emerald-400', change: '+12%' },
        { label: 'Общий доход', value: `${(stats.total_revenue / 1000).toFixed(0)}K ₽`, icon: DollarSign, color: 'from-blue-500 to-indigo-400', change: '+8%' },
        { label: 'Новые заказы', value: stats.new_orders, icon: Clock, color: 'from-amber-500 to-orange-400', change: '' },
        { label: 'Продуктов', value: stats.total_products, icon: Package, color: 'from-purple-500 to-violet-400', change: '' },
    ];

    return (
        <div className="space-y-8">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                {cards.map((card, i) => (
                    <div key={i} className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-lg transition-shadow">
                        <div className="flex items-start justify-between mb-4">
                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center shadow-lg`}>
                                <card.icon className="w-6 h-6 text-white" />
                            </div>
                            {card.change && (
                                <span className="flex items-center gap-1 text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-lg">
                                    <ArrowUpRight className="w-3 h-3" />
                                    {card.change}
                                </span>
                            )}
                        </div>
                        <p className="text-2xl font-extrabold text-gray-900">{card.value}</p>
                        <p className="text-sm text-gray-400 mt-1">{card.label}</p>
                    </div>
                ))}
            </div>

            {/* Quick info */}
            <div className="grid lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl border border-gray-100 p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Сегодня</h3>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 rounded-xl bg-green-50">
                            <span className="text-sm font-medium text-gray-600">Заказов сегодня</span>
                            <span className="text-2xl font-bold text-green-600">{stats.today_orders}</span>
                        </div>
                        <div className="flex items-center justify-between p-4 rounded-xl bg-blue-50">
                            <span className="text-sm font-medium text-gray-600">Доход сегодня</span>
                            <span className="text-2xl font-bold text-blue-600">{stats.today_revenue?.toLocaleString()}₽</span>
                        </div>
                        <div className="flex items-center justify-between p-4 rounded-xl bg-amber-50">
                            <span className="text-sm font-medium text-gray-600">Отзывов</span>
                            <span className="text-2xl font-bold text-amber-600">{stats.total_reviews}</span>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-2xl border border-gray-100 p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Быстрые действия</h3>
                    <div className="grid grid-cols-2 gap-3">
                        {[
                            { label: 'Добавить продукт', icon: Package, color: 'bg-green-50 text-green-700 hover:bg-green-100' },
                            { label: 'Новые заказы', icon: ShoppingBag, color: 'bg-blue-50 text-blue-700 hover:bg-blue-100' },
                            { label: 'Категории', icon: TrendingUp, color: 'bg-purple-50 text-purple-700 hover:bg-purple-100' },
                            { label: 'Настройки', icon: Users, color: 'bg-amber-50 text-amber-700 hover:bg-amber-100' },
                        ].map((action, i) => (
                            <button
                                key={i}
                                className={`flex flex-col items-center gap-2 p-5 rounded-xl ${action.color} transition-colors`}
                            >
                                <action.icon className="w-6 h-6" />
                                <span className="text-xs font-semibold">{action.label}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}