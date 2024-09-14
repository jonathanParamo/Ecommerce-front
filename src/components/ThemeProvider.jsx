import { createContext, useCallback, useContext, useEffect, useState } from "react";

// Crea el contexto
const ThemeContext = createContext(null);

const ThemeContextProvider = ({ children }) => {
  // Inicializa el estado del tema basado en el almacenamiento local
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark'; // Si el valor es 'dark', establece el tema en oscuro
  });

  // Usa useCallback para evitar recrear la función en cada render
  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const newTheme = !prev;
      // Guarda el nuevo estado en localStorage
      localStorage.setItem('theme', newTheme ? 'dark' : 'light');
      // Alterna la clase en el body
      document.body.classList.toggle("dark", newTheme);
      return newTheme;
    });
  }, []);

  // Efecto para aplicar el tema al cargar
  useEffect(() => {
    document.body.classList.toggle("dark", theme);
  }, [theme]);

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
