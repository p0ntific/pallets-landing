"use client";

import { YMaps, Map, Placemark, ZoomControl } from "@pbe/react-yandex-maps";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

// Генерация случайных точек вокруг Москвы и ЦФО для демонстрации
const generateRandomPoints = (
    center: [number, number],
    count: number,
    radius: number,
) => {
    const points = [];
    for (let i = 0; i < count; i++) {
        const r = radius * Math.sqrt(Math.random());
        const theta = Math.random() * 2 * Math.PI;
        const lat = center[0] + r * Math.cos(theta);
        const lng = center[1] + r * Math.sin(theta) * 1.5; // Корректировка для долготы
        points.push([lat, lng]);
    }
    return points;
};

const mapCenter: [number, number] = [55.751574, 37.573856]; // Москва
const points = generateRandomPoints(mapCenter, 40, 3); // 40 случайных точек в радиусе 3 градусов

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

export default function MapSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });
    
    // Parallax effect for the map container
    const yMap = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

    return (
        <section ref={sectionRef} className="py-24 px-4 bg-white relative overflow-hidden">
            <div className="container mx-auto">
                <div className="flex flex-col lg:flex-row gap-12 items-center mb-12">
                    <motion.div 
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        className="lg:w-1/3"
                    >
                        <motion.h2 variants={itemVariants} className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 mb-6">
                            Логистика <br />{" "}
                            <span className="text-[#2563eb] inline-block hover:scale-105 transition-transform duration-300">без границ</span>
                        </motion.h2>
                        <motion.p variants={itemVariants} className="text-slate-500 font-medium mb-8">
                            Наша сеть охватывает сотни производственных площадок
                            и распределительных центров. Мы гарантируем наличие
                            тары там, где она вам нужна.
                        </motion.p>

                        <div className="space-y-6">
                            {[
                                { value: "150+", label: "Складов-партнеров" },
                                {
                                    value: "24/7",
                                    label: "Диспетчерская служба",
                                },
                                {
                                    value: "< 4ч",
                                    label: "Время подачи транспорта",
                                },
                            ].map((stat, idx) => (
                                <motion.div
                                    key={idx}
                                    variants={itemVariants}
                                    whileHover={{ x: 10 }}
                                    className="flex items-center gap-4 cursor-pointer"
                                >
                                    <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center text-xl font-black text-[#2563eb] shadow-sm shadow-blue-900/5">
                                        {stat.value}
                                    </div>
                                    <span className="text-slate-700 font-bold">
                                        {stat.label}
                                    </span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
                        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 1, ease: [0.21, 1.11, 0.81, 0.99] }}
                        className="lg:w-2/3 w-full h-[500px] rounded-[2rem] overflow-hidden shadow-2xl shadow-slate-200/50 border-4 border-white relative group"
                    >
                        {/* Overlay that disappears on hover to make it feel more interactive */}
                        <div className="absolute inset-0 bg-[#2563eb]/5 z-10 pointer-events-none group-hover:bg-transparent transition-colors duration-500" />
                        
                        <motion.div style={{ y: yMap, height: "120%" }} className="w-full -mt-[10%]">
                            <YMaps query={{ lang: "ru_RU" }}>
                                <Map
                                    defaultState={{ center: mapCenter, zoom: 6 }}
                                    width="100%"
                                    height="100%"
                                    options={{
                                        suppressMapOpenBlock: true,
                                    }}
                                >
                                    <ZoomControl
                                        options={{
                                            position: { right: 10, top: 108 },
                                        }}
                                    />
                                    {points.map((coords, index) => (
                                        <Placemark
                                            key={index}
                                            geometry={coords}
                                            options={{
                                                preset: "islands#blueCircleDotIcon",
                                                iconColor: "#2563eb",
                                            }}
                                        />
                                    ))}
                                    {/* Главный хаб */}
                                    <Placemark
                                        geometry={mapCenter}
                                        options={{
                                            preset: "islands#redFactoryIcon",
                                            iconColor: "#ef4444",
                                        }}
                                        properties={{
                                            iconCaption: "Главный Хаб",
                                        }}
                                    />
                                </Map>
                            </YMaps>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
