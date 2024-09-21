import { createContext, useContext, useEffect, useState } from "react";
import { useLocalStorage } from "../../Hooks/useLocalStorage";
import { login } from "../../Services/Api";
import { useNavigate } from "react-router-dom";

interface Shop_Card_Pro {
  children: React.ReactNode;
}

interface CartItems {
  id: number;
  qty: number;
}
interface Shop_Card_Cont {
  CartItems: CartItems[];
  handleIncreaseProductQty: (id: number) => void;
  handleDecreaseProductQty: (id: number) => void;
  handleRemoveProductQty: (id: number) => void;
  getProductQty: (id: number) => number;
  handleLogin: (username: string, password: string) => void;
  handleLogout: () => void;
  cartQty: number;
  isLogin: boolean;
}

//export const Shop_Card_Cont = createContext<Shop_Card_Cont>({  CartItem: [],});

export const Shop_Card_Cont = createContext({} as Shop_Card_Cont);
export const useShop_Card_Cont = () => {
  return useContext(Shop_Card_Cont);
};

export function Shop_Card_Pro({ children }: Shop_Card_Pro) {
  const [CartItems, setCartItems] = useLocalStorage<CartItems[]>(
    "cartItems",
    []
  );
  // const [CartItems1, setCartItems]1 = useLocalStorage<CartItem[]>("cartItem",[]);

  // localStorage.setItem("name", "salar");

  const handleIncreaseProductQty = (id: number) => {
    setCartItems((currentItems) => {
      let selectedItem = currentItems.find((item) => item.id == id);
      if (selectedItem == null) {
        return [...currentItems, { id: id, qty: 1 }];
      } else {
        return currentItems.map((item) => {
          if (item.id == id) {
            return {
              ...item,
              qty: item.qty + 1,
            };
          } else {
            return item;
          }
        });
      }
    });
  };

  const handleDecreaseProductQty = (id: number) => {
    setCartItems((currentItems) => {
      let selectedItem = currentItems.find((item) => item.id == id);
      if (selectedItem?.qty === 1) {
        return currentItems.filter((item) => item.id !== id);
      } else {
        return currentItems.map((item) => {
          if (item.id == id) {
            return {
              ...item,
              qty: item.qty - 1,
            };
          } else {
            return item;
          }
        });
      }
    });
  };

  const getProductQty = (id: number) => {
    return CartItems.find((item) => item.id == id)?.qty || 0;
  };

  const handleRemoveProductQty = (id: number) => {
    setCartItems((currentItems) =>
      currentItems.filter((item) => item.id != id)
    );
  };

  const cartQty = CartItems.reduce((totalQty, item) => totalQty + item.qty, 0);

  const [isLogin, setIsLogin] = useState(false);

  const navigate = useNavigate();

  const handleLogin = (username: string, password: string) => {
    login(username, password).finally(() => {
      let token = "eyJhbGciOiJIUzI1NiIsInR";
      localStorage.setItem("token", token);
      setIsLogin(true);
      navigate("/");
    });
  };

  const handleLogout = () => {
    setIsLogin(false);
    navigate("/login");
    localStorage.removeItem("token");
  };

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      setIsLogin(true);
    }
  });

  return (
    <Shop_Card_Cont.Provider
      value={{
        CartItems,
        handleIncreaseProductQty,
        handleDecreaseProductQty,
        getProductQty,
        handleRemoveProductQty,
        handleLogin,
        handleLogout,
        isLogin,
        cartQty,
      }}
    >
      {children}
    </Shop_Card_Cont.Provider>
  );
}
