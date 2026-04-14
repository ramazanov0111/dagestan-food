import React, { useState, useEffect } from 'react';
import { ArrowLeft, Save, Upload } from 'lucide-react';

export default function ProductForm({ product, onBack }) {
    const [categories, setCategories] = useState([]);
    const [form, setForm] = useState({
        category_id: '',
        name: '',
        slug: '',
        description: '',
        composition: '',
        price: '',
        old_price: '',
        weight: '',
        is_halal: true,
        is_active: true,
        is_popular: false,
        is_new: false,
        sort_order: 0,
        stock: 0,
    });
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetch('/api/admin/categories')
            .then(r => r.json())
            .then(setCategories)
            .catch(() => {});

        if (product) {
            setForm({
                category_id: product.category_id || '',
                name: product.name || '',
                slug: product.slug || '',
                description: product.description || '',
                composition: product.composition || '',
                price: product.price || '',
                old_price: product.old_price || '',
                weight: product.weight || '',
                is_halal: product.is_halal ?? true,
                is_active: product.is_active ?? true,
                is_popular: product.is_popular ?? false,
                is_new: product.is_new ?? false,
                sort_order: product.sort_order || 0,
                stock: product.stock || 0,
            });
        }
    }, [product]);

    const handleChange = (key, value) => {
        setForm(prev => ({ ...prev, [key]: value }));
        if (key === 'name' && !product) {
            setForm(prev => ({
                ...prev,
                [key]: value,
                slug: value.toLowerCase().replace(/[^a-zа-яё0-9]+/gi, '-').replace(/-+$/, ''),
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);

        const url = product ? `/api/admin/products/${product.id}` : '/api/admin/products';
        const method = product ? 'PUT' : 'POST';

        try {
            await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.content || '',
                },
                body: JSON.stringify(form),
            });
            onBack();
        } catch (err) {
            alert('Ошибка сохранения');
        }
        setSaving(false);
    };

    return (
        <div className="max-w-3xl">
            <button
                onClick={onBack}
                className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 mb-6 transition-colors"
            >
                <ArrowLeft className="w-4 h-4" />
                Назад к списку
            </button>

            <div className="bg-white rounded-2xl border border-gray-100 p-6 lg:p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                    {product ? 'Редактировать продукт' : 'Новый продукт'}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Название *</label>
                            <input
                                value={form.name}
                                onChange={(e) => handleChange('name', e.target.value)}
                                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Slug *</label>
                            <input
                                value={form.slug}
                                onChange={(e) => handleChange('slug', e.target.value)}
                                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Категория *</label>
                        <select
                            value={form.category_id}
                            onChange={(e) => handleChange('category_id', e.target.value)}
                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100"
                            required
                        >
                            <option value="">Выберите категорию</option>
                            {categories.map(c => (
                                <option key={c.id} value={c.id}>{c.name}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Описание</label>
                        <textarea
                            value={form.description}
                            onChange={(e) => handleChange('description', e.target.value)}
                            rows={3}
                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100 resize-none"
                        />
                    </div>

                    <div className="grid sm:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Цена *</label>
                            <input
                                type="number"
                                step="0.01"
                                value={form.price}
                                onChange={(e) => handleChange('price', e.target.value)}
                                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Старая цена</label>
                            <input
                                type="number"
                                step="0.01"
                                value={form.old_price}
                                onChange={(e) => handleChange('old_price', e.target.value)}
                                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Вес</label>
                            <input
                                value={form.weight}
                                onChange={(e) => handleChange('weight', e.target.value)}
                                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100"
                                placeholder="500г"
                            />
                        </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Остаток</label>
                            <input
                                type="number"
                                value={form.stock}
                                onChange={(e) => handleChange('stock', parseInt(e.target.value))}
                                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Сортировка</label>
                            <input
                                type="number"
                                value={form.sort_order}
                                onChange={(e) => handleChange('sort_order', parseInt(e.target.value))}
                                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100"
                            />
                        </div>
                    </div>

                    {/* Toggles */}
                    <div className="flex flex-wrap gap-6 py-4 border-t border-gray-100">
                        {[
                            { key: 'is_active', label: 'Активен' },
                            { key: 'is_halal', label: 'Халяль' },
                            { key: 'is_popular', label: 'Популярное' },
                            { key: 'is_new', label: 'Новинка' },
                        ].map(toggle => (
                            <label key={toggle.key} className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={form[toggle.key]}
                                    onChange={(e) => handleChange(toggle.key, e.target.checked)}
                                    className="w-4 h-4 rounded border-gray-300 text-green-600 focus:ring-green-400"
                                />
                                <span className="text-sm font-medium text-gray-700">{toggle.label}</span>
                            </label>
                        ))}
                    </div>

                    <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                        <button
                            type="submit"
                            disabled={saving}
                            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-green-600 to-emerald-500 text-white text-sm font-bold shadow-lg shadow-green-500/25 hover:scale-105 transition-transform disabled:opacity-50"
                        >
                            <Save className="w-4 h-4" />
                            {saving ? 'Сохранение...' : 'Сохранить'}
                        </button>
                        <button
                            type="button"
                            onClick={onBack}
                            className="px-6 py-3 rounded-xl border border-gray-200 text-sm font-semibold text-gray-500 hover:bg-gray-50 transition-colors"
                        >
                            Отмена
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}