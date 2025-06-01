import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Container from "../../Components/Container/Container";

function Checkout() {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [productsData, setProductsData] = useState<any[]>([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState<number>(0);
  const [address, setAddress] = useState<string>("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCartItems = localStorage.getItem("cartItems");

    if (storedCartItems) {
      const parsedItems = JSON.parse(storedCartItems);
      setCartItems(parsedItems);

      const productIds = parsedItems.map((item: any) => item.id);

      const fetchData = async () => {
        const fetchedProducts: any[] = [];

        for (let id of productIds) {
          try {
            const response = await axios.get(
              `http://localhost:8001/products/${id}`
            );
            if (
              !fetchedProducts.find(
                (product) => product.id === response.data.id
              )
            ) {
              fetchedProducts.push(response.data);
            }
          } catch (error) {
            console.error("Error fetching product:", error);
          }
        }
        setProductsData(fetchedProducts);
      };

      fetchData();
    }
  }, []);

  const handleOrderSubmit = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    const orderData = {
      category: "در حال پردازش",
      products: cartItems.map((item, index) => ({
        id: item.id,
        qty: item.qty,
        title: productsData[index]?.title,
        image: productsData[index]?.image,
      })),
      user: {
        firstName,
        lastName,
        email,
        phone,
      },
      address: {
        line: address,
        city,
        state,
        zipCode,
      },
      orderTime: new Date().toISOString(),
    };

    try {
      await axios.post("http://localhost:8001/orders", orderData);
      setSuccessMessage("سفارش شما با موفقیت ثبت شد.");
      setIsModalOpen(true);

      localStorage.removeItem("cartItems");

      setTimeout(() => {
        window.location.reload();
        navigate("/");
      }, 5000);
    } catch (error) {
      setErrorMessage("خطا در ثبت سفارش، لطفاً دوباره تلاش کنید.");
      console.error("Error submitting order:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container>
      <div className="font-[sans-serif] bg-white py-10">
        <div className="flex max-sm:flex-col gap-12 max-lg:gap-4">
          <div className="flex flex-col rounded bg-gradient-to-r from-gray-500 via-gray-400 to-gray-500 sm:sticky sm:top-0 lg:min-w-[370px] sm:min-w-[300px]">
            <div className="flex h-full">
              <div className="px-4 py-8 sm:overflow-auto mb-16">
                {productsData.map((product, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 my-2 border border-gray-600 rounded-lg"
                  >
                    <div className="w-32 h-28 max-lg:w-24 max-lg:h-24 flex p-3 shrink-0 bg-gray-300 rounded-md">
                      <img
                        src={product.image}
                        className="w-full object-contain rounded"
                      />
                    </div>
                    <div className="w-full">
                      <h3 className="text-base text-white line-clamp-2">
                        {product.title || "Loading..."}
                      </h3>
                      <p className="text-gray-300 mr-5 mt-2">
                        تعداد
                        <span className="float-right">
                          {cartItems[index]?.qty || 1}
                        </span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="md:absolute md:left-0 md:bottom-0 bg-gray-800 w-full p-4">
                <h4 className="flex flex-wrap gap-4 text-base text-white">
                  مجموع
                  <span className="ml-auto flex ">
                    <p className="mx-2">تومان</p>
                    {(
                      productsData.reduce(
                        (total, product, index) =>
                          total + product.price * (cartItems[index]?.qty || 1),
                        0
                      ) * 1.1
                    ).toLocaleString("fa-IR")}
                  </span>
                </h4>
              </div>
            </div>
          </div>

          <div className="max-w-4xl w-full h-max rounded-md px-4 py-8 sticky top-0">
            <h2 className="text-4xl font-bold text-gray-800">
              تکمیل کردن سفارش
            </h2>
            <form className="mt-8">
              <div>
                <h3 className="text-2xl text-gray-800 mb-4">مشخصات </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      placeholder="First Name"
                      className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-gray-600"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>

                  <div>
                    <input
                      type="text"
                      placeholder="Last Name"
                      className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-gray-600"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>

                  <div>
                    <input
                      type="email"
                      placeholder="Email"
                      className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-gray-600"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div>
                    <input
                      type="text"
                      placeholder="Phone"
                      className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-gray-600"
                      value={phone}
                      onChange={(e) => setPhone(+e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-2xl text-gray-800 mb-4">آدرس</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      placeholder="آدرس"
                      className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-gray-600"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="شهر"
                      className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-gray-600"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                  </div>

                  <div>
                    <input
                      type="text"
                      placeholder="استان"
                      className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-gray-600"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                    />
                  </div>

                  <div>
                    <input
                      type="text"
                      placeholder="کد پستی"
                      className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-gray-600"
                      value={zipCode}
                      onChange={(e) => setZipCode(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <button
                  type="button"
                  className="w-full bg-green-600 text-white py-3 rounded-md"
                  onClick={handleOrderSubmit}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "در حال ارسال..." : "ثبت سفارش"}
                </button>
              </div>
            </form>
          </div>
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
            <div className="bg-white p-8 rounded-md shadow-lg max-w-sm mx-auto text-center">
              <h3 className="text-xl font-semibold text-green-600">
                سفارش شما با موفقیت ثبت شد
              </h3>
              <button
                className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-md"
                onClick={() => setIsModalOpen(false)}
              >
                بستن
              </button>
            </div>
          </div>
        )}
        {successMessage && (
          <div className="mt-4 text-green-600 text-xl">{successMessage}</div>
        )}
        {errorMessage && (
          <div className="mt-4 text-red-600 text-xl">{errorMessage}</div>
        )}
      </div>
    </Container>
  );
}

export default Checkout;
