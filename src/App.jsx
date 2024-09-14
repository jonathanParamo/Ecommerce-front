import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Home from "./pages/Home";
import Example from "./pages/Example";
import ProductListComponent from "./components/ProductList";
import Layout from "./Layout";
import ProductManager from "./pages/ProductManager";
import CategoriesManager from "./pages/CategoryManager";
import EditProductForm from "./components/EditProductForm";
import LowStockProducts from "./pages/LowStockProducts";
import Login from "./pages/Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="exa" element={<Example />} />
          <Route path="product-list" element={<ProductListComponent />} />
          <Route path="create-product" element={<ProductManager />} />
          <Route path="category-manager" element={<CategoriesManager />} />
          <Route path="edit-product/:productId" element={<EditProductForm />} />
          <Route path="low-stock-products" element={<LowStockProducts />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
