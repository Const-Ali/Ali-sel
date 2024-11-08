import { useEffect, useState } from "react";
import axios from "axios";
import Container from "../../Components/Container/Container";

function Checkout() {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [productsData, setProductsData] = useState<any[]>([]);

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

  return (
    <Container>
      <div className="font-[sans-serif] bg-white">
        <div className="flex max-sm:flex-col gap-12 max-lg:gap-4 h-full">
          <div className="bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 h-full sm:sticky sm:top-0 lg:min-w-[370px] sm:min-w-[300px]">
            <div className="relative h-full">
              <div className="px-4 py-8 sm:overflow-auto sm:h-[calc(100vh-60px)]">
                {productsData.map((product, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 my-2 border border-gray-600 rounded-lg"
                  >
                    <div className="w-32 h-28 max-lg:w-24 max-lg:h-24 flex p-3 shrink-0 bg-gray-300 rounded-md">
                      <img
                        src={product.image}
                        className="w-full object-contain"
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
                    <p className="mx-2">ريال</p>
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
            <h2 className="text-2xl font-bold text-gray-800">
              Complete your order
            </h2>
            <form className="mt-8">
              <div>
                <h3 className="text-base text-gray-800 mb-4">
                  Personal Details
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      placeholder="First Name"
                      className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600"
                    />
                  </div>

                  <div>
                    <input
                      type="text"
                      placeholder="Last Name"
                      className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600"
                    />
                  </div>

                  <div>
                    <input
                      type="email"
                      placeholder="Email"
                      className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600"
                    />
                  </div>

                  <div>
                    <input
                      type="number"
                      placeholder="Phone No."
                      className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-base text-gray-800 mb-4">
                  Shipping Address
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      placeholder="Address Line"
                      className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="City"
                      className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="State"
                      className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Zip Code"
                      className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600"
                    />
                  </div>
                </div>

                <div className="flex gap-4 max-md:flex-col mt-8">
                  <button
                    type="button"
                    className="rounded-md px-6 py-3 w-full text-sm tracking-wide bg-transparent hover:bg-gray-100 border border-gray-300 text-gray-800 max-md:order-1"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="rounded-md px-6 py-3 w-full text-sm tracking-wide bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Complete Purchase
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Checkout;
