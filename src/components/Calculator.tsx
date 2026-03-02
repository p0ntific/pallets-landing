"use client";

import { useState, useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { ArrowRight, Box, Package, Truck } from "lucide-react";
import { useRef } from "react";

// Компонент для анимации числа
function AnimatedNumber({ value }: { value: number }) {
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true });
    
    useEffect(() => {
        if (!inView || !ref.current) return;
        
        let start = 0;
        const end = value;
        const duration = 1000;
        const startTime = performance.now();
        
        const updateNumber = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing (easeOutExpo)
            const easeOut = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
            const current = Math.floor(start + (end - start) * easeOut);
            
            if (ref.current) {
                ref.current.textContent = current.toLocaleString("ru-RU");
            }
            
            if (progress < 1) {
                requestAnimationFrame(updateNumber);
            } else if (ref.current) {
                ref.current.textContent = value.toLocaleString("ru-RU");
            }
        };
        
        requestAnimationFrame(updateNumber);
    }, [value, inView]);

    return <span ref={ref}>{value.toLocaleString("ru-RU")}</span>;
}

export default function Calculator() {
    const [quantity, setQuantity] = useState(100);
    const [type, setType] = useState<"standard" | "euro" | "custom">("euro");
    const containerRef = useRef<HTMLDivElement>(null);

    const basePrice = type === "euro" ? 450 : type === "standard" ? 380 : 600;
    const total = quantity * basePrice;

    return (
        <motion.div 
            ref={containerRef}
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.21, 1.11, 0.81, 0.99] }}
            className="w-full max-w-5xl mx-auto bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 p-8 md:p-12 relative overflow-hidden border border-slate-100"
        >
            <motion.div 
                animate={{ 
                    rotate: [0, 5, 0, -5, 0],
                    scale: [1, 1.05, 1, 1.05, 1]
                }}
                transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                className="absolute top-0 right-0 w-64 h-64 bg-blue-50/80 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2" 
            />

            <h3 className="text-3xl md:text-4xl font-black mb-10 tracking-tight text-slate-900">
                Калькулятор <span className="text-[#2563eb]">поставок</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-10">
                    <div>
                        <label className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4 block">
                            Тип паллета
                        </label>
                        <div className="flex gap-4">
                            {[
                                { id: "euro", icon: Box, label: "Евро (EPAL)" },
                                {
                                    id: "standard",
                                    icon: Package,
                                    label: "Финский",
                                },
                                {
                                    id: "custom",
                                    icon: Truck,
                                    label: "Нестандарт",
                                },
                            ].map((t) => (
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    key={t.id}
                                    onClick={() => setType(t.id as any)}
                                    className={`flex-1 py-4 rounded-2xl border-2 transition-all duration-300 flex flex-col items-center gap-2 ${
                                        type === t.id
                                            ? "border-[#2563eb] bg-blue-50 text-[#2563eb] shadow-md shadow-blue-100"
                                            : "border-slate-100 text-slate-500 hover:border-slate-200 hover:bg-slate-50"
                                    }`}
                                >
                                    <t.icon className="w-5 h-5" />
                                    <span className="text-sm font-bold">
                                        {t.label}
                                    </span>
                                </motion.button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <div className="flex justify-between items-end mb-4">
                            <label className="text-xs font-bold uppercase tracking-widest text-slate-400">
                                Количество (шт)
                            </label>
                            <span className="text-2xl font-black text-[#2563eb]">
                                {quantity}
                            </span>
                        </div>
                        <input
                            type="range"
                            min="10"
                            max="5000"
                            step="10"
                            value={quantity}
                            onChange={(e) =>
                                setQuantity(Number(e.target.value))
                            }
                            className="w-full h-2 bg-slate-100 rounded-lg appearance-none outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:bg-[#2563eb] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-md hover:[&::-webkit-slider-thumb]:scale-125 transition-all"
                        />
                    </div>
                </div>

                <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100 flex flex-col justify-between group hover:bg-white hover:shadow-xl hover:shadow-slate-200/40 transition-all duration-500">
                    <div>
                        <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">
                            Ориентировочная стоимость
                        </p>
                        <motion.div
                            key={type}
                            initial={{ opacity: 0.5, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-5xl md:text-6xl font-black text-slate-900 tracking-tight flex items-baseline gap-2"
                        >
                            <AnimatedNumber value={total} /> <span className="text-3xl text-[#2563eb]">₽</span>
                        </motion.div>
                        <p className="text-sm text-slate-500 mt-4 font-medium">
                            *Цена указана без учета логистики до вашего склада.
                            Точная стоимость рассчитывается индивидуально.
                        </p>
                    </div>

                    <motion.button 
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="mt-8 w-full bg-[#0f172a] text-white rounded-2xl py-4 px-6 font-bold text-sm flex items-center justify-between hover:bg-[#2563eb] transition-colors duration-300 shadow-lg shadow-slate-900/20"
                    >
                        <span>Запросить КП</span>
                        <motion.div
                            animate={{ x: [0, 5, 0] }}
                            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                        >
                            <ArrowRight className="w-5 h-5" />
                        </motion.div>
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
}
