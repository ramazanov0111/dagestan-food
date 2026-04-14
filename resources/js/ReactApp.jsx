import React from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import StatsSection from './components/StatsSection';
import MenuSection from './components/MenuSection';
import HowItWorks from './components/HowItWorks';
import TestimonialsSection from './components/TestimonialsSection';
import PricingSection from './components/PricingSection';
import CTABanner from './components/CTABanner';
import Footer from './components/Footer';

export default function ReactApp() {
    return (
        <div className="min-h-screen bg-white">
            <style>{`
                html {
                    scroll-behavior: smooth;
                }
                * {
                    -webkit-font-smoothing: antialiased;
                    -moz-osx-font-smoothing: grayscale;
                }
                ::selection {
                    background: rgba(22, 163, 74, 0.2);
                    color: #15803d;
                }
            `}</style>
            <Navbar />
            <HeroSection />
            <FeaturesSection />
            <StatsSection />
            <MenuSection />
            <HowItWorks />
            <TestimonialsSection />
            <PricingSection />
            <CTABanner />
            <Footer />
        </div>
    );
}