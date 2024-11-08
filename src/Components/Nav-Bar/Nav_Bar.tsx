import { Link, useNavigate, useLocation } from "react-router-dom";
import Container from "../Container/Container";
import { useShop_Card_Cont } from "../../Pages/context/Shop_Card_Cont";
import { useState, useEffect } from "react";
import axios from "axios";
import { IProduct } from "../../Types/servers_type";

function Nav_Bar() {
  const { cartQty, handleLogout } = useShop_Card_Cont();
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState<IProduct[]>([]);

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
  const userLocal = JSON.parse(localStorage.getItem("user") || "null");

  return (
    <div className="h-40 border-b shadow-2xlxl flex items-center bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300">
      <Container>
        <header className="flex justify-between">
          <div className="flex h-24 items-center mr-36">
            <div className="md:flex md:items-center md:gap-12">
              <div className="flex items-center gap-4">
                {token ? (
                  <div className="h-16 px-8 max-w-sm mx-auto rounded-xl shadow-2xl border border-gray-500 space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-4 bg-transparent">
                    <img
                      className="block h-12 rounded-full sm:mx-0 sm:shrink-0"
                      src={userLocal?.imguser}
                    />
                    <div className="text-center sm:text-left">
                      <div className="space-y-0.5">
                        <p className="text-lg text-black font-semibold flex">
                          {userLocal?.name.lastname}
                          <p className="ml-2"> {userLocal?.name.firstname}</p>
                        </p>

                        <p className="text-slate-500 font-medium">
                          {userLocal?.phone}{" "}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="sm:flex sm:gap-4 ">
                    <Link to="/login">
                      <a className="text-sm px-4 py-2.5 w-full font-semibold tracking-wide bg-gray-800 hover:bg-gray-900 text-white rounded-md">
                        ورود
                      </a>
                    </Link>
                    <div className="hidden sm:flex">
                      <Link to="/CreateAccount">
                        <a className="text-sm px-4 py-2.5 w-full font-semibold tracking-wide bg-gray-800 hover:bg-gray-900 text-white rounded-md">
                          ثبت نام
                        </a>
                      </Link>
                    </div>
                  </div>
                )}
                <div className="block md:hidden">
                  <button className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="size-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  </button>
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
                  <a href="/">
                    <img
                      src="https://www.upload.ee/image/17269868/_-_Copy__2_-denoised_sharpened_width_400__light-100__wb-25__exposure_correction-removebg-preview.png"
                      className="h-12 "
                      alt="Logo"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </header>
        <header className="flex justify-between flex-row-reverse">
          <div className="flex justify-between flex-row-reverse">
            <ul className="flex">
              <li className="ml-4 font-semibold text-2xl">
                <Link to="/Test">تست</Link>
              </li>
              <li className="ml-4 font-semibold text-2xl">
                <Link to="/aboute">درباره ما</Link>
              </li>
              <li className="ml-4 font-semibold text-2xl">
                <Link to="/store">محصولات</Link>
              </li>
              <li className="ml-4 font-semibold text-2xl">
                <Link to="/">خانه</Link>
              </li>
            </ul>
          </div>
          <div className="flex items-center">
            {
              token && (
                <button
                  onClick={handleLogout}
                  className="group flex items-center justify-start w-11 h-11 bg-red-600 rounded-full cursor-pointer relative overflow-hidden transition-all duration-200 shadow-lg hover:w-32 hover:rounded-lg active:translate-x-1 active:translate-y-1"
                >
                  <div className="flex items-center justify-center w-full transition-all duration-300 group-hover:justify-start group-hover:px-3">
                    <svg className="w-4 h-4" viewBox="0 0 512 512" fill="white">
                      <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
                    </svg>
                  </div>
                  <div className="absolute right-5 transform translate-x-full opacity-0 text-white text-lg font-semibold transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                    Logout
                  </div>
                </button>
              )

              // <Button onClick={handleLogout}>Logout</Button>
            }
            <Link className="relative " to="/Cart">
              <button>
                <svg
                  className="w-7 h-7"
                  xmlns="http://www.w3.org/2000/svg"
                  version="1.1"
                  width="256"
                  height="256"
                  viewBox="0 0 256 256"
                >
                  <defs></defs>
                  <g transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)">
                    <path
                      d="M 72.975 58.994 H 31.855 c -1.539 0 -2.897 -1.005 -3.347 -2.477 L 15.199 13.006 H 3.5 c -1.933 0 -3.5 -1.567 -3.5 -3.5 s 1.567 -3.5 3.5 -3.5 h 14.289 c 1.539 0 2.897 1.005 3.347 2.476 l 13.309 43.512 h 36.204 l 10.585 -25.191 H 45 c -1.933 0 -3.5 -1.567 -3.5 -3.5 s 1.567 -3.5 3.5 -3.5 h 41.5 c 1.172 0 2.267 0.587 2.915 1.563 s 0.766 2.212 0.312 3.293 L 76.201 56.85 C 75.655 58.149 74.384 58.994 72.975 58.994 z"
                      transform=" matrix(1 0 0 1 0 0) "
                      stroke-linecap="round"
                    />
                    <circle
                      cx="28.88"
                      cy="74.33"
                      r="6.16"
                      transform="  matrix(1 0 0 1 0 0) "
                    />
                    <circle
                      cx="74.59"
                      cy="74.33"
                      r="6.16"
                      transform="  matrix(1 0 0 1 0 0) "
                    />
                  </g>
                </svg>
              </button>
              <span className="absolute w-6 h-6 bg-red-700 flex justify-center items-center rounded-lg text-white -top-3 -right-4">
                {cartQty}
              </span>
            </Link>
          </div>
        </header>
      </Container>
    </div>
  );
}

export default Nav_Bar;
