import { ThemeProvider } from 'styled-components';
import { useSelector } from 'react-redux';
import { GlobalStyles } from '../utils/global';

const PrefferedThemeProvider = ({ children }) => {
  const currentTheme = useSelector((state) => state.theme.currentTheme);

  return (
    <ThemeProvider theme={currentTheme}>
      <GlobalStyles />
      {children}
    </ThemeProvider>
  );
};

export default PrefferedThemeProvider;
