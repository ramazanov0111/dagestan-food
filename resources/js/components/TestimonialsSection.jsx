import React from 'react';
import { Star, Quote, MessageSquare } from 'lucide-react';
import { useStaggerAnimation } from './hooks/useScrollAnimation';

const testimonials = [
    {
        name: 'Мадина К.',
        role: 'Постоянный клиент',
        content: 'Курзе как у бабушки в ауле! Тесто тоненькое, мяса много. Заказываю каждую неделю на семью, дети обожают. Доставка всегда вовремя.',
        rating: 5,
        initials: 'МК',
        gradient: 'from-green-500 to-emerald-400',
    },
    {
        name: 'Ахмед Г.',
        role: 'Ресторатор',
        content: 'Для своего кафе заказываю полуфабрикаты оптом. Качество стабильное, все халяль сертифицировано. Хинкал — вообще бомба!',
        rating: 5,
        initials: 'АГ',
        gradient: 'from-amber-500 to-orange-400',
    },
    {
        name: 'Патимат М.',
        role: 'Мама троих детей',
        content: 'Спасибо, что есть такой сервис! Работаю допоздна, а дома всегда есть вкусный халяль ужин. Пахлава — отдельная песня, тает во рту!',
        rating: 5,
        initials: 'ПМ',
        gradient: 'from-purple-500 to-violet-400',
    },
    {
        name: 'Расул А.',
        role: 'Предприниматель',
        content: 'Живу в Москве, скучаю по домашней кухне. Эти ребята делают всё по-настоящему, вкус Дагестана в каждом блюде.',
        rating: 4,
        initials: 'РА',
        gradient: 'from-blue-500 to-indigo-400',
    },
    {
        name: 'Зарема Ш.',
        role: 'Домохозяйка',
        content: 'Чуду с зеленью — невероятное! Тонкое, с хрустящей корочкой. А урбеч — натуральный, без добавок.',
        rating: 5,
        initials: 'ЗШ',
        gradient: 'from-rose-500 to-pink-400',
    },
    {
        name: 'Магомед И.',
        role: 'Спортсмен',
        content: 'Важно, что всё халяль и натуральное. Никакой химии. Манты огромные и сочные. Рекомендую всем!',
        rating: 5,
        initials: 'МИ',
        gradient: 'from-teal-500 to-cyan-400',
    },
];

export default function TestimonialsSection() {
    const [ref, visibleItems] = useStaggerAnimation(testimonials.length, 0.1, 100);

    return (
        <>
            <style>{`
                .testimonial-card {
                    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
                }
                .testimonial-card:hover {
                    transform: translateY(-4px) scale(1.02);
                    box-shadow: 0 20px 40px rgba(0,0,0,0.06);
                }
            `}</style>

            <section id="testimonials" className="py-24 lg:py-32 bg-gradient-to-b from-white via-green-50/20 to-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="text-center mb-16 lg:mb-20">
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-100 text-green-700 text-sm font-semibold mb-4">
                            <MessageSquare className="w-4 h-4" />
                            Отзывы
                        </span>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-5">
                            Что говорят{' '}
                            <span className="bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">
                                наши клиенты
                            </span>
                        </h2>
                        <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                            Каждый отзыв — это история о вкусе Дагестана, доставленном прямо к столу
                        </p>
                    </div>

                    {/* Grid */}
                    <div ref={ref} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                        {testimonials.map((t, i) => (
                            <div
                                key={i}
                                className="testimonial-card bg-white rounded-2xl border border-gray-100 p-7 relative"
                                style={{
                                    opacity: visibleItems.has(i) ? 1 : 0,
                                    transform: visibleItems.has(i) ? 'translateY(0)' : 'translateY(40px)',
                                    transition: 'all 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
                                }}
                            >
                                {/* Quote icon */}
                                <Quote className="w-8 h-8 text-green-200 mb-4" />

                                {/* Stars */}
                                <div className="flex items-center gap-0.5 mb-4">
                                    {[...Array(5)].map((_, s) => (
                                        <Star
                                            key={s}
                                            className={`w-4 h-4 ${s < t.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-200'}`}
                                        />
                                    ))}
                                </div>

                                {/* Content */}
                                <p className="text-gray-600 leading-relaxed mb-6 text-sm">
                                    "{t.content}"
                                </p>

                                {/* Author */}
                                <div className="flex items-center gap-3 pt-4 border-t border-gray-50">
                                    <div
                                        className={`w-11 h-11 rounded-full bg-gradient-to-br ${t.gradient} flex items-center justify-center text-white text-sm font-bold shadow-lg`}
                                    >
                                        {t.initials}
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-gray-900">{t.name}</p>
                                        <p className="text-xs text-gray-400">{t.role}</p>
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