"use client";
import React from "react";
import { useGesture } from "react-use-gesture";

interface GestureHandlerProps {
    onSwipeLeft: () => void;
    onSwipeRight: () => void;
    children: React.ReactNode;
}

export default function GestureHandler({
    onSwipeLeft,
    onSwipeRight,
    children,
}: GestureHandlerProps) {
    const containerRef = React.useRef<HTMLDivElement>(null);

    const bind = useGesture(
        {
            onDrag: ({ direction: [xDir], velocity, distance }) => {
                // distance is a number representing total distance
                // Only trigger if significant swipe (velocity > 0.2 or distance > 50px)
                if (velocity > 0.2 || distance > 50) {
                    if (xDir > 0) {
                        // Swiped right
                        onSwipeRight();
                    } else if (xDir < 0) {
                        // Swiped left
                        onSwipeLeft();
                    }
                }
            },
        },
        {
            drag: {
                axis: "x",
                filterTaps: true,
            },
        }
    );

    return (
        <div ref={containerRef} {...bind()} className="touch-pan-y">
            {children}
        </div>
    );
}
