import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default function RootLayout({children, results}: Readonly<{
    children: React.ReactNode;
    results: React.ReactNode
}>) {
    return (
        <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <main className="flex justify-center p-4 sm:p-6 lg:p-8">
            <section className="w-full max-w-3xl">
                {children}
                {results}
            </section>
        </main>
        </body>
        </html>
    );
}
