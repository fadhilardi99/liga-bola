import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";

type Theme = "light" | "dark" | "system";

interface ThemeContextState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  isDarkMode: boolean;
}

const ThemeContext = createContext<ThemeContextState | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // Use stored theme or default to system
  const [theme, setTheme] = useState<Theme>(() => {
    const storedTheme = localStorage.getItem("theme") as Theme | null;
    return storedTheme || "system";
  });

  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  // Detect system preference
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");

  const updateTheme = (selectedTheme: Theme) => {
    const root = window.document.documentElement;

    // Remove previous classes
    root.classList.remove("light", "dark");

    // Determine which theme to use
    const resolvedTheme =
      selectedTheme === "system"
        ? prefersDark.matches
          ? "dark"
          : "light"
        : selectedTheme;

    // Add the appropriate class
    root.classList.add(resolvedTheme);
    setIsDarkMode(resolvedTheme === "dark");

    // Store the user preference
    localStorage.setItem("theme", selectedTheme);
  };

  // Handler for system preference changes
  const handleSystemPreferenceChange = () => {
    if (theme === "system") {
      updateTheme("system");
    }
  };

  // Apply theme when component mounts and when theme changes
  useEffect(() => {
    updateTheme(theme);

    // Listen for system preference changes
    prefersDark.addEventListener("change", handleSystemPreferenceChange);

    return () => {
      prefersDark.removeEventListener("change", handleSystemPreferenceChange);
    };
  }, [theme]);

  const value = {
    theme,
    setTheme: (newTheme: Theme) => {
      setTheme(newTheme);
      updateTheme(newTheme);
    },
    isDarkMode,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextState => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
