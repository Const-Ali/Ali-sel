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
          <div className="flex flex-wrap justify-center gap-6">
            {likedProducts.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-5 cursor-pointer hover:-translate-y-2 transition-all relative flex flex-col h-full w-full sm:w-[48%] lg:w-[31%]"
              >
                <div className="relative w-5/6 h-[210px] overflow-hidden mx-auto mb-4 rounded-xl">
                  <div className="absolute top-3 right-3 z-20">
                    <button
                      onClick={() => {
                        setSelectedProductId(item.id);
                        setShowConfirmModal(true);
                      }}
                      className="bg-pink-100 w-9 h-9 flex items-center justify-center rounded-full hover:bg-pink-200 hover:scale-105 transition duration-200"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16px"
                        className="fill-gray-800 hover:fill-red-600 transition duration-200"
                        viewBox="0 0 64 64"
                      >
                        <path d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z" />
                      </svg>
                    </button>
                  </div>

                  <ImageWithSkeleton
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-contain"
                    classNameWrapper="w-full h-full rounded-xl"
                  />
                </div>

                <div className="line-clamp-4 flex flex-col justify-between h-full">
                  <h3 className="text-lg font-extrabold text-gray-800 line-clamp-2 text-right">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm mt-2 line-clamp-2 text-right">
                    {item.description}
                  </p>
                  <div className="flex items-center mt-4 gap-2 line-clamp-1 justify-end">
                    <h1>تومان</h1>
                    <h4 className="text-lg text-gray-800 font-bold">
                      {item.price.toLocaleString("fa-IR")}
                    </h4>
                  </div>
                </div>

                <div className="flex flex-row-reverse gap-3 mt-5 w-full">
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
