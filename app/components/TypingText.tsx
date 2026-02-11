"use client";

import { useEffect, useState } from "react";
import { useTextAnimation } from "@/app/hooks/useTextAnimation";

interface TypingTextProps {
    text: string;
    className?: string;
    typingSpeed?: number;
    deletingSpeed?: number;
    pauseTime?: number;
}

export default function TypingText({
    text,
    className = "",
    typingSpeed = 50,
    deletingSpeed = 20,
    pauseTime = 5000,
}: TypingTextProps) {
    const [displayedText, setDisplayedText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);

    // Use useTextAnimation hook to trigger start
    const [elementRef, isVisible] = useTextAnimation<HTMLSpanElement>({
        threshold: 0.1,
        triggerOnce: false
    });

    useEffect(() => {
        if (!isVisible) {
            // Reset when out of view
            if (displayedText !== "" || isDeleting) {
                setDisplayedText("");
                setIsDeleting(false);
            }
            return;
        }

        let timer: ReturnType<typeof setTimeout>;

        const handleTyping = () => {
            const currentText = text;

            // Determine if we are typing or deleting
            if (isDeleting) {
                setDisplayedText(prev => prev.substring(0, prev.length - 1));
            } else {
                setDisplayedText(prev => currentText.substring(0, prev.length + 1));
            }

            // Determine typing speed with some natural randomness
            let typeSpeed = isDeleting ? deletingSpeed : typingSpeed;
            if (!isDeleting) {
                // Add randomness to typing (±50ms variance) to simulate human typing
                const randomVariance = Math.random() * 50 - 25;
                typeSpeed += randomVariance;
            }

            // Logic for changing state
            if (!isDeleting && displayedText === currentText) {
                // Finished typing the word
                typeSpeed = pauseTime; // Pause at end of word
                setIsDeleting(true);
            } else if (isDeleting && displayedText === "") {
                // Finished deleting
                setIsDeleting(false);
                typeSpeed = 500; // Brief pause before starting next loop
            }

            timer = setTimeout(handleTyping, Math.max(typeSpeed, 20)); // Ensure min speed
        };

        timer = setTimeout(handleTyping, typingSpeed);

        return () => clearTimeout(timer);
    }, [displayedText, isDeleting, isVisible, text, typingSpeed, deletingSpeed, pauseTime]);

    return (
        <span ref={elementRef} className={`typing-text-container ${className}`}>
            {displayedText}
            <span className="typing-cursor" aria-hidden="true" />
        </span>
    );
}
