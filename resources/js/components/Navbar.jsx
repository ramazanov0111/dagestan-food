import React, { useState, useEffect } from 'react';
import {
    UtensilsCrossed, Menu, X, ShoppingCart, Phone, ChevronDown
} from 'lucide-react';

export default function Navbar({ cartCount = 0 }) {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        document.body.style.overflow = mobileOpen ? 'hidden' : '';
    }, [mobileOpen]);

    const scrollTo = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        setMobileOpen(false);
    };

    const links = [
        { label: 'Меню', id: 'menu' },
        { label: 'О нас', id: 'features' },
        { label: 'Как заказать', id: 'how-it-works' },
        { label: 'Отзывы', id: 'testimonials' },
        { label: 'Наборы', id: 'pricing' },
        { label: 'Контакты', id: 'footer' },
    ];

    return (
        <>
            <style>{`
                .nav-glass {
                    backdrop-filter: blur(20px);
                    -webkit-backdrop-filter: blur(20px);
                }
                .nav-link-hover::after {
                    content: '';
                    position: absolute;
                    bottom: -2px;
                    left: 50%;
                    width: 0;
                    height: 2px;
                    background: linear-gradient(135deg, #16a34a, #22c55e);
                    transition: all 0.3s ease;
                    transform: translateX(-50%);
                }
                .nav-link-hover:hover::after {
                    width: 100%;
                }
                .mobile-drawer {
                    transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
                }
                .mobile-drawer.closed {
                    transform: translateX(100%);
                }
                .mobile-drawer.open {
                    transform: translateX(0);
                }
                .cart-badge {
                    animation: cartPulse 0.3s ease;
                }
                @keyframes cartPulse {
                    0% { transform: scale(1); }
                    50% { transform: scale(1.3); }
                    100% { transform: scale(1); }
                }
            `}</style>

            <nav
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
                    scrolled
                        ? 'nav-glass bg-white/90 shadow-lg shadow-green-900/5 py-3'
                        : 'bg-transparent py-5'
                }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <button
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                            className="flex items-center gap-2.5 group"
                        >
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-600 to-emerald-500 flex items-center justify-center shadow-lg shadow-green-500/30 group-hover:shadow-green-500/50 transition-shadow">
                                <UtensilsCrossed className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <span className="text-xl font-bold bg-gradient-to-r from-green-700 to-emerald-600 bg-clip-text text-transparent">
                                    ДагЕда
                                </span>
                                <span className="block text-[10px] text-gray-400 -mt-1 tracking-wider uppercase">
                                    Халяль доставка
                                </span>
                            </div>
                        </button>

                        {/* Desktop Links */}
                        <div className="hidden lg:flex items-center gap-1">
                            {links.map((link) => (
                                <button
                                    key={link.id}
                                    onClick={() => scrollTo(link.id)}
                                    className="relative px-4 py-2 text-sm font-medium text-gray-600 hover:text-green-700 transition-colors nav-link-hover"
                                >
                                    {link.label}
                                </button>
                            ))}
                        </div>

                        {/* Right Side */}
                        <div className="flex items-center gap-3">
                            <a
                                href="tel:+79001234567"
                                className="hidden md:flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-green-700 transition-colors"
                            >
                                <Phone className="w-4 h-4" />
                                <span>+7 (900) 123-45-67</span>
                            </a>

                            <button className="relative p-2.5 rounded-xl bg-green-50 text-green-700 hover:bg-green-100 transition-colors">
                                <ShoppingCart className="w-5 h-5" />
                                {cartCount > 0 && (
                                    <span className="cart-badge absolute -top-1 -right-1 w-5 h-5 rounded-full bg-gradient-to-r from-green-600 to-emerald-500 text-white text-xs flex items-center justify-center font-bold">
                                        {cartCount}
                                    </span>
                                )}
                            </button>

                            <button
                                onClick={() => scrollTo('menu')}
                                className="hidden sm:flex px-5 py-2.5 rounded-xl bg-gradient-to-r from-green-600 to-emerald-500 text-white text-sm font-semibold hover:shadow-lg hover:shadow-green-500/30 hover:scale-105 transition-all active:scale-95"
                            >
                                Заказать
                            </button>

                            {/* Mobile burger */}
                            <button
                                onClick={() => setMobileOpen(!mobileOpen)}
                                className="lg:hidden p-2 rounded-xl text-gray-600 hover:bg-green-50 transition-colors"
                            >
                                {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Drawer */}
            {mobileOpen && (
                <div className="fixed inset-0 z-40 lg:hidden">
                    <div
                        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                        onClick={() => setMobileOpen(false)}
                    />
                    <div className={`mobile-drawer absolute right-0 top-0 bottom-0 w-80 max-w-[85vw] bg-white shadow-2xl ${mobileOpen ? 'open' : 'closed'}`}>
                        <div className="p-6 pt-20">
                            <div className="space-y-1">
                                {links.map((link, i) => (
                                    <button
                                        key={link.id}
                                        onClick={() => scrollTo(link.id)}
                                        className="w-full text-left px-4 py-3.5 rounded-xl text-gray-700 hover:bg-green-50 hover:text-green-700 font-medium transition-all"
                                        style={{
                                            opacity: mobileOpen ? 1 : 0,
                                            transform: mobileOpen ? 'translateX(0)' : 'translateX(20px)',
                                            transition: `all 0.3s ease ${i * 0.05 + 0.1}s`,
                                        }}
                                    >
                                        {link.label}
                                    </button>
                                ))}
                            </div>

                            <div className="mt-8 space-y-3">
                                <a
                                    href="tel:+79001234567"
                                    className="flex items-center justify-center gap-2 w-full px-5 py-3 rounded-xl border-2 border-green-200 text-green-700 font-semibold hover:bg-green-50 transition-colors"
                                >
                                    <Phone className="w-4 h-4" />
                                    Позвонить
                                </a>
                                <button
                                    onClick={() => scrollTo('menu')}
                                    className="w-full px-5 py-3 rounded-xl bg-gradient-to-r from-green-600 to-emerald-500 text-white font-semibold shadow-lg shadow-green-500/30"
                                >
                                    Заказать сейчас
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}