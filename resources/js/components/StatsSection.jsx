import React from 'react';
import { useScrollAnimation } from './hooks/useScrollAnimation';
import { useCounter } from './hooks/useCounter';

const stats = [
    { value: 2400, suffix: '+', label: 'Довольных клиентов', desc: 'и число растёт каждый день' },
    { value: 50, suffix: '+', label: 'Блюд в меню', desc: 'традиционные рецепты' },
    { value: 45, suffix: 'мин', label: 'Среднее время доставки', desc: 'по Махачкале и окрестностям' },
    { value: 99, suffix: '%', label: 'Положительных отзывов', desc: 'клиенты возвращаются снова' },
];

function StatItem({ stat, isVisible }) {
    const count = useCounter(stat.value, 2000, isVisible);

    return (
        <div className="text-center p-6">
            <div className="text-4xl sm:text-5xl lg:text-6xl font-black bg-gradient-to-r from-green-600 to-emerald-400 bg-clip-text text-transparent mb-2">
                {count}{stat.suffix}
            </div>
            <div className="text-lg font-bold text-gray-800 mb-1">{stat.label}</div>
            <div className="text-sm text-gray-400">{stat.desc}</div>
        </div>
    );
}

export default function StatsSection() {
    const [ref, isVisible] = useScrollAnimation(0.2);

    return (
        <section className="py-20 lg:py-28 relative overflow-hidden">
            {/* Top gradient divider */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-green-400 to-transparent opacity-30" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div
                    ref={ref}
                    className="relative rounded-3xl bg-gradient-to-br from-green-600 via-emerald-600 to-green-700 p-1"
                    style={{
                        opacity: isVisible ? 1 : 0,
                        transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
                        transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                >
                    <div className="rounded-3xl bg-white p-8 lg:p-12">
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 divide-y lg:divide-y-0 lg:divide-x divide-gray-100">
                            {stats.map((stat, i) => (
                                <StatItem key={i} stat={stat} isVisible={isVisible} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom gradient divider */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-green-400 to-transparent opacity-30" />
        </section>
    );
}