import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Preloader from "@/components/Preloader";
import CustomCursor from "@/components/CustomCursor";

const nunito = Nunito({ subsets: ["cyrillic", "latin"], weight: ["400", "500", "700", "800", "900"] });

export const metadata: Metadata = {
  title: "PALLET.ПРОМ | Умная логистика",
  description: "Агрегатор паллетов нового поколения для B2B.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={nunito.className}>
        <Preloader />
        <CustomCursor />
        <SmoothScroll>
          <div className="fixed inset-0 bg-grid pointer-events-none z-0 opacity-40"></div>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
