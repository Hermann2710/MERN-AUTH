import { createContext, useState, ReactNode, useEffect } from "react";

export interface ThemeState {
  theme: string;
  toggleTheme?: () => void;
}

export const ThemeContext = createContext({ theme: "light" } as ThemeState);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    localStorage.setItem("theme", theme === "light" ? "dark" : "light");
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme) {
      setTheme(theme);
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <main data-theme={theme} className="h-screen w-screen relative">
        {children}
      </main>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
