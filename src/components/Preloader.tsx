"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
    const [progress, setProgress] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Симуляция загрузки
        const interval = setInterval(() => {
            setProgress((prev) => {
                const next = prev + Math.floor(Math.random() * 15) + 5;
                if (next >= 100) {
                    clearInterval(interval);
                    setTimeout(() => setIsLoading(false), 500); // Небольшая задержка на 100%
                    return 100;
                }
                return next;
            });
        }, 150);

        return () => clearInterval(interval);
    }, []);

    // Чтобы предотвратить скролл во время загрузки
    useEffect(() => {
        if (isLoading) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isLoading]);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    key="preloader"
                    initial={{ y: 0 }}
                    exit={{ y: "-100%" }}
                    transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                    className="fixed inset-0 z-[100] flex flex-col justify-end bg-[#0f172a] text-white"
                >
                    <div className="flex flex-col h-full justify-between p-8 md:p-12">
                        {/* Верхняя часть с логотипом */}
                        <div className="flex justify-between items-start w-full overflow-hidden">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="text-2xl font-black tracking-tight"
                            >
                                Паллет<span className="text-[#2563eb]">Пром</span>.
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="text-xs uppercase tracking-[0.2em] font-bold text-slate-400 text-right"
                            >
                                Инициализация <br />
                                инфраструктуры
                            </motion.div>
                        </div>

                        {/* Нижняя часть с прогрессом */}
                        <div className="w-full">
                            <div className="flex justify-between items-end mb-4 overflow-hidden">
                                <motion.span
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                    className="text-[10vw] leading-none font-black tracking-tighter"
                                >
                                    {progress}%
                                </motion.span>
                                <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.6 }}
                                    className="text-sm font-medium text-slate-400 mb-2 md:mb-6 uppercase tracking-widest"
                                >
                                    Загрузка...
                                </motion.span>
                            </div>
                            
                            {/* Полоса прогресса */}
                            <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="w-full h-1 bg-slate-800 rounded-full overflow-hidden"
                            >
                                <motion.div
                                    className="h-full bg-[#2563eb]"
                                    initial={{ width: "0%" }}
                                    animate={{ width: `${progress}%` }}
                                    transition={{ ease: "linear" }}
                                />
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
