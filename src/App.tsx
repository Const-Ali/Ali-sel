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
import Aboute from "./Pages/Aboute/Aboute";
import Checkout from "./Pages/Checkout.tsx/Checkout";
import ManagementPanel from "./Pages/Management panel/Management panel";
import ErrorPage from "./Pages/Error/ErrorPage";
import ManagementUser from "./Pages/Management panel/Management User";
import Pro4itemsOne from "./Pages/Product/Pro4itemsOne";
import Pro4itemsTwo from "./Pages/Product/Pro4itemsTwo";
import Pro4itemsThree from "./Pages/Product/Pro4itemsThree";
import Pro4itemsFour from "./Pages/Product/Pro4itemsFour";
import CreateAccount from "./Pages/Login/CreateAccount";
import ProCollectionOne from "./Pages/Product/ProCollectionOne";
import ConectUs from "./Pages/Aboute/ConectUs";
import Terms from "./Pages/Aboute/Terms";
import CollectionOne from "./Pages/Product/CollectionOne";

function App() {
  const { isLogin } = useShop_Card_Cont();
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Store" element={<Store />} />
        <Route path="/Product/:id" element={<Product />} />
        <Route path="/Aboute" element={<Aboute />} />
        <Route path="/Pro4itemsOne" element={<Pro4itemsOne />} />
        <Route path="/Pro4itemsTwo" element={<Pro4itemsTwo />} />
        <Route path="/Pro4itemsThree" element={<Pro4itemsThree />} />
        <Route path="/Pro4itemsFour" element={<Pro4itemsFour />} />
        <Route path="/ProCollectionOne" element={<ProCollectionOne />} />
        <Route path="/ConectUs" element={<ConectUs />} />
        <Route path="/Terms" element={<Terms />} />
        <Route path="/CollectionOne" element={<CollectionOne />} />
        <Route path="/Test" element={<Test />} />
        <Route
          path="/login"
          element={isLogin ? <Navigate to="/" /> : <Login />}
        />
        <Route path="/CreateAccount" element={<CreateAccount />} />
        <Route element={<PrivateRoute />}>
          <Route path="/Cart" element={<Cart />} />
          <Route path="/Checkout" element={<Checkout />} />
          <Route path="/Managementpanel" element={<ManagementPanel />} />
          <Route path="/ManagementUser" element={<ManagementUser />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
