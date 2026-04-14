import React, { useState, useEffect } from 'react';
import {
    UtensilsCrossed, Cookie, ChefHat, Cake, Snowflake,
    GlassWater, ShoppingCart, Star, Plus, Minus, Eye, Heart
} from 'lucide-react';
import { useScrollAnimation } from './hooks/useScrollAnimation';

const iconMap = {
    UtensilsCrossed, Cookie, ChefHat, Cake, Snowflake, GlassWater,
};

export default function MenuSection() {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [activeCategory, setActiveCategory] = useState(null);
    const [loading, setLoading] = useState(true);
    const [ref, isVisible] = useScrollAnimation(0.05);

    // Fallback data for demo
    const fallbackCategories = [
        { id: 0, name: 'Все', slug: 'all', icon: 'UtensilsCrossed' },
        { id: 1, name: 'Курзе', slug: 'kurze', icon: 'UtensilsCrossed' },
        { id: 2, name: 'Чуду', slug: 'chudu', icon: 'Cookie' },
        { id: 3, name: 'Хинкал', slug: 'hinkal', icon: 'ChefHat' },
        { id: 4, name: 'Кондитерка', slug: 'konditerka', icon: 'Cake' },
        { id: 5, name: 'Заморозка', slug: 'frozen', icon: 'Snowflake' },
        { id: 6, name: 'Напитки', slug: 'drinks', icon: 'GlassWater' },
    ];

    const fallbackProducts = [
        { id: 1, name: 'Курзе с мясом', price: 450, old_price: 520, weight: '500г', category_id: 1, is_popular: true, is_new: false, is_halal: true, description: 'Классические с бараниной' },
        { id: 2, name: 'Курзе с творогом', price: 380, old_price: null, weight: '500г', category_id: 1, is_popular: false, is_new: false, is_halal: true, description: 'С домашним творогом' },
        { id: 3, name: 'Курзе с тыквой', price: 380, old_price: null, weight: '500г', category_id: 1, is_popular: false, is_new: true, is_halal: true, description: 'Сезонная тыква' },
        { id: 4, name: 'Чуду с мясом', price: 320, old_price: null, weight: '400г', category_id: 2, is_popular: true, is_new: false, is_halal: true, description: 'Тонкий пирог с бараниной' },
        { id: 5, name: 'Чуду с зеленью', price: 280, old_price: null, weight: '350г', category_id: 2, is_popular: false, is_new: false, is_halal: true, description: 'Горная зелень' },
        { id: 6, name: 'Чуду с тыквой', price: 300, old_price: null, weight: '380г', category_id: 2, is_popular: false, is_new: false, is_halal: true, description: 'С тыквой и орехами' },
        { id: 7, name: 'Аварский хинкал', price: 550, old_price: 650, weight: '700г', category_id: 3, is_popular: true, is_new: false, is_halal: true, description: 'С мясом и бульоном' },
        { id: 8, name: 'Даргинский хинкал', price: 520, old_price: null, weight: '650г', category_id: 3, is_popular: false, is_new: false, is_halal: true, description: 'Тестяные шарики' },
        { id: 9, name: 'Пахлава медовая', price: 680, old_price: 780, weight: '500г', category_id: 4, is_popular: true, is_new: false, is_halal: true, description: 'С орехом и мёдом' },
        { id: 10, name: 'Урбеч ассорти', price: 890, old_price: null, weight: '600г', category_id: 4, is_popular: false, is_new: false, is_halal: true, description: '3 вида урбеча' },
        { id: 11, name: 'Халва дагестанская', price: 420, old_price: null, weight: '400г', category_id: 4, is_popular: false, is_new: false, is_halal: true, description: 'Из муки и мёда' },
        { id: 12, name: 'Манты с бараниной', price: 480, old_price: null, weight: '500г', category_id: 5, is_popular: false, is_new: false, is_halal: true, description: 'Ручной лепки' },
        { id: 13, name: 'Долма виноградная', price: 520, old_price: null, weight: '450г', category_id: 5, is_popular: true, is_new: false, is_halal: true, description: 'В виноградных листьях' },
        { id: 14, name: 'Компот из кураги', price: 180, old_price: null, weight: '1л', category_id: 6, is_popular: false, is_new: false, is_halal: true, description: 'Натуральный компот' },
        { id: 15, name: 'Шербет фруктовый', price: 220, old_price: null, weight: '1л', category_id: 6, is_popular: false, is_new: true, is_halal: true, description: 'С горными ягодами' },
    ];

    useEffect(() => {
        // Try API first, fallback to demo data
        Promise.all([
            fetch('/api/v1/categories').then(r => r.json()).catch(() => null),
            fetch('/api/v1/products?per_page=50').then(r => r.json()).catch(() => null),
        ]).then(([catData, prodData]) => {
            setCategories(catData?.length ? [{ id: 0, name: 'Все', slug: 'all', icon: 'UtensilsCrossed' }, ...catData] : fallbackCategories);
            setProducts(prodData?.data?.length ? prodData.data : fallbackProducts);
            setActiveCategory('all');
            setLoading(false);
        });
    }, []);

    const filtered = activeCategory === 'all'
        ? products
        : products.filter(p => p.category_id === categories.find(c => c.slug === activeCategory)?.id);

    const emojis = { 1: '🥟', 2: '🫓', 3: '🍲', 4: '🍯', 5: '❄️', 6: '🥤' };

    return (
        <>
            <style>{`
                .menu-card {
                    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
                }
                .menu-card:hover {
                    transform: translateY(-6px);
                    box-shadow: 0 20px 40px rgba(0,0,0,0.08), 0 0 0 1px rgba(22,163,74,0.1);
                }
                .category-btn {
                    transition: all 0.3s ease;
                }
                .category-btn.active {
                    background: linear-gradient(135deg, #16a34a, #22c55e);
                    color: white;
                    box-shadow: 0 8px 20px rgba(22, 163, 74, 0.3);
                }
                .add-to-cart-btn {
                    transition: all 0.3s ease;
                }
                .add-to-cart-btn:hover {
                    background: linear-gradient(135deg, #16a34a, #22c55e);
                    color: white;
                    box-shadow: 0 8px 20px rgba(22, 163, 74, 0.3);
                    transform: scale(1.05);
                }
            `}</style>

            <section id="menu" className="py-24 lg:py-32 bg-gradient-to-b from-white via-green-50/20 to-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-100 text-green-700 text-sm font-semibold mb-4">
                            <UtensilsCrossed className="w-4 h-4" />
                            Наше меню
                        </span>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-5">
                            Выберите{' '}
                            <span className="bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">
                                любимое блюдо
                            </span>
                        </h2>
                        <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                            Всё приготовлено с любовью по традиционным рецептам горного Дагестана
                        </p>
                    </div>

                    {/* Category Tabs */}
                    <div className="flex flex-wrap justify-center gap-2 mb-12">
                        {categories.map((cat) => {
                            const Icon = iconMap[cat.icon] || UtensilsCrossed;
                            return (
                                <button
                                    key={cat.slug}
                                    onClick={() => setActiveCategory(cat.slug)}
                                    className={`category-btn flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold border ${
                                        activeCategory === cat.slug
                                            ? 'active border-transparent'
                                            : 'border-gray-200 text-gray-600 hover:border-green-300 hover:text-green-700 bg-white'
                                    }`}
                                >
                                    <Icon className="w-4 h-4" />
                                    {cat.name}
                                </button>
                            );
                        })}
                    </div>

                    {/* Products Grid */}
                    <div ref={ref} className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filtered.map((product, i) => (
                            <div
                                key={product.id}
                                className="menu-card bg-white rounded-2xl border border-gray-100 overflow-hidden"
                                style={{
                                    opacity: isVisible ? 1 : 0,
                                    transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                                    transition: `all 0.6s ease ${i * 0.05}s`,
                                }}
                            >
                                {/* Image area */}
                                <div className="relative h-48 bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center">
                                    <span className="text-7xl">{emojis[product.category_id] || '🍽️'}</span>

                                    {/* Badges */}
                                    <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                                        {product.is_popular && (
                                            <span className="px-2.5 py-1 rounded-lg bg-gradient-to-r from-amber-500 to-orange-400 text-white text-[10px] font-bold flex items-center gap-1">
                                                <Star className="w-3 h-3 fill-white" /> Хит
                                            </span>
                                        )}
                                        {product.is_new && (
                                            <span className="px-2.5 py-1 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-400 text-white text-[10px] font-bold">
                                                Новинка
                                            </span>
                                        )}
                                        {product.old_price && (
                                            <span className="px-2.5 py-1 rounded-lg bg-gradient-to-r from-red-500 to-rose-400 text-white text-[10px] font-bold">
                                                -{Math.round(((product.old_price - product.price) / product.old_price) * 100)}%
                                            </span>
                                        )}
                                    </div>

                                    {product.is_halal && (
                                        <span className="absolute top-3 right-3 w-8 h-8 rounded-lg bg-white/90 backdrop-blur flex items-center justify-center text-green-600 text-xs font-bold border border-green-200">
                                            ☪
                                        </span>
                                    )}

                                    {/* Wishlist */}
                                    <button className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors">
                                        <Heart className="w-4 h-4" />
                                    </button>
                                </div>

                                {/* Content */}
                                <div className="p-5">
                                    <p className="text-xs text-gray-400 font-medium mb-1">
                                        {categories.find(c => c.id === product.category_id)?.name}
                                    </p>
                                    <h3 className="text-lg font-bold text-gray-900 mb-1">{product.name}</h3>
                                    <p className="text-sm text-gray-400 mb-4">{product.description} • {product.weight}</p>

                                    <div className="flex items-center justify-between">
                                        <div>
                                            <span className="text-2xl font-extrabold text-green-600">{product.price}₽</span>
                                            {product.old_price && (
                                                <span className="ml-2 text-sm text-gray-300 line-through">{product.old_price}₽</span>
                                            )}
                                        </div>
                                        <button className="add-to-cart-btn flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-green-50 text-green-700 text-sm font-bold border border-green-200">
                                            <Plus className="w-4 h-4" />
                                            В корзину
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}