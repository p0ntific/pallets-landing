"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useState, useRef } from "react";
import { ShoppingCart } from "lucide-react";

const pallets = [
    {
        id: 1,
        name: "Европоддон (EPAL) 1 сорт",
        size: "1200 × 800 мм",
        load: "до 1500 кг",
        price: "от 450 ₽",
        image: "/pallet1.png",
    },
    {
        id: 2,
        name: "Европоддон (EPAL) 2 сорт",
        size: "1200 × 800 мм",
        load: "до 1500 кг",
        price: "от 380 ₽",
        image: "/pallet2.png",
    },
    {
        id: 3,
        name: "Финский поддон",
        size: "1200 × 1000 мм",
        load: "до 2000 кг",
        price: "от 500 ₽",
        image: "/pallet3.png",
    },
    {
        id: 4,
        name: "Облегченный поддон",
        size: "1200 × 800 мм",
        load: "до 700 кг",
        price: "от 250 ₽",
        image: "/pallet4.png",
    },
    {
        id: 5,
        name: "Широкий поддон",
        size: "1200 × 1200 мм",
        load: "до 1500 кг",
        price: "от 550 ₽",
        image: "/pallet5.png",
    },
    {
        id: 6,
        name: "Пластиковый поддон",
        size: "1200 × 800 мм",
        load: "до 1200 кг",
        price: "от 1200 ₽",
        image: "/pallet6.png",
    },
    {
        id: 7,
        name: "Поддон с обвязкой",
        size: "1200 × 800 мм",
        load: "до 1000 кг",
        price: "от 400 ₽",
        image: "/pallet7.png",
    },
    {
        id: 8,
        name: "Нестандартный поддон",
        size: "По запросу",
        load: "до 1500 кг",
        price: "от 300 ₽",
        image: "/pallet8.png",
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { 
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
};

const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9, rotateX: -15 },
    visible: { 
        opacity: 1, 
        y: 0,
        scale: 1,
        rotateX: 0,
        transition: { 
            type: "spring", 
            stiffness: 100, 
            damping: 15,
            mass: 1
        }
    }
};

function PalletCard({ pallet }: { pallet: typeof pallets[0] }) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);
    
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
    const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);
    
    // Блик, следующий за курсором
    const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ["0%", "100%"]);
    const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ["0%", "100%"]);
    const glareOpacity = useTransform(mouseXSpring, [-0.5, 0.5], [0.1, 0.5]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        
        const rect = cardRef.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            variants={cardVariants}
            style={{ perspective: 1000 }}
            className="w-full h-full cursor-pointer z-10 hover:z-20 relative"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
        >
            <motion.div
                ref={cardRef}
                style={{ 
                    rotateX, 
                    rotateY, 
                    transformStyle: "preserve-3d",
                }}
                className="bg-white rounded-3xl border border-slate-200 p-6 flex flex-col h-full shadow-lg shadow-slate-200/20 relative overflow-hidden group transition-colors duration-300"
                animate={{
                    borderColor: isHovered ? "rgba(37, 99, 235, 0.4)" : "rgba(226, 232, 240, 1)",
                    boxShadow: isHovered 
                        ? "0 25px 50px -12px rgba(37, 99, 235, 0.25)" 
                        : "0 10px 15px -3px rgba(0, 0, 0, 0.05)",
                }}
            >
                {/* Интерактивный блик */}
                {isHovered && (
                    <motion.div 
                        className="absolute inset-0 pointer-events-none z-30 opacity-40 mix-blend-overlay"
                        style={{
                            background: `radial-gradient(circle 150px at ${glareX} ${glareY}, rgba(255,255,255,0.8), transparent)`
                        }}
                    />
                )}

                {/* Фон-подсветка при наведении */}
                <motion.div 
                    className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent opacity-0 z-0 pointer-events-none"
                    animate={{ opacity: isHovered ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                />

                <div 
                    className="h-48 mb-6 flex items-center justify-center bg-slate-50 rounded-2xl p-4 relative z-10"
                    style={{ transformStyle: "preserve-3d" }}
                >
                    {/* Тень под паллетом */}
                    <motion.div 
                        className="absolute bottom-4 left-1/2 -translate-x-1/2 w-2/3 h-4 bg-black/10 blur-md rounded-[100%]"
                        animate={{ 
                            scale: isHovered ? 0.8 : 1,
                            opacity: isHovered ? 0.5 : 1 
                        }}
                    />
                    
                    {/* Изображение с эффектом "вылета" (translateZ) */}
                    <motion.img
                        src={pallet.image}
                        alt={pallet.name}
                        className="w-full h-full object-contain mix-blend-multiply drop-shadow-xl"
                        animate={{ 
                            scale: isHovered ? 1.15 : 1,
                            y: isHovered ? -10 : 0,
                        }}
                        style={{ translateZ: 50 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    />
                </div>

                <div className="flex-1 flex flex-col relative z-10" style={{ translateZ: 30 }}>
                    <motion.div 
                        className="text-2xl font-black text-[#2563eb] mb-2"
                        animate={{ color: isHovered ? "#1d4ed8" : "#2563eb" }}
                    >
                        {pallet.price}
                    </motion.div>
                    <h3 className="text-base font-bold text-slate-800 mb-6 line-clamp-2">
                        {pallet.name}
                    </h3>

                    <div className="mt-auto space-y-3 mb-6">
                        <div className="flex justify-between items-center text-sm border-b border-slate-100 pb-2">
                            <span className="text-slate-500 font-medium">
                                Размер
                            </span>
                            <span className="font-bold text-slate-700">
                                {pallet.size}
                            </span>
                        </div>
                        <div className="flex justify-between items-center text-sm border-b border-slate-100 pb-2">
                            <span className="text-slate-500 font-medium">
                                Нагрузка
                            </span>
                            <span className="font-bold text-slate-700">
                                {pallet.load}
                            </span>
                        </div>
                    </div>

                    <motion.button 
                        className="w-full py-4 bg-slate-100 text-slate-800 text-sm font-bold rounded-xl flex items-center justify-center gap-2 overflow-hidden relative"
                        whileTap={{ scale: 0.95 }}
                        animate={{ 
                            backgroundColor: isHovered ? "#2563eb" : "#f1f5f9",
                            color: isHovered ? "#ffffff" : "#1e293b",
                        }}
                    >
                        <motion.span
                            animate={{ x: isHovered ? -5 : 0 }}
                        >
                            В корзину
                        </motion.span>
                        <motion.div
                            initial={{ opacity: 0, x: -10, width: 0 }}
                            animate={{ 
                                opacity: isHovered ? 1 : 0, 
                                x: isHovered ? 0 : -10,
                                width: isHovered ? "auto" : 0 
                            }}
                        >
                            <ShoppingCart className="w-4 h-4" />
                        </motion.div>
                    </motion.button>
                </div>
            </motion.div>
        </motion.div>
    );
}

export default function PalletGrid() {
    return (
        <section className="py-24 px-4 bg-white relative z-10 overflow-hidden">
            <div className="container mx-auto">
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.8, ease: [0.21, 1.11, 0.81, 0.99] }}
                    className="mb-14 text-center md:text-left"
                >
                    <h2 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 mb-4">
                        Каталог <span className="text-[#2563eb]">тары</span>
                    </h2>
                    <p className="text-slate-500 font-medium max-w-2xl text-base md:text-lg mx-auto md:mx-0">
                        Выберите подходящие поддоны для ваших задач. Доступен
                        заказ оптом и в розницу. Гарантия качества на каждую партию.
                    </p>
                </motion.div>

                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
                >
                    {pallets.map((pallet) => (
                        <PalletCard key={pallet.id} pallet={pallet} />
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
