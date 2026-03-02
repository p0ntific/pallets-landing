"use client";

import { useRef, useEffect } from "react";
import {
    motion,
    useScroll,
    useTransform,
    useSpring,
    useMotionValue,
} from "framer-motion";
import Pallet3D from "./Pallet3D";

export default function Hero() {
    const containerRef = useRef<HTMLElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    const yText = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
    const opacityText = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
    const scale3D = useTransform(scrollYProgress, [0, 1], [1, 0.8]);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 50, stiffness: 400 };
    const parallaxX = useSpring(
        useTransform(mouseX, [-0.5, 0.5], [-15, 15]),
        springConfig,
    );
    const parallaxY = useSpring(
        useTransform(mouseY, [-0.5, 0.5], [-15, 15]),
        springConfig,
    );

    const parallax3dX = useSpring(
        useTransform(mouseX, [-0.5, 0.5], [20, -20]),
        springConfig,
    );
    const parallax3dY = useSpring(
        useTransform(mouseY, [-0.5, 0.5], [20, -20]),
        springConfig,
    );

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX / window.innerWidth - 0.5);
            mouseY.set(e.clientY / window.innerHeight - 0.5);
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    return (
        <section
            ref={containerRef}
            className="relative w-full min-h-screen flex flex-col justify-center overflow-hidden bg-[#f8fafc]"
        >
            {/* Animated Background */}
            <motion.div
                style={{ x: parallaxX, y: parallaxY }}
                className="absolute inset-0 z-0 opacity-20 bg-[radial-gradient(circle_at_50%_50%,#2563eb,transparent_60%)] scale-125"
            />

            <div className="container mx-auto px-4 z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center h-full pt-20 pb-10">
                <motion.div
                    style={{ y: yText, opacity: opacityText }}
                    className="lg:col-span-5 flex flex-col justify-center"
                >
                    <motion.div
                        initial={{ opacity: 0, y: 50, rotateX: -10 }}
                        animate={{ opacity: 1, y: 0, rotateX: 0 }}
                        transition={{
                            duration: 1,
                            ease: [0.21, 1.11, 0.81, 0.99],
                            delay: 1,
                        }}
                        style={{ perspective: 1000 }}
                    >
                        <h1 className="text-huge flex flex-col relative z-20 text-[#0f172a]">
                            <motion.span
                                initial={{ x: -50, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{
                                    duration: 0.8,
                                    delay: 1.2,
                                    ease: "easeOut",
                                }}
                            >
                                Паллет
                            </motion.span>
                            <motion.span
                                className="text-outline"
                                initial={{ x: 50, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{
                                    duration: 0.8,
                                    delay: 1.4,
                                    ease: "easeOut",
                                }}
                            >
                                Пром.
                            </motion.span>
                        </h1>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                            delay: 1.8,
                            duration: 1,
                            ease: "easeOut",
                        }}
                        className="flex items-start gap-4 mt-8 max-w-lg bg-white/60 backdrop-blur-md p-6 rounded-3xl border border-gray-200 shadow-xl shadow-blue-900/5 relative overflow-hidden group"
                    >
                        <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent -translate-x-full group-hover:animate-shimmer" />
                        <div className="h-full w-1.5 bg-[#2563eb] rounded-full shrink-0" />
                        <p className="text-sm md:text-base font-medium text-[#475569] leading-relaxed">
                            Главный B2B агрегатор промышленной тары. <br />
                            Интеллектуальное распределение, строгий контроль
                            качества и бесперебойные поставки от завода к
                            заводу.
                        </p>
                    </motion.div>
                </motion.div>

                {/* 3D Container */}
                <motion.div
                    style={{
                        scale: scale3D,
                        x: parallax3dX,
                        y: parallax3dY,
                    }}
                    className="lg:col-span-7 h-[60vh] lg:h-[85vh] relative z-10 w-full"
                >
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0, rotateY: 15 }}
                        animate={{ scale: 1, opacity: 1, rotateY: 0 }}
                        transition={{
                            duration: 1.5,
                            delay: 1,
                            ease: "easeOut",
                        }}
                        className="w-full h-full"
                    >
                        <Pallet3D />
                    </motion.div>
                </motion.div>
            </div>

            {/* Marquee effect */}
            <div className="absolute bottom-6 left-0 w-full overflow-hidden flex whitespace-nowrap opacity-5 pointer-events-none z-0">
                <motion.div
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{
                        repeat: Infinity,
                        duration: 30,
                        ease: "linear",
                    }}
                    className="flex text-[6rem] font-black uppercase tracking-tighter text-[#0f172a]"
                >
                    <span>
                        ИНЖЕНЕРНАЯ ЛОГИСТИКА • B2B СЕТЬ • СТАНДАРТЫ КАЧЕСТВА
                        •{" "}
                    </span>
                    <span>
                        ИНЖЕНЕРНАЯ ЛОГИСТИКА • B2B СЕТЬ • СТАНДАРТЫ КАЧЕСТВА
                        •{" "}
                    </span>
                </motion.div>
            </div>
        </section>
    );
}
