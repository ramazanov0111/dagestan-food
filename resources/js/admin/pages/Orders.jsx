import React, { useEffect, useState } from 'react';
import { Eye, ChevronDown } from 'lucide-react';

const statusOptions = [
    { value: '', label: 'Все' },
    { value: 'new', label: 'Новые', color: 'blue' },
    { value: 'confirmed', label: 'Подтверждённые', color: 'indigo' },
    { value: 'preparing', label: 'Готовятся', color: 'yellow' },
    { value: 'delivering', label: 'Доставляются', color: 'orange' },
    { value: 'delivered', label: 'Доставлены', color: 'green' },
    { value: 'cancelled', label: 'Отменены', color: 'red' },
];

const statusColors = {
    new: 'bg-blue-100 text-blue-700',
    confirmed: 'bg-indigo-100 text-indigo-700',
    preparing: 'bg-yellow-100 text-yellow-700',
    delivering: 'bg-orange-100 text-orange-700',
    delivered: 'bg-green-100 text-green-700',
    cancelled: 'bg-red-100 text-red-700',
};

const statusLabels = {
    new: 'Новый',
    confirmed: 'Подтверждён',
    preparing: 'Готовится',
    delivering: 'Доставляется',
    delivered: 'Доставлен',
    cancelled: 'Отменён',
};

export default function Orders() {
    const [orders, setOrders] = useState([]);
    const [filter, setFilter] = useState('');
    const [selected, setSelected] = useState(null);

    const fetchOrders = () => {
        fetch(`/api/admin/orders?status=${filter}`)
            .then(r => r.json())
            .then(data => setOrders(data.data || []))
            .catch(() => {});
    };

    useEffect(() => { fetchOrders(); }, [filter]);

    const updateStatus = (orderId, status) => {
        fetch(`/api/admin/orders/${orderId}/status`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.content || '',
            },
            body: JSON.stringify({ status }),
        }).then(() => fetchOrders());
    };

    return (
        <div className="space-y-6">
            {/* Filters */}
            <div className="flex flex-wrap gap-2">
                {statusOptions.map(s => (
                    <button
                        key={s.value}
                        onClick={() => setFilter(s.value)}
                        className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                            filter === s.value
                                ? 'bg-green-600 text-white shadow-lg shadow-green-500/25'
                                : 'bg-white border border-gray-200 text-gray-600 hover:border-green-300'
                        }`}
                    >
                        {s.label}
                    </button>
                ))}
            </div>

            {/* Orders list */}
            <div className="space-y-3">
                {orders.map((order) => (
                    <div key={order.id} className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md transition-shadow">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                            <div className="flex items-center gap-4">
                                <div>
                                    <p className="text-sm font-bold text-gray-900">{order.order_number}</p>
                                    <p className="text-xs text-gray-400">{order.customer_name} • {order.customer_phone}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-lg font-extrabold text-gray-900">{parseFloat(order.total).toLocaleString()}₽</span>
                                <span className={`px-3 py-1 rounded-lg text-xs font-bold ${statusColors[order.status]}`}>
                                    {statusLabels[order.status]}
                                </span>
                                <select
                                    value={order.status}
                                    onChange={(e) => updateStatus(order.id, e.target.value)}
                                    className="px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-medium focus:outline-none focus:border-green-400"
                                >
                                    {statusOptions.filter(s => s.value).map(s => (
                                        <option key={s.value} value={s.value}>{s.label}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {order.items && order.items.length > 0 && (
                            <div className="mt-3 pt-3 border-t border-gray-50">
                                <div className="flex flex-wrap gap-2">
                                    {order.items.map((item, i) => (
                                        <span key={i} className="text-xs bg-gray-50 text-gray-600 px-2 py-1 rounded-lg">
                                            {item.product_name} x{item.quantity}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                ))}

                {orders.length === 0 && (
                    <div className="text-center py-12 bg-white rounded-2xl border border-gray-100">
                        <p className="text-gray-400">Заказов не найдено</p>
                    </div>
                )}
            </div>
        </div>
    );
}