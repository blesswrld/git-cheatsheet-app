"use client";

import { createContext, useState, useEffect, useContext } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
    // Устанавливаем 'light' по умолчанию, чтобы избежать ошибок на сервере
    const [theme, setTheme] = useState("light");

    // Этот useEffect выполняется ТОЛЬКО на клиенте
    useEffect(() => {
        const storedTheme = localStorage.getItem("theme");
        const prefersDark = window.matchMedia(
            "(prefers-color-scheme: dark)"
        ).matches;

        // Устанавливаем тему из localStorage или по системным настройкам
        if (storedTheme) {
            setTheme(storedTheme);
        } else if (prefersDark) {
            setTheme("dark");
        }
    }, []); // Пустой массив зависимостей означает, что эффект выполнится один раз

    useEffect(() => {
        const root = document.documentElement;
        if (theme === "dark") {
            root.classList.add("dark");
        } else {
            root.classList.remove("dark");
        }
        localStorage.setItem("theme", theme);
    }, [theme]); // Этот эффект срабатывает при каждом изменении темы

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
