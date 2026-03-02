"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function CustomCursor() {
    const [isVisible, setIsVisible] = useState(false);
    const [isHovering, setIsHovering] = useState(false);

    // Координаты мыши
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Пружинные анимации для плавности (для большого круга)
    const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
    const cursorXSpring = useSpring(mouseX, springConfig);
    const cursorYSpring = useSpring(mouseY, springConfig);

    useEffect(() => {
        // Убираем стандартный курсор для всего документа
        document.documentElement.classList.add('custom-cursor-active');

        const moveCursor = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
            if (!isVisible) setIsVisible(true);
        };

        const handleMouseLeave = () => setIsVisible(false);
        const handleMouseEnter = () => setIsVisible(true);

        // Отслеживание наведения на интерактивные элементы
        const handleElementHover = () => setIsHovering(true);
        const handleElementLeave = () => setIsHovering(false);

        window.addEventListener("mousemove", moveCursor);
        document.body.addEventListener("mouseleave", handleMouseLeave);
        document.body.addEventListener("mouseenter", handleMouseEnter);

        // Добавляем слушатели ко всем ссылкам и кнопкам
        const interactiveElements = document.querySelectorAll('a, button, input, [role="button"], .cursor-pointer');
        interactiveElements.forEach((el) => {
            el.addEventListener("mouseenter", handleElementHover);
            el.addEventListener("mouseleave", handleElementLeave);
        });

        // Отслеживание появления новых интерактивных элементов (например, после загрузки React)
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === "childList") {
                    const newInteractiveElements = document.querySelectorAll('a, button, input, [role="button"], .cursor-pointer');
                    newInteractiveElements.forEach((el) => {
                        el.removeEventListener("mouseenter", handleElementHover);
                        el.removeEventListener("mouseleave", handleElementLeave);
                        el.addEventListener("mouseenter", handleElementHover);
                        el.addEventListener("mouseleave", handleElementLeave);
                    });
                }
            });
        });

        observer.observe(document.body, { childList: true, subtree: true });

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            document.body.removeEventListener("mouseleave", handleMouseLeave);
            document.body.removeEventListener("mouseenter", handleMouseEnter);
            
            interactiveElements.forEach((el) => {
                el.removeEventListener("mouseenter", handleElementHover);
                el.removeEventListener("mouseleave", handleElementLeave);
            });
            
            observer.disconnect();
            document.documentElement.classList.remove('custom-cursor-active');
        };
    }, [mouseX, mouseY, isVisible]);

    // Не рендерим на мобильных
    if (typeof window !== "undefined" && window.innerWidth < 768) return null;

    return (
        <>
            {/* Основной (быстрый) маленький курсор */}
            <motion.div
                className="fixed top-0 left-0 w-3 h-3 bg-[#2563eb] rounded-full pointer-events-none z-[9999] mix-blend-difference"
                style={{
                    x: mouseX,
                    y: mouseY,
                    translateX: "-50%",
                    translateY: "-50%",
                    opacity: isVisible ? 1 : 0,
                    scale: isHovering ? 0 : 1,
                }}
                transition={{ type: "tween", ease: "backOut", duration: 0.15 }}
            />

            {/* Второстепенный (плавный) большой курсор */}
            <motion.div
                className="fixed top-0 left-0 w-10 h-10 border border-[#2563eb] rounded-full pointer-events-none z-[9998]"
                style={{
                    x: cursorXSpring,
                    y: cursorYSpring,
                    translateX: "-50%",
                    translateY: "-50%",
                    opacity: isVisible ? 1 : 0,
                }}
                animate={{
                    scale: isHovering ? 1.5 : 1,
                    backgroundColor: isHovering ? "rgba(37, 99, 235, 0.1)" : "rgba(37, 99, 235, 0)",
                    borderColor: isHovering ? "transparent" : "rgba(37, 99, 235, 0.5)",
                }}
                transition={{
                    scale: { type: "spring", stiffness: 300, damping: 20 },
                    backgroundColor: { duration: 0.2 },
                    borderColor: { duration: 0.2 }
                }}
            />
        </>
    );
}
