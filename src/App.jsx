import {
  BrowserRouter
  as
  Router,
  Route,
  Routes,
} from"react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Example from "./pages/Example";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/exa" element={<Example />} />
      </Routes>
    </Router>
  )
}

export default App
