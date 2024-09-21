import { Navigate, Outlet } from "react-router-dom";
import { useShop_Card_Cont } from "../../Pages/context/Shop_Card_Cont";

function PrivateRoute() {
  const { isLogin } = useShop_Card_Cont();
  return <>{isLogin ? <Outlet /> : <Navigate to="/login" />}</>;
}

export default PrivateRoute;
