import { useState } from "react";
import { useShop_Card_Cont } from "../../Pages/context/Shop_Card_Cont";
import NavComOne from "./NavComOne";

function ProfNav() {
  const userLocal = JSON.parse(localStorage.getItem("user") || "null");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // وضعیت برای نمایش مودال
  const { handleLogout } = useShop_Card_Cont();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="h-16 px-1 w-52 max-w-sm mx-auto rounded-xl shadow-2xl border border-gray-500 space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-4 bg-transparent">
        <img
          className=" block h-12 rounded-full sm:mx-0 sm:shrink-0 cursor-pointer"
          src={userLocal?.imguser}
          alt="User Image"
          onClick={toggleMenu}
        />
        <div className="relative -start-16">
          {isMenuOpen && (
            <div
              className="absolute top-6 z-10 mt-2 w-56 divide-y divide-gray-100 rounded-md border border-gray-100 bg-white shadow-lg "
              role="menu"
            >
              <div className="p-2">
                <strong className="block p-2 text-xs font-medium uppercase text-gray-400">
                  عمومی
                </strong>

                <a
                  onClick={openModal} // اضافه کردن رویداد کلیک به حساب کاربری
                  className="cursor-pointer block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                  role="menuitem"
                >
                  حساب کاربری{" "}
                </a>
                <a
                  href="#"
                  className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                  role="menuitem"
                >
                  سفارشات{" "}
                </a>
                <a
                  href="#"
                  className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                  role="menuitem"
                >
                  پیام ها{" "}
                </a>
              </div>

              <div className="p-2">
                <strong className="block p-2 text-xs font-medium uppercase text-gray-400">
                  خروج از سایت{" "}
                </strong>

                <button
                  onClick={handleLogout}
                  className="group flex items-center justify-start w-11 h-11 bg-red-600 rounded-full cursor-pointer relative overflow-hidden transition-all duration-200 shadow-lg hover:w-32 hover:rounded-lg active:translate-x-1 active:translate-y-1"
                >
                  <div className="flex items-center justify-center w-full transition-all duration-300 group-hover:justify-start group-hover:px-3">
                    <svg className="w-5 h-5" viewBox="0 0 512 512" fill="white">
                      <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
                    </svg>
                  </div>
                  <div className="absolute ml-6 w-24 top-1 transform translate-x-full opacity-0 text-white text-lg font-semibold transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                    خروج
                  </div>
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="text-center sm:text-left">
          <div className="space-y-0.5">
            <p className="text-lg text-black font-semibold flex">
              {userLocal?.name.lastname}
              <p className="ml-2"> {userLocal?.name.firstname}</p>
            </p>

            <p className="text-slate-500 font-medium">{userLocal?.phone} </p>
          </div>
        </div>
      </div>

      {/* نمایش مودال NavComOne */}
      {isModalOpen && <NavComOne onClose={closeModal} />}
    </div>
  );
}

export default ProfNav;
