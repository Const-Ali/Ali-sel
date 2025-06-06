import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ImageWithSkeleton from "../../Components/Image/ImageWithSkeleton";
import Container from "../../Components/Container/Container";

const Like = () => {
  const [likedProducts, setLikedProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<
    string | number | null
  >(null);

  useEffect(() => {
    const fetchLikedProducts = () => {
      try {
        const storedLikes = localStorage.getItem("likes");
        const user = JSON.parse(localStorage.getItem("user") || "{}");

        if (!storedLikes || !user?.id) {
          setError("کاربر وارد نشده یا اطلاعات لایک موجود نیست");
          setLoading(false);
          return;
        }

        const parsedLikes = JSON.parse(storedLikes);
        const userLikes = parsedLikes.filter(
          (item: any) => item.userId === user.id && item.isLiked
        );

        setLikedProducts(userLikes);
      } catch (error) {
        console.error("Error loading liked products:", error);
        setError("خطا در بارگذاری محصولات لایک‌شده");
      } finally {
        setLoading(false);
      }
    };

    fetchLikedProducts();
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

  const handleRemoveLike = (productId: string | number) => {
    const storedLikes = localStorage.getItem("likes");
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    if (!storedLikes || !user?.id) return;

    const parsedLikes = JSON.parse(storedLikes);

    const updatedLikes = parsedLikes
      .map((item: any) => {
        if (item.id === String(productId) && item.userId === user.id) {
          return { ...item, isLiked: false };
        }
        return item;
      })
      .filter(
        (item: any) =>
          !(
            item.id === String(productId) &&
            item.userId === user.id &&
            item.isLiked === false
          )
      ); // حذف از UI

    localStorage.setItem("likes", JSON.stringify(updatedLikes));
    setLikedProducts(
      updatedLikes.filter(
        (item: any) => item.userId === user.id && item.isLiked
      )
    );
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center py-10">
      <h1 className="text-3xl font-semibold text-gray-800 mb-5">
        محصولات مورد علاقه شما
      </h1>

      {likedProducts.length === 0 ? (
        <p className="text-lg text-gray-500">هیچ محصولی لایک نشده است</p>
      ) : (
        <Container>
          <div className="flex  justify-start gap-6">
            {likedProducts.map((item) => (
              <div
                key={item.id}
                className="bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition-all flex flex-col items-end w-full sm:w-[48%] lg:w-[31%]"
              >
                <ImageWithSkeleton
                  src={item.image}
                  alt={item.title}
                  className="w-full h-48 object-contain object-center rounded-lg bg-gray-200"
                />
                <h2 className="text-xl font-bold text-right text-gray-800 leading-relaxed line-clamp-2">
                  {item.title}
                </h2>

                <p className="text-sm text-right text-gray-600 mt-2">
                  قیمت: {item.price.toLocaleString("fa-IR")} تومان
                </p>
                <div className="flex flex-row-reverse gap-3 mt-4 w-full">
                  <Link
                    to={`/product/${item.id}`}
                    className="flex-1 text-center text-sm px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
                  >
                    مشاهده کالا
                  </Link>
                  <button
                    onClick={() => {
                      setSelectedProductId(item.id);
                      setShowConfirmModal(true);
                    }}
                    className="flex-1 text-center text-sm px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600 transition"
                  >
                    حذف
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Container>
      )}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-md shadow-md p-6 w-80 text-center">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              حذف از علاقه‌مندی‌ها
            </h2>
            <p className="text-sm text-gray-600 mb-6">
              آیا مطمئن هستید که می‌خواهید این محصول از لیست علاقه مندی ها حذف
              کنید؟
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => {
                  handleRemoveLike(selectedProductId!);
                  setShowConfirmModal(false);
                }}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
              >
                بله، حذف کن
              </button>
              <button
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition"
              >
                لغو
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Like;
