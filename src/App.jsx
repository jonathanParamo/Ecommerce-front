import {
  BrowserRouter
  as
  Router,
  Route,
  Routes,
} from"react-router-dom";
import Home from "./pages/Home"
import Example from "./pages/Example";
import ProductListComponent from "./components/ProductList";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./utils/global";
import { useSelector } from 'react-redux';
import PrefferedThemeProvider from './components/ThemeProvider';
import Layout from "./Layout";

function App() {
  const theme = useSelector((state) => state.theme.currentTheme);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <PrefferedThemeProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="exa" element={<Example />} />
              <Route path="list" element={<ProductListComponent />} />
            </Route>
          </Routes>
        </Router>
      </PrefferedThemeProvider>
    </ThemeProvider>
  )
}

export default App
