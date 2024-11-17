import { useState, useEffect } from "react";
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
      setDiscount(100000);
    } else if (discountCode === "Ali20") {
      setDiscount(200000);
    } else if (discountCode === "Ali30") {
      setDiscount(300000);
    } else if (discountCode === "Ali40") {
      setDiscount(400000);
    } else if (discountCode === "Ali50") {
      setDiscount(500000);
    } else {
      setDiscount(0);
      alert("کد تخفیف نامعتبر است");
    }
  };

  const navigate = useNavigate();

  return (
    <div>
      <Container>
        <div className="mt-10">
          {CartItems.length > 0 ? (
            CartItems.map((item) => (
              <div key={item.id}>
                <Cart_Item {...item} />
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center my-20">
              <h1 className="font-mono text-5xl font-bold mb-16">
                سبد خرید خالی است
              </h1>
              <a href="/store">
                <h1 className="font-mono text-5xl font-bold text-blue-500">
                  صفحه محصولات
                </h1>
              </a>
            </div>
          )}
        </div>
        <div className="">
          {loading ? (
            <div className="absolute inset-0 flex items-end justify-center bg-gray-300 opacity-60">
              <Spinner />
            </div>
          ) : (
            <>
              <div className="bg-white rounded-md px-4 py-6 h-max shadow-[0_2px_12px_-3px_rgba(6,81,237,0.3)] mx-20 mt-20">
                <ul className="text-gray-800 space-y-4">
                  <li className="flex flex-wrap gap-4 text-sm">
                    قیمت کل سبد خرید
                    <span className="ml-auto font-bold">
                      {Number(totalPrice).toLocaleString("fa-IR")}
                    </span>
                    تومان
                  </li>
                  <li className="flex flex-wrap gap-4 text-sm">
                    تخفیف
                    <span className="ml-auto font-bold">
                      {Number(discount).toLocaleString("fa-IR")}
                    </span>
                    تومان
                  </li>
                  <li className="flex flex-wrap gap-4 text-sm">
                    مالیات
                    <span className="ml-auto font-bold">
                      {Number(totalPrice * 0.1).toLocaleString("fa-IR")}
                    </span>
                    تومان
                  </li>
                  <hr className="border-gray-300" />
                  <li className="flex flex-wrap gap-4 text-sm font-bold">
                    قیمت نهایی :
                    <span className="ml-auto">
                      {Number(
                        Number(finalPrice) + Number(totalPrice) * 0.1
                      ).toLocaleString("fa-IR")}
                    </span>
                    تومان
                  </li>
                </ul>

                <div className="mt-6 space-y-2">
                  <div className="p-1 flex items-center">
                    <input
                      className="border rounded border-gray-600 p-2"
                      type="text"
                      placeholder="کد تخفیف را وارد کنید  Ali10"
                      value={discountCode}
                      onChange={(e) => setDiscountCode(e.target.value)}
                    />
                    <button
                      onClick={handleApplyDiscount}
                      className="mx-3 text-sm px-4 py-2.5 font-bold tracking-wide bg-gray-800 hover:bg-gray-900 text-white rounded-md"
                    >
                      اعمال کد تخفیف
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => navigate("/checkout")}
                    className="text-sm px-4 py-2.5 w-full font-semibold tracking-wide bg-gray-800 hover:bg-gray-900 text-white rounded-md"
                  >
                    ثبت سفارش
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate("/store")}
                    className="text-sm px-4 py-2.5 w-full font-semibold tracking-wide bg-transparent hover:bg-gray-100 text-gray-800 border border-gray-300 rounded-md"
                  >
                    بازگشت به صفحه محصولات
                  </button>
                </div>

                <div className="mt-4 flex flex-wrap justify-center gap-4">
                  <img
                    src="https://readymadeui.com/images/master.webp"
                    alt="card1"
                    className="w-10 object-contain"
                  />
                  <img
                    src="https://readymadeui.com/images/visa.webp"
                    alt="card2"
                    className="w-10 object-contain"
                  />
                  <img
                    src="https://readymadeui.com/images/american-express.webp"
                    alt="card3"
                    className="w-10 object-contain"
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </Container>
    </div>
  );
}

export default Cart;
