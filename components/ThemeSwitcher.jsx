"use client";

import { useTheme } from "./ThemeProvider";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";

export const ThemeSwitcher = () => {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div className="h-10 w-10 p-2" />;
    }

    return (
        <button
            onClick={() => {
                setTheme(theme === "dark" ? "light" : "dark");
            }}
            className="p-2 rounded-md hover:bg-slate-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 dark:hover:bg-slate-800"
            aria-label="Переключить тему"
        >
            {theme === "dark" ? (
                <SunIcon className="h-6 w-6 text-slate-400" />
            ) : (
                <MoonIcon className="h-6 w-6 text-slate-500" />
            )}
        </button>
    );
};
