import {
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";

// Crea el contexto sin tipos TypeScript
const ThemeContext = createContext(null);

const ThemeContextProvider = ({ children }) => {
  const [theme, setTheme] = useState(false);

  // Usa useCallback para evitar recrear la función en cada render
  const toggleTheme = useCallback(() => {
    setTheme((prev) => !prev);
    document.body.classList.toggle("dark");
  }, []);

  // Proporciona el estado y la función para cambiar el tema
  const value = {
    theme,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;

// Hook para usar el contexto en otros componentes
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === null) {
    throw new Error("Context must be used within a context provider");
  }
  return context;
};
