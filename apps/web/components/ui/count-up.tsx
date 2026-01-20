'use client';

import { useEffect, useState, useRef } from 'react';
import { animate, useInView } from 'framer-motion';

interface CountUpProps {
    from?: number;
    to: number;
    duration?: number; // in seconds
    decimals?: number;
    once?: boolean; // trigger once or every time
}

const CountUp = ({ from = 0, to, duration = 1.8, decimals = 0, once = true }: CountUpProps) => {
    const [count, setCount] = useState(from);
    const ref = useRef(null);
    const isInView = useInView(ref, { once });

    useEffect(() => {
        if (isInView) {
            const controls = animate(from, to, {
                duration,
                onUpdate: (latest) => {
                    setCount(Number(latest.toFixed(decimals)));
                },
            });
            return () => controls.stop();
        }
    }, [isInView, from, to, duration, decimals]);

    return (
        <span ref={ref}>
            {count.toLocaleString(undefined, {
                minimumFractionDigits: decimals,
                maximumFractionDigits: decimals,
            })}
        </span>
    );
};

export default CountUp;
