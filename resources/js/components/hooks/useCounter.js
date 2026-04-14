import { useEffect, useState } from 'react';

export function useCounter(target, duration = 2000, isActive = false) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!isActive) return;

        let startTime = null;
        const startValue = 0;

        function animate(timestamp) {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);

            // easeOutExpo
            const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
            setCount(Math.floor(eased * (target - startValue) + startValue));

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        }

        requestAnimationFrame(animate);
    }, [target, duration, isActive]);

    return count;
}