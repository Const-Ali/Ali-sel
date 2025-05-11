import { Link, useNavigate, useLocation } from "react-router-dom";
import Container from "../Container/Container";
import { useShop_Card_Cont } from "../../Pages/context/Shop_Card_Cont";
import { useState, useEffect } from "react";
import axios from "axios";
import { IProduct } from "../../Types/servers_type";
import CategoriesMobileModal from "../PropComponents/CategoriesMobileModal";
import ProfNav from "./ProfNav";
import CartSvg from "../SVG/CartSvg";
import LikeSvg from "../SVG/LikeSvg";
import LogoSvg from "../SVG/LogoSvg.Png";
import SerchSvg from "../SVG/SerchSvg";
import ListSvg from "../SVG/ListSvg";
import CategoriesLaptopModal from "../PropComponents/CategoriesLaptopModal";
import CategoriesWatchModal from "../PropComponents/CategoriesWatchModal";
import { useTranslation } from "react-i18next";
import FlagUSSvg from "../SVG/Flag-US-Svg";
import FlagIRSvg from "../SVG/Flag-IR-Svg";

function Nav_Bar() {
  const { cartQty } = useShop_Card_Cont();
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState<IProduct[]>([]);
  const [activeTab, setActiveTab] = useState<string>("Settings");
  const [showCategoriesModal, setShowCategoriesModal] = useState(false);
  const [showWatchCategoriesModal, setShowWatchCategoriesModal] =
    useState(false);
  const [showLaptopCategoriesModal, setShowLaptopCategoriesModal] =
    useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    axios
      .get("http://localhost:8001/products")
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const filteredProducts = products.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  if (
    location.pathname === "/ManagementUser" ||
    location.pathname === "/ManagementPanel" ||
    location.pathname === "/login" ||
    location.pathname === "/CreateAccount"
  ) {
    return null;
  }

  const token = localStorage.getItem("token");

  const { t, i18n } = useTranslation();
  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };
  return (
    <div className="h-40 border-b shadow-2xlxl flex items-center bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 sticky top-0 z-50">
      <Container>
        <header className="flex justify-between">
          <div className="flex h-24 items-center mr-36">
            <div className="md:flex md:items-center md:gap-12">
              <div className="flex items-center gap-4 ">
                {token ? (
                  <>
                    <ProfNav />
                  </>
                ) : (
                  <div className="sm:flex sm:gap-4 ">
                    <Link to="/login">
                      <h1 className="text-sm px-4 py-2.5 w-full font-semibold tracking-wide bg-gray-800 hover:bg-gray-900 text-white rounded-md">
                        {t("login")}
                      </h1>
                    </Link>
                    <div className="hidden sm:flex">
                      <Link to="/CreateAccount">
                        <h1 className="text-sm px-4 py-2.5 w-full font-semibold tracking-wide bg-gray-800 hover:bg-gray-900 text-white rounded-md">
                          {t("signup")}
                        </h1>
                      </Link>
                    </div>
                  </div>
                )}
                <div className="block md:hidden">
                  <button className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75">
                    <ListSvg />
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="border-gray-600 border-2 rounded-xl py-1 px-3">
                  <h1 className="flex justify-center">{t("welcome")}</h1>
                  <div className="flex justify-center space-x-6">
                    <button onClick={() => changeLanguage("en")}>
                      <FlagUSSvg />
                    </button>
                    <button onClick={() => changeLanguage("fa")}>
                      <FlagIRSvg />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <div className="relative w-96 basis-2/3 ">
              <input
                className=" block w-full p-4 pe-10 placeholder:text-slate-950 bg-transparent text-sm border-2 border-gray-600 rounded-lg "
                placeholder="جستجوی محصولات"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              <div className=" absolute inset-y-0 end-0 flex items-center pe-3 pointer-events-none">
                <SerchSvg />
              </div>
              {search && (
                <ul className="absolute w-full bg-white border border-gray-400 rounded-md mt-1 max-h-60 overflow-y-auto shadow-lg z-10">
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                      <div
                        className="flex justify-between border-2 rounded-lg hover:bg-gray-200 cursor-pointer"
                        key={product.id}
                        onClick={() => {
                          setSearch("");
                          navigate(`/product/${product.id}`);
                        }}
                      >
                        <li className="p-2 rounded-lg">{product.title}</li>
                        <img
                          className="w-28 rounded-r-lg"
                          src={product.image}
                          alt={product.title}
                        />
                      </div>
                    ))
                  ) : (
                    <li className="p-2 text-gray-500">
                      محصولی با این عنوان یافت نشد
                    </li>
                  )}
                </ul>
              )}
            </div>
            <div className="flex items-center pl-10 ">
              <div className="flex p-1">
                <div className="flex items-center">
                  <LogoSvg />
                </div>
              </div>
            </div>
          </div>
        </header>
        <header className="flex justify-between flex-row-reverse">
          <div className="flex justify-between flex-row-reverse">
            <ul className="flex">
              <li>
                <div>
                  <div className="hidden sm:block">
                    <div>
                      <nav className="flex gap-6 justify-center py-2">
                        <Link
                          to="Aboute"
                          onClick={() => setActiveTab("Settings")}
                          className={`shrink-0 p-3 text-sm font-medium transition-all duration-300 ease-in-out ${
                            activeTab === "Settings"
                              ? "border-b-4 border-gray-700 text-gray-950"
                              : "border-b-4 border-transparent text-gray-600 hover:text-gray-700 hover:border-b-2 hover:border-black hover:w-auto"
                          }`}
                        >
                          <p className="font-extrabold text-lg">
                            {t("about_us")}
                          </p>
                        </Link>
                        <Link
                          to="#"
                          onMouseEnter={() => setShowWatchCategoriesModal(true)}
                          onMouseLeave={() =>
                            setShowWatchCategoriesModal(false)
                          }
                          className={`shrink-0 p-3 text-sm font-medium transition-all duration-300 ease-in-out ${
                            activeTab === "Categories"
                              ? "border-b-4 border-gray-700 text-gray-950"
                              : "border-b-4 border-transparent text-gray-600 hover:text-gray-700 hover:border-b-2 hover:border-black hover:w-auto"
                          }`}
                        >
                          <p className="font-extrabold text-lg">{t("watch")}</p>
                        </Link>
                        <CategoriesWatchModal
                          isVisible={showWatchCategoriesModal}
                          onMouseEnter={() => setShowWatchCategoriesModal(true)}
                          onMouseLeave={() =>
                            setShowWatchCategoriesModal(false)
                          }
                        />
                        <Link
                          to="#"
                          onMouseEnter={() => setShowCategoriesModal(true)}
                          onMouseLeave={() => setShowCategoriesModal(false)}
                          className={`shrink-0 p-3 text-sm font-medium transition-all duration-300 ease-in-out ${
                            activeTab === "Categories"
                              ? "border-b-4 border-gray-700 text-gray-950"
                              : "border-b-4 border-transparent text-gray-600 hover:text-gray-700 hover:border-b-2 hover:border-black hover:w-auto"
                          }`}
                        >
                          <p className="font-extrabold text-lg">
                            {t("mobile")}
                          </p>
                        </Link>
                        <CategoriesMobileModal
                          isVisible={showCategoriesModal}
                          onMouseEnter={() => setShowCategoriesModal(true)}
                          onMouseLeave={() => setShowCategoriesModal(false)}
                        />

                        <Link
                          to="#"
                          onMouseEnter={() =>
                            setShowLaptopCategoriesModal(true)
                          }
                          onMouseLeave={() =>
                            setShowLaptopCategoriesModal(false)
                          }
                          className={`shrink-0 p-3 text-sm font-medium transition-all duration-300 ease-in-out ${
                            activeTab === "Categories"
                              ? "border-b-4 border-gray-700 text-gray-950"
                              : "border-b-4 border-transparent text-gray-600 hover:text-gray-700 hover:border-b-2 hover:border-black hover:w-auto"
                          }`}
                        >
                          <p className="font-extrabold text-lg">
                            {t("laptop")}
                          </p>
                        </Link>
                        <CategoriesLaptopModal
                          isVisible={showLaptopCategoriesModal}
                          onMouseEnter={() =>
                            setShowLaptopCategoriesModal(true)
                          }
                          onMouseLeave={() =>
                            setShowLaptopCategoriesModal(false)
                          }
                        />
                        <Link
                          to="/store"
                          onClick={() => setActiveTab("Products")}
                          className={`shrink-0 p-3 text-sm font-medium transition-all duration-300 ease-in-out ${
                            activeTab === "Products"
                              ? "border-b-4 border-gray-700 text-gray-950"
                              : "border-b-4 border-transparent text-gray-600 hover:text-gray-700 hover:border-b-2 hover:border-black hover:w-auto"
                          }`}
                        >
                          <p className="font-extrabold text-lg">
                            {t("products")}
                          </p>
                        </Link>
                        <Link
                          to="/"
                          onClick={() => setActiveTab("Home")}
                          className={`shrink-0 p-3 text-sm font-medium transition-all duration-300 ease-in-out ${
                            activeTab === "Home"
                              ? "border-b-4 border-gray-700 text-gray-950"
                              : "border-b-4 border-transparent text-gray-600 hover:text-gray-700 hover:border-b-2 hover:border-black hover:w-auto"
                          }`}
                        >
                          <p className="font-extrabold text-lg"> {t("home")}</p>
                        </Link>
                      </nav>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div className="flex items-center gap-6">
            <Link className="relative " to="/Cart">
              <button className="group relative overflow-hidden">
                <CartSvg />
              </button>

              <span className="absolute w-6 h-6 bg-red-700 flex justify-center items-center rounded-lg text-white -top-3 -right-4">
                {cartQty}
              </span>
            </Link>
            <Link className="relative" to="/Like">
              <button className="group relative overflow-hidden -top-1">
                <LikeSvg />
              </button>
            </Link>
          </div>
        </header>
      </Container>
    </div>
  );
}

export default Nav_Bar;
