import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "kontari-landing-theme";

type Theme = "light" | "dark";

function currentTheme(): Theme {
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

/**
 * Reads/toggles the `dark` class on <html>. The initial class is set by an
 * inline script in index.html to avoid a flash of the wrong theme.
 */
export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(currentTheme);

  useEffect(() => {
    setThemeState(currentTheme());
  }, []);

  const toggle = useCallback(() => {
    const root = document.documentElement;
    const next: Theme = root.classList.toggle("dark") ? "dark" : "light";
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore storage failures (private mode, etc.) */
    }
    setThemeState(next);
  }, []);

  return { theme, toggle };
}
