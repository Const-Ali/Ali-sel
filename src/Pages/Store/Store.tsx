import { useEffect, useState } from "react";
import Product_Item from "../../Components/Product_Item/Product_Item";
import Container from "../../Components/Container/Container";
import { Link } from "react-router-dom";
import { getProducts } from "../../Services/Api";
import { IProduct } from "../../Types/servers_type";
import Spinner from "../../Components/Spinner/Spinner";

function Store() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sortOption, setSortOption] = useState("جدید ترین");
  const [selectedCategory, setSelectedCategory] = useState("همه");

  useEffect(() => {
    setIsLoading(true);

    getProducts()
      .then((result) => {
        setProducts(result);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, []);

  const filteredProducts = products.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  const sortProducts = (products: IProduct[]) => {
    switch (sortOption) {
      case "جدید ترین":
        return [...products].sort((a, b) =>
          new Date(a.createdAt) < new Date(b.createdAt) ? 1 : -1
        );
      case "ارزان‌ ترین":
        return [...products].sort((a, b) => a.price - b.price);
      case "گران‌ ترین":
        return [...products].sort((a, b) => b.price - a.price);
      case "پرفروش‌ ترین":
        return [...products].sort((a, b) => b.rating.count - a.rating.count);
      case "پربازدید ترین":
        return [...products].sort((a, b) => b.rating.rate - a.rating.rate);
      default:
        return products;
    }
  };

  const sortedProducts = sortProducts(filteredProducts);
  const categories = [
    "همه",
    ...new Set(products.map((product) => product.category)),
  ];
  const displayedProducts =
    selectedCategory === "همه"
      ? sortedProducts
      : sortedProducts.filter(
          (product) => product.category === selectedCategory
        );

  return (
    <Container>
      <div className="flex flex-row-reverse">
        <aside className="w-1/4 p-4 border-l border-gray-300 text-right">
          <h2 className="text-xl font-bold mb-4">دسته‌بندی‌ها</h2>
          <ul className="space-y-2">
            {categories.map((category) => (
              <li key={category}>
                <button
                  className={`w-full text-right p-2 rounded-lg ${category === selectedCategory ? "bg-gray-200 font-bold" : ""}`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        <div className="w-3/4 p-4">
          <div className="flex justify-between mb-8 mt-6 flex-row-reverse">
            <form className="max-w-md mx-auto w-full">
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
                  <option value="جدید ترین">جدید ترین</option>
                  <option value="ارزان‌ ترین">ارزان‌ ترین</option>
                  <option value="گران‌ ترین">گران‌ ترین</option>
                  <option value="پرفروش‌ ترین">پرفروش‌ ترین</option>
                  <option value="پربازدید ترین">پربازدید ترین</option>
                </select>
              </div>
            </form>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center w-full h-screen">
              <Spinner />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-4 text-right">
              {displayedProducts.map((item) => (
                <Link key={item.id} to={`/product/${item.id}`}>
                  <Product_Item {...item} />
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </Container>
  );
}

export default Store;
