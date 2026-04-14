import React, { useState, useEffect } from 'react';
import {
    ArrowRight, Play, Shield, Truck, Star, Leaf
} from 'lucide-react';

export default function HeroSection() {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setTimeout(() => setLoaded(true), 100);
    }, []);

    const scrollTo = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    };

    const badges = [
        { icon: Shield, text: '100% Халяль' },
        { icon: Leaf, text: 'Натуральное' },
        { icon: Truck, text: 'Доставка 1 час' },
    ];

    return (
        <>
            <style>{`
                @keyframes float1 {
                    0%, 100% { transform: translate(0, 0) rotate(0deg) scale(1); }
                    33% { transform: translate(30px, -30px) rotate(120deg) scale(1.1); }
                    66% { transform: translate(-20px, 20px) rotate(240deg) scale(0.9); }
                }
                @keyframes float2 {
                    0%, 100% { transform: translate(0, 0) rotate(0deg); }
                    50% { transform: translate(-40px, -20px) rotate(180deg); }
                }
                @keyframes float3 {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    33% { transform: translate(20px, 30px) scale(1.15); }
                    66% { transform: translate(-30px, -10px) scale(0.85); }
                }
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(40px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes fadeInLeft {
                    from { opacity: 0; transform: translateX(-40px); }
                    to { opacity: 1; transform: translateX(0); }
                }
                @keyframes scaleIn {
                    from { opacity: 0; transform: scale(0.8); }
                    to { opacity: 1; transform: scale(1); }
                }
                @keyframes shimmer {
                    0% { background-position: -200% center; }
                    100% { background-position: 200% center; }
                }
                .hero-blob-1 {
                    animation: float1 20s ease-in-out infinite;
                }
                .hero-blob-2 {
                    animation: float2 25s ease-in-out infinite;
                }
                .hero-blob-3 {
                    animation: float3 18s ease-in-out infinite;
                }
                .hero-gradient-text {
                    background: linear-gradient(135deg, #15803d 0%, #16a34a 30%, #22c55e 60%, #15803d 100%);
                    background-size: 200% auto;
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    animation: shimmer 5s linear infinite;
                }
                .hero-cta-glow:hover {
                    box-shadow: 0 20px 40px rgba(22, 163, 74, 0.4), 0 0 80px rgba(22, 163, 74, 0.15);
                }
                .hero-pattern {
                    background-image: radial-gradient(circle at 1px 1px, rgba(22, 163, 74, 0.07) 1px, transparent 0);
                    background-size: 40px 40px;
                }
            `}</style>

            <section className="relative min-h-screen flex items-center overflow-hidden bg-white">
                {/* Background Pattern */}
                <div className="absolute inset-0 hero-pattern" />

                {/* Animated Blobs */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div
                        className="hero-blob-1 absolute -top-40 -right-40 w-96 h-96 rounded-full opacity-20"
                        style={{ background: 'radial-gradient(circle, #22c55e, transparent 70%)' }}
                    />
                    <div
                        className="hero-blob-2 absolute top-1/2 -left-32 w-80 h-80 rounded-full opacity-15"
                        style={{ background: 'radial-gradient(circle, #16a34a, transparent 70%)' }}
                    />
                    <div
                        className="hero-blob-3 absolute bottom-20 right-1/4 w-64 h-64 rounded-full opacity-10"
                        style={{ background: 'radial-gradient(circle, #4ade80, transparent 70%)' }}
                    />

                    {/* Decorative geometric shapes */}
                    <div className="hero-blob-1 absolute top-1/4 right-1/3 w-4 h-4 rounded-full bg-green-400 opacity-30" />
                    <div className="hero-blob-2 absolute top-2/3 left-1/4 w-3 h-3 rounded-full bg-emerald-400 opacity-25" />
                    <div className="hero-blob-3 absolute top-1/3 left-2/3 w-2 h-2 rounded-full bg-green-500 opacity-35" />
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 lg:py-40">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                        {/* Left Content */}
                        <div>
                            {/* Trust badges */}
                            <div
                                className="flex flex-wrap gap-3 mb-8"
                                style={{
                                    opacity: loaded ? 1 : 0,
                                    transform: loaded ? 'translateY(0)' : 'translateY(30px)',
                                    transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s',
                                }}
                            >
                                {badges.map((badge, i) => (
                                    <span
                                        key={i}
                                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-green-50 border border-green-200 text-green-700 text-xs font-semibold"
                                        style={{
                                            opacity: loaded ? 1 : 0,
                                            transform: loaded ? 'translateY(0)' : 'translateY(20px)',
                                            transition: `all 0.6s ease ${0.2 + i * 0.1}s`,
                                        }}
                                    >
                                        <badge.icon className="w-3.5 h-3.5" />
                                        {badge.text}
                                    </span>
                                ))}
                            </div>

                            {/* Main Heading */}
                            <h1
                                className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-tight mb-6"
                                style={{
                                    opacity: loaded ? 1 : 0,
                                    transform: loaded ? 'translateY(0)' : 'translateY(40px)',
                                    transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.3s',
                                }}
                            >
                                <span className="text-gray-900">Вкус </span>
                                <span className="hero-gradient-text">Дагестана</span>
                                <br />
                                <span className="text-gray-900">к вашему </span>
                                <span className="hero-gradient-text">столу</span>
                            </h1>

                            {/* Subtitle */}
                            <p
                                className="text-lg sm:text-xl text-gray-500 max-w-lg mb-10 leading-relaxed"
                                style={{
                                    opacity: loaded ? 1 : 0,
                                    transform: loaded ? 'translateY(0)' : 'translateY(30px)',
                                    transition: 'all 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.5s',
                                }}
                            >
                                Доставляем свежие <span className="text-green-600 font-semibold">халяль</span> полуфабрикаты
                                и кондитерские изделия ручной работы. Курзе, чуду, хинкал и пахлава — прямо из горного аула.
                            </p>

                            {/* CTA Buttons */}
                            <div
                                className="flex flex-col sm:flex-row gap-4"
                                style={{
                                    opacity: loaded ? 1 : 0,
                                    transform: loaded ? 'translateY(0)' : 'translateY(30px)',
                                    transition: 'all 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.7s',
                                }}
                            >
                                <button
                                    onClick={() => scrollTo('menu')}
                                    className="hero-cta-glow group flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-gradient-to-r from-green-600 to-emerald-500 text-white text-lg font-bold shadow-xl shadow-green-500/25 hover:scale-105 active:scale-95 transition-all duration-300"
                                >
                                    Смотреть меню
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </button>
                                <button
                                    onClick={() => scrollTo('how-it-works')}
                                    className="group flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl border-2 border-green-200 text-green-700 text-lg font-bold hover:border-green-400 hover:bg-green-50 transition-all duration-300"
                                >
                                    <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                    Как это работает
                                </button>
                            </div>

                            {/* Social proof */}
                            <div
                                className="mt-10 flex items-center gap-4"
                                style={{
                                    opacity: loaded ? 1 : 0,
                                    transform: loaded ? 'translateY(0)' : 'translateY(20px)',
                                    transition: 'all 0.8s ease 0.9s',
                                }}
                            >
                                <div className="flex -space-x-3">
                                    {['МА', 'РК', 'ПД', 'АГ'].map((initials, i) => (
                                        <div
                                            key={i}
                                            className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center text-xs font-bold text-white"
                                            style={{
                                                background: [
                                                    'linear-gradient(135deg, #16a34a, #22c55e)',
                                                    'linear-gradient(135deg, #059669, #10b981)',
                                                    'linear-gradient(135deg, #15803d, #4ade80)',
                                                    'linear-gradient(135deg, #166534, #22c55e)',
                                                ][i],
                                            }}
                                        >
                                            {initials}
                                        </div>
                                    ))}
                                </div>
                                <div>
                                    <div className="flex items-center gap-1">
                                        {[1, 2, 3, 4, 5].map((s) => (
                                            <Star key={s} className="w-4 h-4 fill-amber-400 text-amber-400" />
                                        ))}
                                        <span className="text-sm font-bold text-gray-800 ml-1">4.9</span>
                                    </div>
                                    <p className="text-sm text-gray-400">2,400+ довольных клиентов</p>
                                </div>
                            </div>
                        </div>

                        {/* Right — Visual Card */}
                        <div
                            className="relative hidden lg:block"
                            style={{
                                opacity: loaded ? 1 : 0,
                                transform: loaded ? 'scale(1)' : 'scale(0.85)',
                                transition: 'all 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.4s',
                            }}
                        >
                            <div className="relative">
                                {/* Main Visual Card */}
                                <div
                                    className="relative rounded-3xl overflow-hidden"
                                    style={{
                                        background: 'linear-gradient(145deg, rgba(22,163,74,0.05), rgba(34,197,94,0.1))',
                                        padding: '3px',
                                    }}
                                >
                                    <div className="rounded-3xl bg-white p-8 lg:p-10">
                                        {/* Stylized food illustration using emojis and design */}
                                        <div className="grid grid-cols-2 gap-4">
                                            {[
                                                { emoji: '🥟', name: 'Курзе', price: '450₽', tag: 'Хит' },
                                                { emoji: '🫓', name: 'Чуду', price: '320₽', tag: 'Новинка' },
                                                { emoji: '🍲', name: 'Хинкал', price: '550₽', tag: 'Популярно' },
                                                { emoji: '🍯', name: 'Пахлава', price: '680₽', tag: '-12%' },
                                            ].map((item, i) => (
                                                <div
                                                    key={i}
                                                    className="group relative p-5 rounded-2xl border border-green-100 hover:border-green-300 hover:shadow-lg hover:shadow-green-500/10 transition-all duration-300 cursor-pointer"
                                                    style={{
                                                        opacity: loaded ? 1 : 0,
                                                        transform: loaded ? 'translateY(0)' : 'translateY(20px)',
                                                        transition: `all 0.6s ease ${0.8 + i * 0.15}s`,
                                                    }}
                                                >
                                                    <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-[10px] font-bold">
                                                        {item.tag}
                                                    </span>
                                                    <span className="text-4xl block mb-3 group-hover:scale-110 transition-transform">
                                                        {item.emoji}
                                                    </span>
                                                    <p className="text-sm font-bold text-gray-800">{item.name}</p>
                                                    <p className="text-lg font-extrabold text-green-600">{item.price}</p>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Bottom info */}
                                        <div className="mt-6 flex items-center justify-between p-4 rounded-xl bg-green-50">
                                            <div className="flex items-center gap-2">
                                                <Truck className="w-5 h-5 text-green-600" />
                                                <span className="text-sm font-medium text-green-800">Бесплатная доставка от 2000₽</span>
                                            </div>
                                            <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded-lg">
                                                ~45 мин
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Floating badge */}
                                <div
                                    className="absolute -top-4 -left-4 px-4 py-2 rounded-2xl bg-white shadow-xl border border-green-100"
                                    style={{
                                        opacity: loaded ? 1 : 0,
                                        transform: loaded ? 'translate(0)' : 'translate(-20px, -20px)',
                                        transition: 'all 0.8s ease 1.2s',
                                    }}
                                >
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-emerald-400 flex items-center justify-center">
                                            <Shield className="w-4 h-4 text-white" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-gray-800">Халяль</p>
                                            <p className="text-[10px] text-gray-400">Сертифицировано</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Floating delivery badge */}
                                <div
                                    className="absolute -bottom-4 -right-4 px-4 py-2 rounded-2xl bg-white shadow-xl border border-green-100"
                                    style={{
                                        opacity: loaded ? 1 : 0,
                                        transform: loaded ? 'translate(0)' : 'translate(20px, 20px)',
                                        transition: 'all 0.8s ease 1.4s',
                                    }}
                                >
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-orange-400 flex items-center justify-center">
                                            <Star className="w-4 h-4 text-white fill-white" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-gray-800">4.9 рейтинг</p>
                                            <p className="text-[10px] text-gray-400">2400+ отзывов</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom gradient line */}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-300 to-transparent" />
            </section>
        </>
    );
}