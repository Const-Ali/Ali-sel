import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProducts } from "../../Services/Api";
import { IProduct } from "../../Types/servers_type";
import Product_Item from "../../Components/Product_Item/Product_Item";
import Spinner from "../../Components/Spinner/Spinner";

function CollectionTablet() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortOption, setSortOption] = useState("جدید ترین");

  const [priceFrom, setPriceFrom] = useState<number | "">("");
  const [priceTo, setPriceTo] = useState<number | "">("");

  useEffect(() => {
    setIsLoading(true);

    getProducts()
      .then((result) => {
        const tabletProducts = result.filter(
          (product: IProduct) =>
            product.category === "تبلت-سامسونگ" ||
            product.category === "تبلت-لنوو"
        );
        setProducts(tabletProducts);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, []);

  const filteredProducts = products.filter((item) => {
    const matchesTitle = item.title.toLowerCase();
    const matchesPrice =
      (priceFrom === "" || item.price >= priceFrom) &&
      (priceTo === "" || item.price <= priceTo);
    return matchesTitle && matchesPrice;
  });

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

  const formatNumberWithCommas = (num: number | "") => {
    if (num === "") return "";
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handlePriceChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<number | "">>
  ) => {
    let value = e.target.value.replace(/,/g, "");

    if (!isNaN(Number(value))) {
      setter(Number(value));
    } else {
      setter("");
    }
  };

  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center w-full h-screen">
          <Spinner />
        </div>
      ) : (
        <>
          <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
            <header>
              <h2 className="text-3xl font-semibold  text-gray-800 mt-8 mb-8">
                برای هر سلیقه‌ای ، تبلت‌های خاص داریم
              </h2>

              <p className="mt-4 max-w-md text-gray-500">
                انتخاب تبلت مناسب می‌تواند تجربه شما را متحول کند. چه به دنبال
                یک تبلت برای کارهای روزمره باشید و چه برای بازی و سرگرمی، ما
                بهترین گزینه‌ها را برای شما داریم
              </p>
            </header>

            <div className="mt-8 block lg:hidden">
              <button className="flex cursor-pointer items-center gap-2 border-b border-gray-400 pb-1 text-gray-900 transition hover:border-gray-600">
                <span className="text-sm font-medium"> جستجو و فیلتر </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-4 rtl:rotate-180"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  />
                </svg>
              </button>
            </div>

            <div className="mt-4 lg:mt-8 lg:grid lg:grid-cols-4 lg:items-start lg:gap-8">
              <div className="hidden space-y-4 lg:block">
                <div>
                  <label
                    htmlFor="SortBy"
                    className="block text-xs font-medium text-gray-700"
                  >
                    ترتیب نمایش با
                  </label>

                  <select
                    id="SortBy"
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                    className="mt-4 rounded border border-gray-300 text-sm p-2"
                  >
                    <option>ترتیب</option>
                    <option value="جدید ترین">جدید ترین</option>
                    <option value="ارزان‌ ترین">ارزان‌ ترین</option>
                    <option value="گران‌ ترین">گران‌ ترین</option>
                    <option value="پرفروش‌ ترین">پرفروش‌ ترین</option>
                    <option value="پربازدید ترین">پربازدید ترین</option>
                  </select>
                </div>

                <div>
                  <p className="block text-xs font-medium text-gray-700">
                    فیلتر ها
                  </p>

                  <div className="mt-4 space-y-5">
                    <details className="overflow-hidden rounded border border-gray-300 [&_summary::-webkit-details-marker]:hidden">
                      <summary className="flex cursor-pointer items-center justify-between gap-2 p-4 text-gray-900 transition">
                        <span className="text-sm font-medium"> قیمت </span>

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

                      <div className="border-t border-gray-200 bg-white">
                        <header className="flex items-center justify-between p-4">
                          <span className="text-sm text-gray-700">
                            حذف فیلتر قیمت
                          </span>

                          <button
                            type="button"
                            className="text-sm text-gray-900 underline underline-offset-4"
                          >
                            حذف
                          </button>
                        </header>

                        <div className="border-t border-gray-200 p-4">
                          <div className="flex flex-col gap-4">
                            <label
                              htmlFor="FilterPriceFrom"
                              className="flex items-center gap-2"
                            >
                              <span className="text-sm text-gray-600">
                                تومان
                              </span>
                              <input
                                type="text"
                                id="FilterPriceFrom"
                                placeholder="از"
                                value={
                                  priceFrom === ""
                                    ? ""
                                    : formatNumberWithCommas(priceFrom)
                                }
                                onChange={(e) =>
                                  handlePriceChange(e, setPriceFrom)
                                }
                                className="w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-3"
                              />
                            </label>

                            <label
                              htmlFor="FilterPriceTo"
                              className="flex items-center gap-2"
                            >
                              <span className="text-sm text-gray-600">
                                تومان
                              </span>
                              <input
                                type="text"
                                id="FilterPriceTo"
                                placeholder="تا"
                                value={
                                  priceTo === ""
                                    ? ""
                                    : formatNumberWithCommas(priceTo)
                                }
                                onChange={(e) =>
                                  handlePriceChange(e, setPriceTo)
                                }
                                className="w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-3"
                              />
                            </label>
                          </div>
                        </div>
                      </div>
                    </details>
                    <details className="overflow-hidden rounded border border-gray-300 [&_summary::-webkit-details-marker]:hidden">
                      <summary className="flex cursor-pointer items-center justify-between gap-2 p-4 text-gray-900 transition">
                        <span className="text-sm font-medium"> رنگ ها </span>

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

                      <div className="border-t border-gray-200 bg-white">
                        <header className="flex items-center justify-between p-4">
                          <span className="text-sm text-gray-700">
                            0 انتخاب
                          </span>

                          <button
                            type="button"
                            className="text-sm text-gray-900 underline underline-offset-4"
                          >
                            حذف
                          </button>
                        </header>

                        <ul className="space-y-1 border-t border-gray-200 p-4">
                          <li>
                            <label
                              htmlFor="FilterRed"
                              className="inline-flex items-center gap-2"
                            >
                              <input
                                type="checkbox"
                                id="FilterRed"
                                className="size-5 rounded border-gray-300"
                              />

                              <span className="text-sm font-medium text-gray-700">
                                قرمز
                              </span>
                            </label>
                          </li>

                          <li>
                            <label
                              htmlFor="FilterBlue"
                              className="inline-flex items-center gap-2"
                            >
                              <input
                                type="checkbox"
                                id="FilterBlue"
                                className="size-5 rounded border-gray-300"
                              />

                              <span className="text-sm font-medium text-gray-700">
                                آبی
                              </span>
                            </label>
                          </li>

                          <li>
                            <label
                              htmlFor="FilterGreen"
                              className="inline-flex items-center gap-2"
                            >
                              <input
                                type="checkbox"
                                id="FilterGreen"
                                className="size-5 rounded border-gray-300"
                              />

                              <span className="text-sm font-medium text-gray-700">
                                سبز
                              </span>
                            </label>
                          </li>

                          <li>
                            <label
                              htmlFor="FilterOrange"
                              className="inline-flex items-center gap-2"
                            >
                              <input
                                type="checkbox"
                                id="FilterOrange"
                                className="size-5 rounded border-gray-300"
                              />

                              <span className="text-sm font-medium text-gray-700">
                                نارنجی
                              </span>
                            </label>
                          </li>

                          <li>
                            <label
                              htmlFor="FilterPurple"
                              className="inline-flex items-center gap-2"
                            >
                              <input
                                type="checkbox"
                                id="FilterPurple"
                                className="size-5 rounded border-gray-300"
                              />

                              <span className="text-sm font-medium text-gray-700">
                                بنفش
                              </span>
                            </label>
                          </li>

                          <li>
                            <label
                              htmlFor="FilterTeal"
                              className="inline-flex items-center gap-2"
                            >
                              <input
                                type="checkbox"
                                id="FilterTeal"
                                className="size-5 rounded border-gray-300"
                              />

                              <span className="text-sm font-medium text-gray-700">
                                زرد
                              </span>
                            </label>
                          </li>
                        </ul>
                      </div>
                    </details>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-3">
                <ul
                  className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
                  style={{ direction: "rtl" }}
                >
                  {sortedProducts.map((item) => (
                    <Link key={item.id} to={`/product/${item.id}`}>
                      <Product_Item {...item} />
                    </Link>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          ;
        </>
      )}
    </>
  );
}

export default CollectionTablet;
