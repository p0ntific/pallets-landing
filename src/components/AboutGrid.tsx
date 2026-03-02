"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Cpu, Recycle, Globe, Factory } from "lucide-react";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            type: "spring" as const,
            stiffness: 100,
            damping: 20,
        },
    },
};

export default function AboutGrid() {
    return (
        <section className="py-24 px-4 relative z-10 bg-[#0f172a] text-white dark-section overflow-hidden">
            <div className="container mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="mb-20 flex flex-col md:flex-row gap-8 justify-between items-end"
                >
                    <h2 className="text-4xl md:text-6xl font-black tracking-tight">
                        Инфраструктура <br />{" "}
                        <span className="text-[#60a5fa]">будущего</span>
                    </h2>
                    <p className="max-w-md text-slate-300 text-sm leading-relaxed border-l-2 border-[#2563eb] pl-6 py-2 bg-white/5 rounded-r-2xl p-4">
                        Мы не просто поставляем паллеты. Мы проектируем потоки
                        глобальной коммерции через умную агрегацию и инженерный
                        подход к логистике.
                    </p>
                </motion.div>

                {/* Сетка с мягкими углами */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[280px]"
                >
                    <motion.div
                        variants={itemVariants}
                        whileHover={{ scale: 0.98, translateY: -5 }}
                        className="md:col-span-8 bg-slate-800/50 border border-slate-700 p-8 flex flex-col justify-between group cursor-pointer overflow-hidden relative rounded-3xl"
                    >
                        <div className="absolute top-0 right-0 w-40 h-40 bg-[#2563eb]/20 blur-3xl rounded-full group-hover:bg-[#2563eb]/40 group-hover:scale-150 transition-all duration-500" />
                        <div className="flex justify-between items-start relative z-10">
                            <div className="flex items-center gap-3 text-slate-400">
                                <Globe className="w-5 h-5 group-hover:rotate-180 transition-transform duration-700" />
                                <span className="text-xs font-bold uppercase tracking-widest">
                                    01 / Глобальная сеть
                                </span>
                            </div>
                            <ArrowUpRight className="w-6 h-6 text-slate-500 group-hover:text-[#60a5fa] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                        </div>
                        <div className="relative z-10">
                            <h3 className="text-3xl font-black tracking-tight mb-3 text-white">
                                50М+ Единиц в обороте
                            </h3>
                            <p className="text-slate-400 text-sm max-w-md group-hover:text-slate-300 transition-colors">
                                Отслеживание в реальном времени по всей стране,
                                гарантирующее бесперебойную работу ваших
                                заводов.
                            </p>
                        </div>
                    </motion.div>

                    <motion.div
                        variants={itemVariants}
                        whileHover={{ scale: 0.98, translateY: -5 }}
                        className="md:col-span-4 bg-[#2563eb] p-8 flex flex-col justify-between text-white group cursor-pointer rounded-3xl shadow-lg shadow-blue-900/20 overflow-hidden relative"
                    >
                        <div className="absolute inset-0 bg-gradient-to-tr from-blue-700 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="flex justify-between items-start relative z-10">
                            <div className="flex items-center gap-3 opacity-80">
                                <Recycle className="w-5 h-5 group-hover:rotate-180 transition-transform duration-700" />
                                <span className="text-xs font-bold uppercase tracking-widest">
                                    02 / Экология
                                </span>
                            </div>
                            <ArrowUpRight className="w-6 h-6 opacity-80 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                        </div>
                        <div className="relative z-10">
                            <h3 className="text-3xl font-black tracking-tight mb-3">
                                Zero Waste
                            </h3>
                            <p className="opacity-90 text-sm font-medium">
                                100% перерабатываемые материалы, соответствие
                                стандартам циркулярной экономики.
                            </p>
                        </div>
                    </motion.div>

                    <motion.div
                        variants={itemVariants}
                        whileHover={{ scale: 0.98, translateY: -5 }}
                        className="md:col-span-5 bg-white text-slate-900 p-8 flex flex-col justify-between group cursor-pointer rounded-3xl relative overflow-hidden"
                    >
                        <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-slate-100 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="flex justify-between items-start relative z-10">
                            <div className="flex items-center gap-3 text-slate-400">
                                <Cpu className="w-5 h-5 text-slate-500 group-hover:text-[#2563eb] transition-colors duration-300" />
                                <span className="text-xs font-bold uppercase tracking-widest">
                                    03 / Технологии
                                </span>
                            </div>
                            <ArrowUpRight className="w-6 h-6 text-slate-400 group-hover:text-[#2563eb] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                        </div>
                        <div className="relative z-10">
                            <h3 className="text-3xl font-black tracking-tight mb-3">
                                AI Прогнозирование
                            </h3>
                            <p className="text-slate-600 text-sm font-medium">
                                Предиктивная аналитика для прогнозирования
                                спроса и оптимизации маршрутов доставки.
                            </p>
                        </div>
                    </motion.div>

                    <motion.div
                        variants={itemVariants}
                        whileHover={{ scale: 0.98, translateY: -5 }}
                        className="md:col-span-7 bg-slate-800 p-8 flex flex-col justify-between group cursor-pointer relative rounded-3xl overflow-hidden"
                    >
                        <motion.div
                            className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay"
                            initial={{ scale: 1, opacity: 0.4 }}
                            whileHover={{ scale: 1.1, opacity: 0.5 }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                        />
                        <div className="relative z-10 flex justify-between items-start">
                            <div className="flex items-center gap-3 text-slate-300">
                                <Factory className="w-5 h-5" />
                                <span className="text-xs font-bold uppercase tracking-widest">
                                    04 / Объекты
                                </span>
                            </div>
                            <ArrowUpRight className="w-6 h-6 text-slate-300 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                        </div>
                        <div className="relative z-10">
                            <h3 className="text-3xl font-black tracking-tight text-white mb-3">
                                Автоматизированные хабы
                            </h3>
                            <p className="text-slate-300 text-sm max-w-md">
                                Роботизированные склады для сортировки и ремонта
                                тары 24/7.
                            </p>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
