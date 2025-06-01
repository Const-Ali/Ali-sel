import { useEffect, useState } from "react";
import axios from "axios";
import TextTitle from "../PropComponents/TextTitle";
import { IOrders, IProduct } from "../../Types/servers_type";
import InvoicSvg from "../SVG/InvoicSvg";
import ModalFactorCom from "../Alert/ModalFactorCom";

function OrderStepOne() {
  const [orders, setOrders] = useState<IOrders[]>([]);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<IOrders | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:8001/orders");
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, []);

  const handleDeleteOrder = async () => {
    if (orderToDelete) {
      try {
        await axios.delete(`http://localhost:8001/orders/${orderToDelete}`);
        setOrders((prevOrders) =>
          prevOrders.filter((order) => order.id !== orderToDelete)
        );
        setIsDeleteModalOpen(false);
        setOrderToDelete(null);
      } catch (error) {
        console.error("Error deleting order:", error);
      }
    }
  };
  const handleStatusChange = async () => {
    if (selectedOrderId) {
      try {
        await axios.patch(`http://localhost:8001/orders/${selectedOrderId}`, {
          category: "ارسال شده",
        });
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.id === selectedOrderId
              ? { ...order, category: "ارسال شده" }
              : order
          )
        );
      } catch (error) {
        console.error("Error updating order status:", error);
      } finally {
        setIsOrderModalOpen(false);
        setSelectedOrderId(null);
        setIsModalOpen(false);
      }
    }
  };

  const handleShowInvoice = (order: IOrders) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:8001/orders");
        setOrders(response.data);
        console.log("Orders:", response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();

    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8001/products");
        setProducts(response.data);
        console.log("Products:", response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const getProductDetails = (productId: number) => {
    console.log("Searching for product ID:", productId);
    return products.find((product) => product.id === productId);
  };

  return (
    <div className="container mx-auto">
      <div className="pb-7">
        <TextTitle value="سفارشات در حال پردازش" />
      </div>

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">عملیات</th>
            <th className="border border-gray-300 p-2">وضعیت سفارش</th>
            <th className="border border-gray-300 p-2">زمان ثبت سفارش</th>
            <th className="border border-gray-300 p-2">نام و نام خانوادگی</th>
            <th className="border border-gray-300 p-2">شماره سفارش</th>
          </tr>
        </thead>
        <tbody>
          {orders
            .filter((order) => order.category === "در حال پردازش")
            .map((order) => (
              <tr key={order.id} className="text-center">
                <td className="border border-gray-300 p-2">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded mx-1"
                    onClick={() => {
                      setSelectedOrderId(order.id);
                      setIsOrderModalOpen(true);
                    }}
                  >
                    وضعیت به ارسال شده
                  </button>
                  <button onClick={() => handleShowInvoice(order)}>
                    <InvoicSvg />
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded mx-1"
                    onClick={() => {
                      setOrderToDelete(order.id);
                      setIsDeleteModalOpen(true);
                    }}
                  >
                    حذف سفارش
                  </button>
                </td>
                <td className="border border-gray-300 p-2">در حال پردازش</td>
                <td className="border border-gray-300 p-2">
                  <p>
                    {new Date(order.orderTime).toLocaleString("fa-IR", {
                      year: "numeric",
                      month: "2-digit",
                      day: "numeric",
                    })}
                  </p>
                  {new Date(order.orderTime).toLocaleString("fa-IR", {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  })}
                </td>
                <td className="border border-gray-300 p-2">
                  {order.user.firstName} {order.user.lastName}
                </td>
                <td className="border border-gray-300 p-2">{order.id}</td>
              </tr>
            ))}
        </tbody>
      </table>
      {isDeleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md">
            <h2 className="text-lg font-bold mb-4">تایید حذف</h2>
            <p>آیا مطمئن هستید که می‌خواهید این سفارش را حذف کنید؟</p>
            <div className="mt-4 flex justify-end">
              <button
                className="bg-gray-300 px-4 py-2 rounded mx-2"
                onClick={() => setIsDeleteModalOpen(false)}
              >
                انصراف
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={handleDeleteOrder}
              >
                حذف
              </button>
            </div>
          </div>
        </div>
      )}

      {isOrderModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <p>
              آیا مطمئن هستید که می‌خواهید وضعیت سفارش را به "ارسال شده" تغییر
              دهید؟
            </p>
            <div className="mt-4">
              <button
                onClick={handleStatusChange}
                className="bg-blue-500 text-white px-4 py-2 rounded mx-2"
              >
                تایید
              </button>
              <button
                onClick={() => setIsOrderModalOpen(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded mx-2"
              >
                انصراف
              </button>
            </div>
          </div>
        </div>
      )}
      <ModalFactorCom isOpen={isModalOpen} onClose={handleCloseModal}>
        {selectedOrder && (
          <div className="mt-8 p-6 border-2 border-gray-300 rounded-lg shadow-lg bg-white">
            <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
              جزئیات فاکتور
            </h3>
            <p className="text-lg text-gray-700 mb-2 flex justify-end items-center gap-x-2">
              <p> {selectedOrder.id}</p> <strong>: شماره سفارش</strong>
            </p>
            <p className="text-lg text-gray-700 mb-2 flex justify-end items-center gap-x-2">
              <p> {selectedOrder.category}</p> <strong>:وضعیت سفارش</strong>
            </p>
            <p className="text-lg text-gray-700 mb-2 flex justify-end items-center gap-x-2">
              <p>
                {new Date(selectedOrder.orderTime).toLocaleString("fa-IR", {
                  year: "numeric",
                  month: "2-digit",
                  day: "numeric",
                })}
              </p>
              <p>
                {new Date(selectedOrder.orderTime).toLocaleString("fa-IR", {
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                })}
              </p>
              <strong>: زمان ثبت سفارش</strong>
            </p>
            <p className="text-lg text-gray-700 mb-2 flex justify-end items-center gap-x-2">
              <p> {selectedOrder.user?.lastName}</p>
              <p>{selectedOrder.user?.firstName}</p>

              <strong>: نام و نام خانوادگی</strong>
            </p>

            {selectedOrder.products && selectedOrder.products.length > 0 && (
              <div className="mt-4">
                <h4 className="text-xl font-bold text-gray-800 mb-4 text-center">
                  محصولات سفارش
                </h4>
                <table className="w-full table-auto border-collapse border border-gray-300">
                  <thead>
                    <tr>
                      <th className="border border-gray-300 p-2">تعداد</th>
                      <th className="border border-gray-300 p-2">
                        عنوان محصول
                      </th>
                      <th className="border border-gray-300 p-2">
                        تصویر محصول
                      </th>
                      <th className="border border-gray-300 p-2">
                        شناسه محصول
                      </th>
                      <th className="border border-gray-300 p-2">ردیف </th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedOrder.products.map((product, index) => {
                      console.log("Order Product ID:", product.id);
                      getProductDetails(product.id);

                      return (
                        <tr key={product.id || index} className="text-center">
                          <td className="border border-gray-300 p-2">
                            {product.qty}
                          </td>
                          <td className="border border-gray-300 p-2">
                            {product.title}
                          </td>
                          <td className="border border-gray-300 p-2 ">
                            <img
                              className="w-24 "
                              src={
                                product.image instanceof URL
                                  ? product.image.toString()
                                  : product.image
                              }
                              alt={product.title}
                            />
                          </td>
                          <td className="border border-gray-300 p-2">
                            {product.id}
                          </td>
                          <td className="border border-gray-300 p-2 ">
                            {index + 1}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </ModalFactorCom>
    </div>
  );
}

export default OrderStepOne;
