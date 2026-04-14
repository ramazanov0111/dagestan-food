import React, { useState } from 'react';
import { ArrowRight, Mail, Check, Sparkles } from 'lucide-react';
import { useScrollAnimation } from './hooks/useScrollAnimation';

export default function CTABanner() {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [ref, isVisible] = useScrollAnimation(0.15);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email) {
            setSubmitted(true);
            setTimeout(() => {
                setSubmitted(false);
                setEmail('');
            }, 3000);
        }
    };

    return (
        <>
            <style>{`
                @keyframes sparkle {
                    0%, 100% { opacity: 0.3; transform: scale(1); }
                    50% { opacity: 0.8; transform: scale(1.5); }
                }
                .cta-sparkle {
                    animation: sparkle 3s ease-in-out infinite;
                }
            `}</style>

            <section className="py-24 lg:py-32">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div
                        ref={ref}
                        className="relative rounded-3xl overflow-hidden"
                        style={{
                            background: 'linear-gradient(135deg, #15803d 0%, #16a34a 50%, #059669 100%)',
                            opacity: isVisible ? 1 : 0,
                            transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
                            transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                        }}
                    >
                        {/* Decorative elements */}
                        <div className="absolute inset-0 pointer-events-none overflow-hidden">
                            <div className="cta-sparkle absolute top-10 left-10 w-3 h-3 rounded-full bg-white/30" style={{ animationDelay: '0s' }} />
                            <div className="cta-sparkle absolute top-20 right-20 w-2 h-2 rounded-full bg-white/20" style={{ animationDelay: '1s' }} />
                            <div className="cta-sparkle absolute bottom-16 left-1/4 w-4 h-4 rounded-full bg-white/15" style={{ animationDelay: '2s' }} />
                            <div className="cta-sparkle absolute bottom-10 right-1/3 w-2 h-2 rounded-full bg-white/25" style={{ animationDelay: '0.5s' }} />

                            {/* Large decorative circles */}
                            <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-white/5" />
                            <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-white/5" />
                        </div>

                        <div className="relative px-8 py-16 lg:py-20 lg:px-16 text-center">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur text-white/90 text-sm font-semibold mb-6">
                                <Sparkles className="w-4 h-4" />
                                Скидка 10% на первый заказ
                            </div>

                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-5 max-w-3xl mx-auto leading-tight">
                                Попробуйте вкус настоящего Дагестана
                            </h2>
                            <p className="text-lg text-white/80 max-w-xl mx-auto mb-10">
                                Подпишитесь на рассылку и получите промокод на скидку 10% при первом заказе. Только халяль, только натуральное.
                            </p>

                            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
                                <div className="relative flex-1">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Ваш email"
                                        className="w-full pl-12 pr-4 py-4 rounded-xl bg-white text-gray-900 placeholder-gray-400 font-medium focus:outline-none focus:ring-4 focus:ring-white/30 transition-shadow"
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={submitted}
                                    className={`flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-sm transition-all ${
                                        submitted
                                            ? 'bg-white/90 text-green-700'
                                            : 'bg-white text-green-700 hover:bg-green-50 hover:scale-105 active:scale-95 shadow-xl'
                                    }`}
                                >
                                    {submitted ? (
                                        <>
                                            <Check className="w-5 h-5" />
                                            Отправлено!
                                        </>
                                    ) : (
                                        <>
                                            Получить скидку
                                            <ArrowRight className="w-4 h-4" />
                                        </>
                                    )}
                                </button>
                            </form>

                            <p className="text-xs text-white/50 mt-4">
                                Никакого спама. Только вкусные предложения 1-2 раза в месяц.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}