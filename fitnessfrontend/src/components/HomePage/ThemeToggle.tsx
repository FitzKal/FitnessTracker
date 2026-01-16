import { useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "@heroicons/react/16/solid";

const THEME_KEY = "theme";

function getInitialTheme(): 'light' | 'dark' {
    if (typeof window !== "undefined") {
        try {
            const saved = localStorage.getItem(THEME_KEY) as 'light' | 'dark' | null;
            if (saved) return saved;

            return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        } catch { /* empty */ }
    }
    return 'light';
}

export default function ThemeToggle() {
    const [theme, setTheme] = useState<'light' | 'dark'>(getInitialTheme);

    useEffect(() => {
        const root = document.documentElement;
        if (theme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }

        localStorage.setItem(THEME_KEY, theme);
    }, [theme]);

    const isDark = theme === 'dark';

    return (
        <button
            type="button"
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            className="lg:fixed  right-4 top-4 z-50 inline-flex items-center gap-2 px-3 py-2 rounded-full border border-surface-border bg-surface text-primary shadow-md hover:bg-surface-hover transition-colors cursor-pointer"
        >
            {isDark ? (
                <SunIcon className="h-5 w-5 text-yellow-500" />
            ) : (
                <MoonIcon className="h-5 w-5 text-slate-700" />
            )}
            <span className="text-sm font-medium">{isDark ? 'Light' : 'Dark'}</span>
        </button>
    );
}