import { useState, useEffect } from "react";
import Button from "../../Components/Button/Button";
import Cart_Item from "../../Components/Cart-Item/Cart_Item";
import Container from "../../Components/Container/Container";
import { useShop_Card_Cont } from "../context/Shop_Card_Cont";
import { getProduct } from "../../Services/Api";
import Spinner from "../../Components/Spinner/Spinner";
import { useNavigate } from "react-router-dom";

function Cart() {
  const { CartItems } = useShop_Card_Cont();
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const [discountCode, setDiscountCode] = useState("");
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    const fetchPrices = async () => {
      setLoading(true);
      try {
        const prices = await Promise.all(
          CartItems.map(async (item) => {
            const product = await getProduct(item.id);
            return product.price * item.qty;
          })
        );

        const total = prices.reduce((sum, price) => sum + price, 0);
        setTotalPrice(total);
      } catch (error) {
        console.error("Error fetching prices:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPrices();
  }, [CartItems]);

  const finalPrice = (totalPrice - discount).toFixed(2).toLocaleString();

  const handleApplyDiscount = () => {
    if (discountCode === "Ali10") {
      setDiscount(100);
    } else if (discountCode === "Ali20") {
      setDiscount(200);
    } else if (discountCode === "Ali30") {
      setDiscount(300);
    } else if (discountCode === "Ali40") {
      setDiscount(400);
    } else if (discountCode === "Ali50") {
      setDiscount(500);
    } else {
      setDiscount(0);
      alert("کد تخفیف نامعتبر است");
    }
  };

  const navigate = useNavigate();

  return (
    <div>
      <Container>
        <div>
          {CartItems.length > 0 ? (
            CartItems.map((item) => (
              <div key={item.id}>
                <Cart_Item {...item} />
              </div>
            ))
          ) : (
            <div>
              <h1>سبد خرید خالی است</h1>
            </div>
          )}
        </div>
        <div className="">
          {loading ? (
            <div className="absolute inset-0 flex items-end justify-center bg-gray-300 opacity-60">
              <Spinner />
            </div>
          ) : (
            <div className="bg-gray-200 flex justify-between items-center">
              <div className="p-5 flex items-center">
                <input
                  className="border rounded border-gray-600 p-2"
                  type="text"
                  placeholder="کد تخفیف را وارد کنید  Ali10"
                  value={discountCode}
                  onChange={(e) => setDiscountCode(e.target.value)}
                />
                <button
                  onClick={handleApplyDiscount}
                  className="pl-5 bg-green-400 text-white p-2 rounded ml-2"
                >
                  اعمال کد تخفیف
                </button>
              </div>
              <div className="rounded p-6 pl-40">
                <p className="text-right mb-5">
                  قیمت کل: {Number(totalPrice.toFixed(2)).toLocaleString()}{" "}
                  تومان
                </p>

                <p className="text-right mb-5">
                  تخفیف شما: {Number(discount.toFixed(2)).toLocaleString()}{" "}
                  تومان
                </p>
                <p className="text-right">
                  قیمت نهایی: {Number(finalPrice).toLocaleString()} تومان
                </p>
              </div>
            </div>
          )}
        </div>

        <Button
          className="mt-2"
          variant="success"
          onClick={() => navigate("/checkout")}
        >
          ثبت سفارش
        </Button>
      </Container>
    </div>
  );
}

export default Cart;
