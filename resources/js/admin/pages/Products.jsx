import React, { useEffect, useState } from 'react';
import {
    Plus, Search, Edit, Trash2, Eye, EyeOff, Star, StarOff
} from 'lucide-react';

export default function Products({ onEdit, onAdd }) {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);

    const fetchProducts = () => {
        setLoading(true);
        fetch(`/api/admin/products?search=${search}`)
            .then(r => r.json())
            .then(data => {
                setProducts(data.data || []);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    };

    useEffect(() => { fetchProducts(); }, [search]);

    const toggleActive = (id) => {
        fetch(`/api/admin/products/${id}/toggle-active`, { method: 'PATCH', headers: { 'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.content, 'Accept': 'application/json' } })
            .then(() => fetchProducts());
    };

    const togglePopular = (id) => {
        fetch(`/api/admin/products/${id}/toggle-popular`, { method: 'PATCH', headers: { 'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.content, 'Accept': 'application/json' } })
            .then(() => fetchProducts());
    };

    const deleteProduct = (id) => {
        if (!confirm('Удалить продукт?')) return;
        fetch(`/api/admin/products/${id}`, { method: 'DELETE', headers: { 'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.content, 'Accept': 'application/json' } })
            .then(() => fetchProducts());
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Поиск продуктов..."
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100"
                    />
                </div>
                <button
                    onClick={onAdd}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-green-600 to-emerald-500 text-white text-sm font-bold shadow-lg shadow-green-500/25 hover:scale-105 transition-transform"
                >
                    <Plus className="w-4 h-4" />
                    Добавить
                </button>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-100 bg-gray-50/50">
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Продукт</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Категория</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Цена</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Статус</th>
                                <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Действия</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {products.map((product) => (
                                <tr key={product.id} className="hover:bg-green-50/30 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center text-lg">
                                                🥟
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-gray-900">{product.name}</p>
                                                <p className="text-xs text-gray-400">{product.weight}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-sm text-gray-600">{product.category?.name}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-sm font-bold text-gray-900">{product.price}₽</span>
                                        {product.old_price && (
                                            <span className="ml-2 text-xs text-gray-400 line-through">{product.old_price}₽</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <span className={`px-2 py-1 rounded-lg text-xs font-bold ${product.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                                                {product.is_active ? 'Активен' : 'Скрыт'}
                                            </span>
                                            {product.is_popular && (
                                                <span className="px-2 py-1 rounded-lg text-xs font-bold bg-amber-100 text-amber-700">Хит</span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-end gap-1">
                                            <button
                                                onClick={() => toggleActive(product.id)}
                                                className="p-2 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
                                                title={product.is_active ? 'Скрыть' : 'Показать'}
                                            >
                                                {product.is_active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                                            </button>
                                            <button
                                                onClick={() => togglePopular(product.id)}
                                                className="p-2 rounded-lg text-gray-400 hover:bg-amber-50 hover:text-amber-600 transition-colors"
                                                title="Популярное"
                                            >
                                                {product.is_popular ? <Star className="w-4 h-4 fill-amber-400 text-amber-400" /> : <StarOff className="w-4 h-4" />}
                                            </button>
                                            <button
                                                onClick={() => onEdit(product)}
                                                className="p-2 rounded-lg text-gray-400 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                                            >
                                                <Edit className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => deleteProduct(product.id)}
                                                className="p-2 rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-600 transition-colors"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {products.length === 0 && !loading && (
                    <div className="text-center py-12">
                        <p className="text-gray-400">Продукты не найдены</p>
                    </div>
                )}
            </div>
        </div>
    );
}