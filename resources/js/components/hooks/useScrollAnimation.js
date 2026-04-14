import { useEffect, useRef, useState } from 'react';

export function useScrollAnimation(threshold = 0.1) {
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, [threshold]);

    return [ref, isVisible];
}

export function useStaggerAnimation(itemCount, threshold = 0.1, delay = 150) {
    const ref = useRef(null);
    const [visibleItems, setVisibleItems] = useState(new Set());

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    for (let i = 0; i < itemCount; i++) {
                        setTimeout(() => {
                            setVisibleItems(prev => new Set([...prev, i]));
                        }, i * delay);
                    }
                    observer.unobserve(entry.target);
                }
            },
            { threshold }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, [itemCount, threshold, delay]);

    return [ref, visibleItems];
}