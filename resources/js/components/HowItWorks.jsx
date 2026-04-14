import React from 'react';
import { Smartphone, ChefHat, Truck, Check } from 'lucide-react';
import { useStaggerAnimation } from './hooks/useScrollAnimation';

const steps = [
    {
        icon: Smartphone,
        title: 'Выберите блюда',
        desc: 'Откройте наше меню и выберите любимые блюда дагестанской кухни. Укажите количество и добавьте в корзину.',
        gradient: 'from-green-500 to-emerald-400',
    },
    {
        icon: ChefHat,
        title: 'Мы готовим',
        desc: 'Наши мастера бережно упакуют свежие полуфабрикаты. Всё халяль, натуральное и ручной работы.',
        gradient: 'from-amber-500 to-orange-400',
    },
    {
        icon: Truck,
        title: 'Доставляем вам',
        desc: 'Курьер привезёт заказ в термосумке. Среднее время доставки — 45 минут по городу.',
        gradient: 'from-blue-500 to-indigo-400',
    },
];

export default function HowItWorks() {
    const [ref, visibleItems] = useStaggerAnimation(steps.length, 0.15, 200);

    return (
        <>
            <style>{`
                .step-card {
                    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
                }
                .step-card:hover {
                    transform: translateY(-4px);
                }
                .step-connector {
                    background: linear-gradient(90deg, #22c55e, #16a34a);
                }
            `}</style>

            <section id="how-it-works" className="py-24 lg:py-32 bg-white relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="text-center mb-16 lg:mb-20">
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-100 text-green-700 text-sm font-semibold mb-4">
                            <Check className="w-4 h-4" />
                            Просто как раз-два-три
                        </span>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-5">
                            Как{' '}
                            <span className="bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">
                                заказать
                            </span>
                        </h2>
                        <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                            Три простых шага от заказа до горячего ужина на вашем столе
                        </p>
                    </div>

                    {/* Steps */}
                    <div ref={ref} className="grid lg:grid-cols-3 gap-8 lg:gap-6 relative">
                        {/* Connector lines (desktop) */}
                        <div className="hidden lg:block absolute top-24 left-1/3 right-1/3 h-0.5 step-connector opacity-30 rounded-full" />

                        {steps.map((step, i) => (
                            <div
                                key={i}
                                className="step-card relative text-center p-8 lg:p-10 rounded-2xl border border-gray-100 bg-white hover:shadow-xl hover:shadow-green-500/5"
                                style={{
                                    opacity: visibleItems.has(i) ? 1 : 0,
                                    transform: visibleItems.has(i) ? 'translateY(0)' : 'translateY(50px)',
                                    transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                                }}
                            >
                                {/* Step Number */}
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${step.gradient} flex items-center justify-center text-white text-lg font-black shadow-lg`}>
                                        {i + 1}
                                    </div>
                                </div>

                                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center mx-auto mb-6 mt-4 shadow-xl`}>
                                    <step.icon className="w-10 h-10 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                                <p className="text-gray-500 leading-relaxed">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}