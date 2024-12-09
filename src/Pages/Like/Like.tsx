import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../../Services/Api";

const Like = () => {
  const [likedProducts, setLikedProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const proId = localStorage.getItem("proId");

        if (proId) {
          const products = await getProducts();
          const likedProductsData = products.filter((product: any) =>
            localStorage.getItem("likedProducts")?.includes(product.id)
          );

          setLikedProducts(likedProductsData);
        } else {
          setError("هیچ پروفایلی شناسایی نشد");
        }
      } catch (error) {
        console.error("Error fetching liked products:", error);
        setError("خطا در بارگذاری داده‌ها");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p className="text-gray-500">در حال بارگذاری...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center py-10">
      <h1 className="text-3xl font-semibold text-gray-800 mb-5">
        محصولات لایک‌شده
      </h1>

      {likedProducts.length === 0 ? (
        <p className="text-lg text-gray-500">هیچ محصولی لایک نشده است</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {likedProducts.map((item, index) => (
            <div
              key={index}
              className="bg-white p-5 rounded-lg shadow-lg hover:shadow-xl transition-all"
            >
              <img
                src={item.imguser}
                alt="product"
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <h2 className="text-xl font-semibold text-gray-700">
                {item.name}
              </h2>
              <p className="text-gray-500">قیمت: {item.price} تومان</p>
              <Link
                to={`/product/${item.id}`}
                className="text-blue-500 mt-3 inline-block"
              >
                مشاهده جزئیات
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Like;
