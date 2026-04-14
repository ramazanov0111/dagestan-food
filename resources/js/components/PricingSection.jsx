import React, { useState } from 'react';
import { Check, X, Star, Package, Zap } from 'lucide-react';
import { useScrollAnimation } from './hooks/useScrollAnimation';

const plans = [
    {
        name: 'Семейный',
        desc: 'Для небольшой семьи на неделю',
        monthly: 2490,
        yearly: 2090,
        badge: null,
        gradient: 'from-gray-100 to-gray-50',
        borderHover: 'hover:border-green-300',
        features: [
            { text: '5 видов полуфабрикатов', included: true },
            { text: 'Порции на 2-3 человека', included: true },
            { text: 'Бесплатная доставка', included: true },
            { text: 'Халяль сертификат', included: true },
            { text: 'Кондитерские изделия', included: false },
            { text: 'Персональный менеджер', included: false },
        ],
    },
    {
        name: 'Популярный',
        desc: 'Полный набор для всей семьи',
        monthly: 4490,
        yearly: 3790,
        badge: 'Хит продаж',
        gradient: 'from-green-600 to-emerald-500',
        borderHover: '',
        popular: true,
        features: [
            { text: '10 видов полуфабрикатов', included: true },
            { text: 'Порции на 4-5 человек', included: true },
            { text: 'Бесплатная доставка', included: true },
            { text: 'Халяль сертификат', included: true },
            { text: 'Кондитерские изделия', included: true },
            { text: 'Персональный менеджер', included: false },
        ],
    },
    {
        name: 'Премиум',
        desc: 'Максимум вкуса + кондитерка',
        monthly: 7990,
        yearly: 6790,
        badge: null,
        gradient: 'from-gray-100 to-gray-50',
        borderHover: 'hover:border-green-300',
        features: [
            { text: '15+ видов полуфабрикатов', included: true },
            { text: 'Порции на 6+ человек', included: true },
            { text: 'Бесплатная доставка', included: true },
            { text: 'Халяль сертификат', included: true },
            { text: 'Кондитерские + урбеч', included: true },
            { text: 'Персональный менеджер', included: true },
        ],
    },
];

export default function PricingSection() {
    const [annual, setAnnual] = useState(false);
    const [ref, isVisible] = useScrollAnimation(0.1);

    return (
        <>
            <style>{`
                .pricing-card {
                    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
                }
                .pricing-card:hover {
                    transform: translateY(-6px);
                }
                .pricing-card.popular {
                    transform: scale(1.05);
                    z-index: 10;
                }
                .pricing-card.popular:hover {
                    transform: scale(1.08) translateY(-4px);
                }
                .pricing-toggle {
                    transition: all 0.3s ease;
                }
            `}</style>

            <section id="pricing" className="py-24 lg:py-32 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-100 text-green-700 text-sm font-semibold mb-4">
                            <Package className="w-4 h-4" />
                            Готовые наборы
                        </span>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-5">
                            Еженедельные{' '}
                            <span className="bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">
                                наборы
                            </span>
                        </h2>
                        <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-8">
                            Подписка на еженедельную доставку свежих полуфабрикатов со скидкой
                        </p>

                        {/* Toggle */}
                        <div className="flex items-center justify-center gap-4">
                            <span className={`text-sm font-semibold ${!annual ? 'text-gray-900' : 'text-gray-400'}`}>
                                Еженедельно
                            </span>
                            <button
                                onClick={() => setAnnual(!annual)}
                                className={`relative w-14 h-7 rounded-full transition-colors ${
                                    annual ? 'bg-gradient-to-r from-green-500 to-emerald-400' : 'bg-gray-200'
                                }`}
                            >
                                <span
                                    className={`absolute top-0.5 w-6 h-6 rounded-full bg-white shadow-md pricing-toggle ${
                                        annual ? 'left-7' : 'left-0.5'
                                    }`}
                                />
                            </button>
                            <span className={`text-sm font-semibold ${annual ? 'text-gray-900' : 'text-gray-400'}`}>
                                Ежемесячно
                            </span>
                            {annual && (
                                <span className="px-2.5 py-1 rounded-lg bg-green-100 text-green-700 text-xs font-bold">
                                    -15%
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Cards */}
                    <div ref={ref} className="grid lg:grid-cols-3 gap-6 lg:gap-4 items-start max-w-5xl mx-auto">
                        {plans.map((plan, i) => (
                            <div
                                key={i}
                                className={`pricing-card relative rounded-2xl ${plan.popular ? 'popular' : ''}`}
                                style={{
                                    opacity: isVisible ? 1 : 0,
                                    transform: isVisible
                                        ? plan.popular ? 'scale(1.05)' : 'translateY(0)'
                                        : 'translateY(40px)',
                                    transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.15}s`,
                                }}
                            >
                                {plan.badge && (
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-green-600 to-emerald-500 text-white text-xs font-bold shadow-lg shadow-green-500/30 z-10">
                                        ⭐ {plan.badge}
                                    </div>
                                )}

                                <div
                                    className={`h-full rounded-2xl border-2 p-8 ${
                                        plan.popular
                                            ? 'border-green-400 bg-white shadow-2xl shadow-green-500/10'
                                            : `border-gray-100 bg-white ${plan.borderHover} hover:shadow-xl`
                                    }`}
                                >
                                    <h3 className="text-xl font-bold text-gray-900 mb-1">{plan.name}</h3>
                                    <p className="text-sm text-gray-400 mb-6">{plan.desc}</p>

                                    <div className="mb-8">
                                        <span className="text-4xl font-black text-gray-900">
                                            {annual ? plan.yearly : plan.monthly}₽
                                        </span>
                                        <span className="text-gray-400 text-sm ml-1">
                                            /{annual ? 'мес' : 'нед'}
                                        </span>
                                        {annual && plan.monthly && (
                                            <p className="text-sm text-green-600 font-medium mt-1">
                                                Экономия {(plan.monthly * 4 - plan.yearly).toLocaleString()}₽/мес
                                            </p>
                                        )}
                                    </div>

                                    <ul className="space-y-3 mb-8">
                                        {plan.features.map((f, fi) => (
                                            <li key={fi} className="flex items-center gap-3">
                                                {f.included ? (
                                                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                                                        <Check className="w-3 h-3 text-green-600" />
                                                    </div>
                                                ) : (
                                                    <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                                                        <X className="w-3 h-3 text-gray-300" />
                                                    </div>
                                                )}
                                                <span className={`text-sm ${f.included ? 'text-gray-700' : 'text-gray-300'}`}>
                                                    {f.text}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>

                                    <button
                                        className={`w-full py-3.5 rounded-xl text-sm font-bold transition-all duration-300 ${
                                            plan.popular
                                                ? 'bg-gradient-to-r from-green-600 to-emerald-500 text-white shadow-lg shadow-green-500/25 hover:shadow-green-500/40 hover:scale-105'
                                                : 'bg-green-50 text-green-700 border border-green-200 hover:bg-green-100 hover:scale-105'
                                        }`}
                                    >
                                        Выбрать набор
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}