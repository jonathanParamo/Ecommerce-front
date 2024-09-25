import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Home from "./pages/Home";
import Orders from "./pages/Orders";
import ProductListComponent from "./components/ProductList";
import Layout from "./Layout";
import ProductManager from "./pages/ProductManager";
import CategoriesManager from "./pages/CategoryManager";
import EditProductForm from "./components/EditProductForm";
import LowStockProducts from "./pages/LowStockProducts";
import Login from "./pages/Login";
import SalesChart from "./pages/Sales";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/app" element={<Layout />}>
          <Route index element={<Orders />} />
          <Route path="orders" element={<Orders />} />
          <Route path="product-list" element={<ProductListComponent />} />
          <Route path="create-product" element={<ProductManager />} />
          <Route path="category-manager" element={<CategoriesManager />} />
          <Route path="edit-product/:productId" element={<EditProductForm />} />
          <Route path="low-stock-products" element={<LowStockProducts />} />
          <Route path="sales" element={<SalesChart />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
