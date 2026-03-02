import Hero from "@/components/Hero";
import AboutGrid from "@/components/AboutGrid";
import PalletGrid from "@/components/PalletGrid";
import MapSection from "@/components/MapSection";
import Calculator from "@/components/Calculator";

export default function Home() {
    return (
        <main className="w-full min-h-screen relative">
            <Hero />
            <AboutGrid />
            <PalletGrid />
            <MapSection />

            <section className="py-32 relative z-10 overflow-hidden bg-slate-50">
                {/* Decorative background for calculator */}
                <div className="absolute inset-0 z-0 flex items-center justify-center opacity-30 pointer-events-none">
                    <div className="w-[120vw] h-[120vw] rounded-full border border-blue-100" />
                    <div className="absolute w-[100vw] h-[100vw] rounded-full border border-blue-100" />
                    <div className="absolute w-[80vw] h-[80vw] rounded-full border border-blue-200" />
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="mb-16 text-center">
                        <h2 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 mb-4">
                            Прозрачная{" "}
                            <span className="text-[#2563eb]">экономика</span>
                        </h2>
                        <p className="text-slate-500 font-medium max-w-xl mx-auto">
                            Используйте наш калькулятор для оценки стоимости
                            партии. Гибкая система скидок для крупного опта и
                            постоянных партнеров.
                        </p>
                    </div>

                    <Calculator />
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 border-t border-slate-200 bg-white relative z-10">
                <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="text-2xl font-black tracking-tight text-slate-900">
                        Паллет<span className="text-[#2563eb]">Пром</span>.
                    </div>
                    <div className="flex gap-8 text-sm font-bold text-slate-500">
                        <a
                            href="#"
                            className="hover:text-[#2563eb] transition-colors"
                        >
                            Платформа
                        </a>
                        <a
                            href="#"
                            className="hover:text-[#2563eb] transition-colors"
                        >
                            Сеть
                        </a>
                        <a
                            href="#"
                            className="hover:text-[#2563eb] transition-colors"
                        >
                            Контакты
                        </a>
                    </div>
                    <div className="text-sm font-medium text-slate-400">
                        © {new Date().getFullYear()} Все права защищены.
                    </div>
                </div>
            </footer>
        </main>
    );
}
