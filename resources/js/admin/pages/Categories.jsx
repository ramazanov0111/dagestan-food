import React, { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';

export default function Categories() {
    const [categories, setCategories] = useState([]);
    const [editing, setEditing] = useState(null);
    const [newCat, setNewCat] = useState({ name: '', slug: '', icon: 'UtensilsCrossed', description: '' });
    const [showAdd, setShowAdd] = useState(false);

    const fetchCategories = () => {
        fetch('/api/admin/categories')
            .then(r => r.json())
            .then(setCategories)
            .catch(() => {});
    };

    useEffect(() => { fetchCategories(); }, []);

    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.content || '',
    };

    const saveNew = () => {
        fetch('/api/admin/categories', {
            method: 'POST',
            headers,
            body: JSON.stringify({ ...newCat, slug: newCat.slug || newCat.name.toLowerCase().replace(/\s+/g, '-') }),
        }).then(() => {
            fetchCategories();
            setShowAdd(false);
            setNewCat({ name: '', slug: '', icon: 'UtensilsCrossed', description: '' });
        });
    };

    const saveEdit = (id) => {
        fetch(`/api/admin/categories/${id}`, {
            method: 'PUT',
            headers,
            body: JSON.stringify(editing),
        }).then(() => {
            fetchCategories();
            setEditing(null);
        });
    };

    const deleteCat = (id) => {
        if (!confirm('Удалить категорию и все её продукты?')) return;
        fetch(`/api/admin/categories/${id}`, { method: 'DELETE', headers })
            .then(() => fetchCategories());
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-gray-900">Категории ({categories.length})</h2>
                <button
                    onClick={() => setShowAdd(!showAdd)}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-green-600 to-emerald-500 text-white text-sm font-bold shadow-lg shadow-green-500/25 hover:scale-105 transition-transform"
                >
                    <Plus className="w-4 h-4" />
                    Добавить
                </button>
            </div>

            {/* Add form */}
            {showAdd && (
                <div className="bg-white rounded-2xl border border-green-200 p-6">
                    <h3 className="text-sm font-bold text-gray-900 mb-4">Новая категория</h3>
                    <div className="grid sm:grid-cols-3 gap-4 mb-4">
                        <input
                            value={newCat.name}
                            onChange={(e) => setNewCat(p => ({ ...p, name: e.target.value }))}
                            placeholder="Название"
                            className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-green-400"
                        />
                        <input
                            value={newCat.icon}
                            onChange={(e) => setNewCat(p => ({ ...p, icon: e.target.value }))}
                            placeholder="Иконка (lucide)"
                            className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-green-400"
                        />
                        <input
                            value={newCat.description}
                            onChange={(e) => setNewCat(p => ({ ...p, description: e.target.value }))}
                            placeholder="Описание"
                            className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-green-400"
                        />
                    </div>
                    <div className="flex gap-2">
                        <button onClick={saveNew} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-600 text-white text-sm font-bold hover:bg-green-700">
                            <Save className="w-4 h-4" /> Сохранить
                        </button>
                        <button onClick={() => setShowAdd(false)} className="px-4 py-2 rounded-lg border border-gray-200 text-sm text-gray-500">
                            Отмена
                        </button>
                    </div>
                </div>
            )}

            {/* List */}
            <div className="bg-white rounded-2xl border border-gray-100 divide-y divide-gray-50">
                {categories.map((cat) => (
                    <div key={cat.id} className="flex items-center justify-between p-5 hover:bg-green-50/30 transition-colors">
                        {editing?.id === cat.id ? (
                            <div className="flex items-center gap-3 flex-1">
                                <input
                                    value={editing.name}
                                    onChange={(e) => setEditing(p => ({ ...p, name: e.target.value }))}
                                    className="px-3 py-2 rounded-lg border border-gray-200 text-sm flex-1"
                                />
                                <button onClick={() => saveEdit(cat.id)} className="p-2 rounded-lg bg-green-100 text-green-700 hover:bg-green-200">
                                    <Save className="w-4 h-4" />
                                </button>
                                <button onClick={() => setEditing(null)} className="p-2 rounded-lg bg-gray-100 text-gray-500 hover:bg-gray-200">
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        ) : (
                            <>
                                <div>
                                    <p className="text-sm font-bold text-gray-900">{cat.name}</p>
                                    <p className="text-xs text-gray-400">{cat.products_count || 0} продуктов • {cat.slug}</p>
                                </div>
                                <div className="flex items-center gap-1">
                                    <button
                                        onClick={() => setEditing({ ...cat })}
                                        className="p-2 rounded-lg text-gray-400 hover:bg-blue-50 hover:text-blue-600"
                                    >
                                        <Edit className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => deleteCat(cat.id)}
                                        className="p-2 rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-600"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}