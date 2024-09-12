import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { store, persistor } from "./app/store.js";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import ThemeContextProvider from "./components/ThemeProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeContextProvider>
          <App />
        </ThemeContextProvider>
      </PersistGate>
    </Provider>
  </StrictMode>,
);
