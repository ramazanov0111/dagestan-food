import React from 'react';
import {
    Shield, Truck, Clock, Heart, Leaf, Award
} from 'lucide-react';
import { useStaggerAnimation } from './hooks/useScrollAnimation';

const features = [
    {
        icon: Shield,
        title: 'Сертификат Халяль',
        desc: 'Все продукты имеют сертификат халяль. Используем только дозволенные ингредиенты и соблюдаем все требования.',
        gradient: 'from-green-500 to-emerald-400',
    },
    {
        icon: Heart,
        title: 'Ручная работа',
        desc: 'Каждое изделие лепится вручную по старинным семейным рецептам. Никаких фабричных заготовок.',
        gradient: 'from-rose-500 to-pink-400',
    },
    {
        icon: Leaf,
        title: '100% натурально',
        desc: 'Только свежее мясо, фермерский творог, горные травы. Без консервантов, красителей и усилителей.',
        gradient: 'from-teal-500 to-cyan-400',
    },
    {
        icon: Truck,
        title: 'Быстрая доставка',
        desc: 'Доставим ваш заказ в течение 60 минут. Бесплатная доставка при заказе от 2000₽.',
        gradient: 'from-blue-500 to-indigo-400',
    },
    {
        icon: Clock,
        title: 'Готово за 15 минут',
        desc: 'Наши полуфабрикаты готовятся за 15 минут. Домашний ужин без лишних хлопот.',
        gradient: 'from-amber-500 to-orange-400',
    },
    {
        icon: Award,
        title: 'Гарантия качества',
        desc: 'Если блюдо не понравится — вернём деньги без вопросов. Мы уверены в каждом продукте.',
        gradient: 'from-purple-500 to-violet-400',
    },
];

export default function FeaturesSection() {
    const [ref, visibleItems] = useStaggerAnimation(features.length, 0.1, 120);

    return (
        <>
            <style>{`
                .feature-card {
                    background: rgba(255, 255, 255, 0.8);
                    backdrop-filter: blur(20px);
                    -webkit-backdrop-filter: blur(20px);
                    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
                }
                .feature-card:hover {
                    transform: translateY(-6px) scale(1.02);
                    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(22, 163, 74, 0.15);
                }
                .feature-icon-wrap {
                    transition: all 0.4s ease;
                }
                .feature-card:hover .feature-icon-wrap {
                    transform: scale(1.1) rotate(-5deg);
                    box-shadow: 0 10px 30px rgba(22, 163, 74, 0.3);
                }
            `}</style>

            <section id="features" className="py-24 lg:py-32 bg-gradient-to-b from-white via-green-50/30 to-white relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="text-center mb-16 lg:mb-20">
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-100 text-green-700 text-sm font-semibold mb-4">
                            <Leaf className="w-4 h-4" />
                            Почему мы
                        </span>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-5">
                            Наши{' '}
                            <span className="bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">
                                преимущества
                            </span>
                        </h2>
                        <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                            Мы сочетаем многовековые традиции дагестанской кухни с современными стандартами качества
                        </p>
                    </div>

                    {/* Cards Grid */}
                    <div ref={ref} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                        {features.map((feature, i) => (
                            <div
                                key={i}
                                className="feature-card rounded-2xl border border-gray-100 p-7 lg:p-8"
                                style={{
                                    opacity: visibleItems.has(i) ? 1 : 0,
                                    transform: visibleItems.has(i) ? 'translateY(0)' : 'translateY(40px)',
                                    transition: `all 0.7s cubic-bezier(0.16, 1, 0.3, 1)`,
                                }}
                            >
                                <div
                                    className={`feature-icon-wrap w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-5 shadow-lg`}
                                >
                                    <feature.icon className="w-7 h-7 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                                <p className="text-gray-500 leading-relaxed">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}