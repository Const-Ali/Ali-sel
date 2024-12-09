import { useEffect, useState } from "react";
import Product_Item from "../../Components/Product_Item/Product_Item";
import Container from "../../Components/Container/Container";
import { Link } from "react-router-dom";
import { getProducts } from "../../Services/Api";
import { IProduct } from "../../Types/servers_type";
import Spinner from "../../Components/Spinner/Spinner";
import SerchSvg from "../../Components/SVG/SerchSvg";

function Store() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sortOption, setSortOption] = useState("جدید ترین");
  const [selectedBrand, setSelectedBrand] = useState<string>("همه");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    "همه",
  ]);
  const [categorySearch, setCategorySearch] = useState("");

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

  const handleCategoryChange = (category: string) => {
    if (category === "همه") {
      setSelectedCategories(["همه"]);
    } else {
      setSelectedCategories((prevCategories) =>
        prevCategories.includes(category)
          ? prevCategories.filter((cat) => cat !== category)
          : [...prevCategories.filter((cat) => cat !== "همه"), category]
      );
    }
  };

  const brands = [
    "همه",
    ...new Set(products.map((product) => product.title.split(" ")[0])),
  ];

  const categories = [
    "همه",
    ...new Set(products.map((product) => product.category)),
  ];

  const filteredByBrand =
    selectedBrand === "همه"
      ? filteredProducts
      : filteredProducts.filter((product) =>
          product.title.startsWith(selectedBrand)
        );

  const filteredByCategory = selectedCategories.includes("همه")
    ? filteredByBrand
    : filteredByBrand.filter((product) =>
        selectedCategories.includes(product.category)
      );

  const filteredCategories = categories.filter((category) =>
    category.toLowerCase().includes(categorySearch.toLowerCase())
  );

  return (
    <Container>
      <div className="flex flex-row-reverse">
        <aside className="w-1/4 p-4 border-l border-gray-300 text-right flex flex-col gap-5 pt-10">
          <div className="sticky top-44">
            <details className="mb-6 overflow-hidden rounded border border-gray-300 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between flex-row-reverse gap-2 p-4 text-gray-900 transition">
                <span className="text-sm font-medium">برند ها</span>
                <span className="transition group-open:-rotate-180">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </span>
              </summary>
              <ul className="space-y-1 border-t border-gray-200 p-4">
                <li className="flex gap-2">
                  <button className="w-full text-right p-2 rounded-lg">
                    همه
                  </button>
                </li>
                <li className="flex gap-2">
                  <button className="w-full text-right p-2 rounded-lg">
                    سامسونگ
                  </button>
                </li>
                <li className="flex gap-2">
                  <button className="w-full text-right p-2 rounded-lg">
                    اپل
                  </button>
                </li>
                <li className="flex gap-2">
                  <button className="w-full text-right p-2 rounded-lg">
                    شیائومی
                  </button>
                </li>
                <li className="flex gap-2">
                  <button className="w-full text-right p-2 rounded-lg">
                    لنوو
                  </button>
                </li>
              </ul>
            </details>

            <details className="mb-6 overflow-hidden rounded border border-gray-300 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between flex-row-reverse gap-2 p-4 text-gray-900 transition">
                <span className="text-sm font-medium">محصولات</span>
                <span className="transition group-open:-rotate-180">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </span>
              </summary>
              <ul className="space-y-1 border-t border-gray-200 p-4">
                {brands.map((brand) => (
                  <li key={brand} className="flex gap-2">
                    <button
                      className={`w-full text-right p-2 rounded-lg ${
                        selectedBrand === brand
                          ? "font-bold bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100"
                          : ""
                      }`}
                      onClick={() => setSelectedBrand(brand)}
                    >
                      {brand}
                    </button>
                  </li>
                ))}
              </ul>
            </details>
            <details className="mb-6 overflow-hidden rounded border border-gray-300 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between flex-row-reverse gap-2 p-4 text-gray-900 transition">
                <span className="text-sm font-medium"> دسته‌بندی ها </span>
                <span className="transition group-open:-rotate-180">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </span>
              </summary>

              <ul className="space-y-1 border-t border-gray-200 p-4">
                <form className="max-w-md mx-auto w-full p-5">
                  <div className="flex items-center gap-6 flex-row">
                    <div className="relative w-full">
                      <input
                        className="block w-full p-4 pe-10 text-sm text-gray-600 border border-gray-400 rounded-lg"
                        placeholder="جستجوی دسته‌بندی‌ها"
                        value={categorySearch}
                        onChange={(e) => setCategorySearch(e.target.value)}
                      />
                      <div className="absolute inset-y-0 end-0 flex items-center pe-3 pointer-events-none">
                        <SerchSvg />
                      </div>
                    </div>
                  </div>
                </form>
                {filteredCategories.map((category) => (
                  <li key={category} className="flex gap-2">
                    <button
                      className={`w-full text-right p-2 rounded-lg ${
                        selectedCategories.includes(category)
                          ? "font-bold bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100"
                          : ""
                      }`}
                      onClick={() => handleCategoryChange(category)}
                    >
                      {category}
                    </button>
                    <label className="inline-flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(category)}
                        onChange={() => handleCategoryChange(category)}
                        className="size-5 rounded border-gray-300"
                      />
                    </label>
                  </li>
                ))}
              </ul>
            </details>
          </div>
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

          <div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-4 text-right"
            style={{ direction: "rtl" }}
          >
            {isLoading ? (
              <Spinner />
            ) : (
              sortProducts(filteredByCategory).map((product) => (
                <Link to={`/product/${product.id}`} key={product.id}>
                  <Product_Item {...product} />
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Store;
