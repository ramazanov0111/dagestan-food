import React from 'react';
import {
    UtensilsCrossed, Phone, Mail, MapPin,
    Instagram, MessageCircle, Send, Heart
} from 'lucide-react';

const footerLinks = {
    'Меню': [
        { label: 'Курзе', href: '#menu' },
        { label: 'Чуду', href: '#menu' },
        { label: 'Хинкал', href: '#menu' },
        { label: 'Кондитерка', href: '#menu' },
        { label: 'Полуфабрикаты', href: '#menu' },
    ],
    'Компания': [
        { label: 'О нас', href: '#features' },
        { label: 'Доставка', href: '#how-it-works' },
        { label: 'Отзывы', href: '#testimonials' },
        { label: 'Халяль сертификат', href: '#' },
        { label: 'Контакты', href: '#footer' },
    ],
    'Клиентам': [
        { label: 'Как заказать', href: '#how-it-works' },
        { label: 'Оплата', href: '#' },
        { label: 'Подписка', href: '#pricing' },
        { label: 'Частые вопросы', href: '#' },
        { label: 'Возврат', href: '#' },
    ],
    'Контакты': [
        { label: '+7 (900) 123-45-67', href: 'tel:+79001234567', icon: Phone },
        { label: 'info@dageda.ru', href: 'mailto:info@dageda.ru', icon: Mail },
        { label: 'г. Махачкала, ул. Ленина 1', href: '#', icon: MapPin },
    ],
};

const socials = [
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: MessageCircle, href: '#', label: 'WhatsApp' },
    { icon: Send, href: '#', label: 'Telegram' },
];

export default function Footer() {
    const scrollTo = (id) => {
        const el = document.querySelector(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <footer id="footer" className="bg-gray-50 border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-12">
                    {/* Brand */}
                    <div className="col-span-2 md:col-span-3 lg:col-span-1">
                        <div className="flex items-center gap-2.5 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-600 to-emerald-500 flex items-center justify-center shadow-lg shadow-green-500/30">
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
                        </div>
                        <p className="text-sm text-gray-500 leading-relaxed mb-5 max-w-xs">
                            Доставляем свежие халяль полуфабрикаты и кондитерские изделия ручной работы по рецептам горного Дагестана.
                        </p>
                        <div className="flex items-center gap-2">
                            {socials.map((social, i) => (
                                <a
                                    key={i}
                                    href={social.href}
                                    aria-label={social.label}
                                    className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-400 hover:text-green-600 hover:border-green-300 hover:shadow-md transition-all"
                                >
                                    <social.icon className="w-4 h-4" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links */}
                    {Object.entries(footerLinks).map(([title, links]) => (
                        <div key={title}>
                            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">{title}</h3>
                            <ul className="space-y-2.5">
                                {links.map((link, i) => (
                                    <li key={i}>
                                        <a
                                            href={link.href}
                                            onClick={(e) => {
                                                if (link.href.startsWith('#')) {
                                                    e.preventDefault();
                                                    scrollTo(link.href);
                                                }
                                            }}
                                            className="flex items-center gap-2 text-sm text-gray-500 hover:text-green-600 transition-colors"
                                        >
                                            {link.icon && <link.icon className="w-3.5 h-3.5 flex-shrink-0" />}
                                            {link.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                        <p className="text-sm text-gray-400">
                            © {new Date().getFullYear()} ДагЕда. Все права защищены.
                        </p>
                        <p className="flex items-center gap-1 text-sm text-gray-400">
                            Сделано с <Heart className="w-3.5 h-3.5 text-red-400 fill-red-400" /> в Дагестане
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}