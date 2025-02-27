import { useEffect, useState } from "react";
import axios from "axios";

interface Product {
  id: number;
  qty: number;
  title: string;
  image: string;
}

interface User {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

interface Address {
  line: string;
  city: string;
  state: string;
  zipCode: string;
}

interface Order {
  id: string;
  category: string;
  products: Product[];
  user: User;
  address: Address;
  orderTime: string;
}

interface NavComOneProps {
  onClose: () => void;
}

function NavComOne({ onClose }: NavComOneProps) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [filter, setFilter] = useState<string>("همه");

  const userId = JSON.parse(localStorage.getItem("user") || "null")?.id;

  useEffect(() => {
    if (userId) {
      axios
        .get(`http://localhost:8001/orders?userId=${userId}`)
        .then((response) => {
          setOrders(response.data);
          setFilteredOrders(response.data);
        })
        .catch((error) => {
          console.error("Failed to fetch orders:", error);
        });
    }
  }, [userId]);

  useEffect(() => {
    if (filter === "همه") {
      setFilteredOrders(orders);
    } else {
      setFilteredOrders(orders.filter((order) => order.category === filter));
    }
  }, [filter, orders]);

  if (!orders.length)
    return <p className="text-center text-gray-600">سفارشی یافت نشد.</p>;

  return (
    <div>
      <div className="fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto font-[sans-serif]">
        <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-8 relative">
          <div className="flex items-center justify-between">
            <h3 className="text-gray-600 text-2xl font-bold text-right">
              سفارشات شما
            </h3>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-3 ml-2 cursor-pointer shrink-0 fill-gray-400 hover:fill-red-500"
              viewBox="0 0 320.591 320.591"
              onClick={onClose}
            >
              <path d="..."></path>
            </svg>
          </div>

          <div className="mt-4">
            <label className="text-gray-700 text-sm mb-2 block">
              فیلتر سفارشات بر اساس وضعیت:
            </label>
            <select
              className="w-full p-2 border rounded-lg bg-gray-100 text-gray-700"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="همه">همه</option>
              <option value="بسته شده">بسته شده</option>
              <option value="در حال پردازش">در حال پردازش</option>
              <option value="ارسال شده">ارسال شده</option>
              <option value="لغو شده">لغو شده</option>
            </select>
          </div>

          <div className="mt-6 max-h-[400px] overflow-y-auto">
            <ul className="space-y-6">
              {filteredOrders.map((order) => (
                <li key={order.id} className="p-4 border rounded-lg bg-gray-50">
                  <h4 className="text-lg font-bold text-gray-700 mb-2">
                    سفارش #{order.id} - {order.category}
                  </h4>
                  <p className="text-sm text-gray-500">
                    <strong>تاریخ ثبت:</strong>{" "}
                    {new Date(order.orderTime).toLocaleDateString("fa-IR")}
                  </p>

                  <div className="mt-4">
                    <h5 className="text-md font-bold text-gray-800 mb-2">
                      محصولات سفارش داده شده:
                    </h5>
                    {order.products.map((product) => (
                      <div
                        key={product.id}
                        className="flex items-center gap-4 border-b pb-2 mb-2"
                      >
                        <img
                          src={product.image}
                          alt={product.title}
                          className="w-16 h-16 object-cover rounded-md"
                        />
                        <div>
                          <p className="text-gray-700 font-semibold">
                            {product.title}
                          </p>
                          <p className="text-gray-500 text-sm">
                            <strong>تعداد:</strong> {product.qty}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4">
                    <h5 className="text-md font-bold text-gray-800 mb-2">
                      مشخصات مشتری:
                    </h5>
                    <p className="text-gray-600">
                      {order.user.firstName} {order.user.lastName}
                    </p>
                    <p className="text-gray-500 text-sm">
                      📧 {order.user.email} | 📞 {order.user.phone}
                    </p>
                  </div>

                  <div className="mt-4">
                    <h5 className="text-md font-bold text-gray-800 mb-2">
                      آدرس تحویل:
                    </h5>
                    <p className="text-gray-600">
                      {order.address.line}, {order.address.city},{" "}
                      {order.address.state}, {order.address.zipCode}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex justify-end gap-4 !mt-8">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 rounded-lg text-gray-800 text-sm border-none outline-none tracking-wide bg-gray-200 hover:bg-gray-300"
            >
              بستن
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavComOne;
