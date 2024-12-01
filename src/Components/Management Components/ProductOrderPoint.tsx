import { useState, useEffect } from "react";
import { getProducts } from "../../Services/Api";
import { IProduct } from "../../Types/servers_type";
import TextTitle from "../PropComponents/TextTitle";
import DeleteSvg from "../SVG/DeleteSvg";
import EditSvg from "../SVG/EditSvg";

function ProductOrderPoint() {
  const [products, setProducts] = useState<IProduct[]>([]);

  const [search, setSearch] = useState("");
  const [sortOption, setSortOption] = useState("جدیدترین");

  useEffect(() => {
    const fetchProductsAndCategories = async () => {
      try {
        const productsData: IProduct[] = await getProducts();
        const normalizedProducts = productsData.map((product) => ({
          ...product,
          id: Number(product.id),
        }));
        setProducts(normalizedProducts);
      } catch (error) {
        console.error("Error fetching products or categories:", error);
      }
    };

    fetchProductsAndCategories();
  }, []);

  const sortedProducts = () => {
    switch (sortOption) {
      case "جدیدترین":
        return [...products].sort((a, b) =>
          a.createdAt < b.createdAt ? 1 : -1
        );
      case "ارزان‌ترین":
        return [...products].sort((a, b) => a.price - b.price);
      case "گران‌ترین":
        return [...products].sort((a, b) => b.price - a.price);
      case "پرفروش‌ترین":
        return [...products].sort((a, b) => b.rating.rate - a.rating.rate);
      case "پربازدیدترین":
        return [...products].sort((a, b) => b.rating.count - a.rating.count);
      default:
        return products;
    }
  };

  const filteredProducts = sortedProducts().filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mx-auto">
      <TextTitle value="لیست کالاهای سایت" />

      <form className="max-w-md mx-auto w-full p-5">
        <div className="flex items-center gap-6 flex-row">
          <div className="relative w-full">
            <input
              className="block w-full p-4 pe-10 text-sm text-gray-600 border border-gray-400 rounded-lg"
              placeholder="جستجوی محصولات"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className="absolute inset-y-0 end-0 flex items-center pe-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
          </div>
          <select
            className="p-2 border border-gray-400 rounded-lg"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="جدیدترین">جدیدترین</option>
            <option value="ارزان‌ترین">ارزان‌ترین</option>
            <option value="گران‌ترین">گران‌ترین</option>
            <option value="پرفروش‌ترین">پرفروش‌ترین</option>
            <option value="پربازدیدترین">پربازدیدترین</option>
          </select>
        </div>
      </form>

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">عملیات</th>
            <th className="border border-gray-300 p-2">موجودی</th>
            <th className="border border-gray-300 p-2">قیمت</th>
            <th className="border border-gray-300 p-2">دسته‌بندی</th>
            <th className="border border-gray-300 p-2">عنوان محصول</th>
            <th className="border border-gray-300 p-2">شناسه</th>
            <th className="border border-gray-300 p-2">ردیف</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product, index) => (
            <tr key={product.id || index} className="text-center">
              <td className="border border-gray-300 p-2">
                <button>
                  <DeleteSvg />
                </button>
                <button>
                  <EditSvg />
                </button>
              </td>
              <td className="border border-gray-300 p-2">
                {product.inventory.toLocaleString("fa-IR")}
              </td>
              <td className="border border-gray-300 p-2">
                {product?.price.toLocaleString("fa-IR")}
              </td>
              <td className="border border-gray-300 p-2">{product.category}</td>
              <td className="border border-gray-300 p-2">{product.title}</td>
              <td className="border border-gray-300 p-2">
                {product.id || "ناشناخته"}
              </td>
              <td className="border border-gray-300 p-2">{index + 1}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductOrderPoint;
