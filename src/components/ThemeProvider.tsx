import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light";

interface ThemeContextValue {
  theme: Theme;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme] = useState<Theme>("light");

  useEffect(() => {
    const root = document.documentElement;
    if (!root.classList.contains("light")) {
      root.classList.remove("dark");
      root.classList.add("light");
    }
    root.style.colorScheme = "light";
  }, []);

  return <ThemeContext value={{ theme }}>{children}</ThemeContext>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
