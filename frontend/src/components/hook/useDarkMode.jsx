import { useCallback, useEffect, useState } from "react";

const THEME_KEY = "theme";

const getInitialTheme = () => {
    if (typeof window === "undefined") return "light";
    const stored = window.localStorage.getItem(THEME_KEY);
    if (stored === "dark" || stored === "light") return stored;
    return window.matchMedia?.("(prefers-color-scheme: dark)")?.matches ? "dark" : "light";
};

export default function useDarkMode() {
    const [theme, setTheme] = useState(getInitialTheme);

    const applyTheme = useCallback((next) => {
        const root = window.document.documentElement;
        if (next === "dark") {
            root.classList.add("dark");
        } else {
            root.classList.remove("dark");
        }
    }, []);

    useEffect(() => {
        applyTheme(theme);
        window.localStorage.setItem(THEME_KEY, theme);
    }, [theme, applyTheme]);

    const toggleTheme = useCallback(() => {
        setTheme((prev) => (prev === "dark" ? "light" : "dark"));
    }, []);

    return { theme, toggleTheme };
}
