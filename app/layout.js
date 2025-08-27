import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { ThemeProvider } from "../components/ThemeProvider";

export const metadata = {
    title: "Интерактивная Git Шпаргалка",
    description: "Найди нужную команду Git быстро и легко",
};

export default function RootLayout({ children }) {
    return (
        <html lang="ru" suppressHydrationWarning>
            <body
                className={`${GeistSans.variable} ${GeistMono.variable} font-sans antialiased`}
            >
                <ThemeProvider>{children}</ThemeProvider>
            </body>
        </html>
    );
}
