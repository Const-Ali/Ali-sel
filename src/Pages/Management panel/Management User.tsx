import { useState } from "react";
import AddUser from "../../Components/Management User/AddUser";
import EditUser from "../../Components/Management User/EditUser";
import UserComTotal from "../../Components/Management User/UserComTotal";
import Container from "../../Components/Container/Container";
import { useNavigate } from "react-router-dom";

function ManagementUser() {
  const [selectedComponent, setSelectedComponent] = useState("UserComTotal");
  const navigate = useNavigate(); // تعریف useNavigate

  const renderComponent = () => {
    switch (selectedComponent) {
      case "UserComTotal":
        return <UserComTotal />;
      case "AddUser":
        return <AddUser />;
      case "EditUser":
        return <EditUser />;
      default:
        return null;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="flex">
      <div className="flex  flex-col justify-between border-e-4 bg-white">
        <div className="px-4 py-6">
          <div className="flex items-center ">
            <img
              src="https://www.upload.ee/image/17269868/_-_Copy__2_-denoised_sharpened_width_400__light-100__wb-25__exposure_correction-removebg-preview.png"
              className="h-10"
              alt="Logo"
            />
          </div>

          <ul className="mt-6 space-y-1">
            <li>
              <a
                href="#"
                className="block rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700"
              >
                General
              </a>
            </li>
            <li>
              <details className="group [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                  <span className="text-sm font-medium"> Account </span>

                  <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="size-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                </summary>

                <ul className="mt-2 space-y-1 px-4">
                  <li>
                    <a
                      href="#"
                      className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                    >
                      Details
                    </a>
                  </li>

                  <li>
                    <a
                      href="#"
                      className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                    >
                      Security
                    </a>
                  </li>

                  <li>
                    <form onSubmit={handleLogout}>
                      <button
                        type="submit"
                        className="w-full rounded-lg px-4 py-2 text-sm font-medium text-gray-500 [text-align:_inherit] hover:bg-gray-100 hover:text-gray-700"
                      >
                        Logout
                      </button>
                    </form>
                  </li>
                </ul>
              </details>
            </li>
            <li>
              <details className="group [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                  <span className="text-sm font-medium"> Teams </span>

                  <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="size-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                </summary>

                <ul className="mt-2 space-y-1 px-4">
                  <li>
                    <a
                      href="#"
                      className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                    >
                      Banned Users
                    </a>
                  </li>

                  <li>
                    <a
                      href="#"
                      className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                    >
                      Calendar
                    </a>
                  </li>
                </ul>
              </details>
            </li>
          </ul>
        </div>

        <div className="sticky inset-x-0 bottom-0 border-y-4 border-gray-200">
          <a
            target="_blank"
            href="https://github.com/Const-Ali/Ali-sel"
            className="flex items-center gap-2 bg-white p-4 hover:bg-gray-50"
          >
            <img
              alt=""
              src="https://www.upload.ee/image/17334210/5191.JPG"
              className="size-10 rounded-full object-cover"
            />

            <div>
              <p className="text-xs">
                <strong className="block font-medium">Ali Mohammadi</strong>

                <span> iop098aliop098@gmail.com </span>
              </p>
            </div>
          </a>
        </div>
      </div>
      <Container>
        <div className="container mx-auto p-4 mt-4">
          <h1 className="text-5xl font-bold mb-24 flex justify-center items-center">
            پنل مدیریت کاربران تکنوسنتر
          </h1>

          <div className="flex gap-4 mb-8 justify-center items-center">
            <button
              onClick={() => setSelectedComponent("UserComTotal")}
              className={`px-4 py-2 rounded ${
                selectedComponent === "UserComTotal"
                  ? "bg-gray-800 text-white"
                  : "bg-gray-300"
              }`}
            >
              اطلاعات کاربران
            </button>
            <button
              onClick={() => setSelectedComponent("AddUser")}
              className={`px-4 py-2 rounded ${
                selectedComponent === "AddUser"
                  ? "bg-green-800 text-white"
                  : "bg-green-300"
              }`}
            >
              افزودن کاربر
            </button>{" "}
            <button
              onClick={() => setSelectedComponent("EditUser")}
              className={`px-4 py-2 rounded ${
                selectedComponent === "EditUser"
                  ? "bg-orange-600 text-white"
                  : "bg-orange-300"
              }`}
            >
              ویرایش کاربر
            </button>
          </div>

          <div>{renderComponent()}</div>
        </div>
      </Container>
    </div>
  );
}

export default ManagementUser;

{
  // <li>
  /* <div className="space-y-2 mt-10">
       <details className="overflow-hidden rounded border border-gray-300 [&_summary::-webkit-details-marker]:hidden">
         <summary className="flex cursor-pointer items-center justify-between gap-2 bg-white p-4 text-gray-900 transition">
           <span className="text-sm font-medium"> Availability </span>

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
             <span className="text-sm text-gray-700"> 0 Selected </span>

             <button
               type="button"
               className="text-sm text-gray-900 underline underline-offset-4"
             >
               Reset
             </button>
           </header>

           <ul className="space-y-1 border-t border-gray-200 p-4">
             <li>
               <label
                 htmlFor="FilterInStock"
                 className="inline-flex items-center gap-2"
               >
                 <input
                   type="checkbox"
                   id="FilterInStock"
                   className="size-5 rounded border-gray-300"
                 />

                 <span className="text-sm font-medium text-gray-700">
                   {" "}
                   In Stock (5+){" "}
                 </span>
               </label>
             </li>

             <li>
               <label
                 htmlFor="FilterPreOrder"
                 className="inline-flex items-center gap-2"
               >
                 <input
                   type="checkbox"
                   id="FilterPreOrder"
                   className="size-5 rounded border-gray-300"
                 />

                 <span className="text-sm font-medium text-gray-700">
                   {" "}
                   Pre Order (3+){" "}
                 </span>
               </label>
             </li>

             <li>
               <label
                 htmlFor="FilterOutOfStock"
                 className="inline-flex items-center gap-2"
               >
                 <input
                   type="checkbox"
                   id="FilterOutOfStock"
                   className="size-5 rounded border-gray-300"
                 />

                 <span className="text-sm font-medium text-gray-700">
                   {" "}
                   Out of Stock (10+){" "}
                 </span>
               </label>
             </li>
           </ul>
         </div>
       </details>

       <details className="overflow-hidden rounded border border-gray-300 [&_summary::-webkit-details-marker]:hidden">
         <summary className="flex cursor-pointer items-center justify-between gap-2 bg-white p-4 text-gray-900 transition">
           <span className="text-sm font-medium"> Price </span>

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
               {" "}
               The highest price is $600{" "}
             </span>

             <button
               type="button"
               className="text-sm text-gray-900 underline underline-offset-4"
             >
               Reset
             </button>
           </header>

           <div className="border-t border-gray-200 p-4">
             <div className="flex justify-between gap-4">
               <label
                 htmlFor="FilterPriceFrom"
                 className="flex items-center gap-2"
               >
                 <span className="text-sm text-gray-600">$</span>

                 <input
                   type="number"
                   id="FilterPriceFrom"
                   placeholder="From"
                   className="w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                 />
               </label>

               <label
                 htmlFor="FilterPriceTo"
                 className="flex items-center gap-2"
               >
                 <span className="text-sm text-gray-600">$</span>

                 <input
                   type="number"
                   id="FilterPriceTo"
                   placeholder="To"
                   className="w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                 />
               </label>
             </div>
           </div>
         </div>
       </details>
     </div>
   </li>; */
}
