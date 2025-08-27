"use client";

import { createContext, useState, useEffect, useContext } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState("dark"); // <-- Устанавливаем темную тему по умолчанию

    // Этот useEffect выполняется ТОЛЬКО на клиенте
    useEffect(() => {
        const storedTheme = localStorage.getItem("theme");
        if (storedTheme) {
            setTheme(storedTheme);
        }
    }, []);

    useEffect(() => {
        const root = document.documentElement;
        if (theme === "dark") {
            root.classList.add("dark");
            document.body.classList.add("bg-black");
            document.body.classList.remove("bg-slate-50");
        } else {
            root.classList.remove("dark");
            document.body.classList.add("bg-slate-50");
            document.body.classList.remove("bg-black");
        }
        localStorage.setItem("theme", theme);
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

// Кастомный хук для использования в других компонентах
export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
}
