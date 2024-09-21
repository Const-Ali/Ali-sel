import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Store from "./Pages/Store/Store";
import Layout from "./Components/Layout/Layout";
import Product from "./Pages/Product/Product";
import Test from "./Pages/Test/Test";
import Cart from "./Pages/Cart/Cart";
import { useShop_Card_Cont } from "../src/Pages/context/Shop_Card_Cont";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";
import Login from "./Pages/Login/Login";

function App() {
  // const [CartItem, SetCartItem] = useState([]);
  const { isLogin } = useShop_Card_Cont();
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/store" element={<Store />} />
        <Route path="/Product/:id" element={<Product />} />
        <Route path="/Test" element={<Test />} />
        <Route
          path="/login"
          element={isLogin ? <Navigate to="/" /> : <Login />}
        />
        <Route element={<PrivateRoute />}>
          <Route path="/Cart" element={<Cart />} />
        </Route>
      </Routes>
    </Layout>
  );
}

export default App;
