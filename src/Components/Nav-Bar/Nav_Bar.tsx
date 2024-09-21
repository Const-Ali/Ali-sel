import { Link } from "react-router-dom";
import Container from "../Container/Container";
import { useShop_Card_Cont } from "../../Pages/context/Shop_Card_Cont";
import { Button } from "@nextui-org/react";

function Nav_Bar() {
  const { cartQty, handleLogout } = useShop_Card_Cont();

  return (
    <div className="h-14 border-b shadow bg-red-500 flex items-center">
      <Container>
        <div className="flex justify-between flex-row-reverse">
          <ul className="flex">
            <li className="ml-4">
              <Link to="/Test">تست</Link>
            </li>
            <li className="ml-4">
              <Link to="/store">فروشگاه</Link>
            </li>
            <li className="ml-4">
              <Link to="/">خانه</Link>
            </li>
          </ul>
          <div>
            <Button onClick={handleLogout}>Logout</Button>
            <Link className="relative" to="/Cart">
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
                </svg>{" "}
              </button>
              <span className="absolute w-6 h-6 bg-red-900 flex justify-center items-center rounded-full text-white -top-4 -right-4">
                {cartQty !== 0 ? cartQty : ""}
              </span>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Nav_Bar;

////////////////////////////////////////////////////////////////////////

// function Nav_Bar() {
//   return (
//     <nav className="bg-white border-gray-200 dark:bg-gray-900">
//       <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
//         <a
//           href="https://flowbite.com/"
//           className="flex items-center space-x-3 rtl:space-x-reverse"
//         >
//           <img
//             src="https://flowbite.com/docs/images/logo.svg"
//             className="h-8"
//             alt="Flowbite Logo"
//           />
//           <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
//             Flowbite
//           </span>
//         </a>
//         <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
//           <button
//             type="button"
//             className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
//             id="user-menu-button"
//             aria-expanded="false"
//             data-dropdown-toggle="user-dropdown"
//             data-dropdown-placement="bottom"
//           >
//             <span className="sr-only">Open user menu</span>
//             <img
//               className="w-8 h-8 rounded-full"
//               src="/docs/images/people/profile-picture-3.jpg"
//               alt="user photo"
//             />
//           </button>
//           {/* Dropdown menu */}
//           <div
//             className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
//             id="user-dropdown"
//           >
//             <div className="px-4 py-3">
//               <span className="block text-sm text-gray-900 dark:text-white">
//                 Bonnie Green
//               </span>
//               <span className="block text-sm text-gray-500 truncate dark:text-gray-400">
//                 name@flowbite.com
//               </span>
//             </div>
//             <ul className="py-2" aria-labelledby="user-menu-button">
//               <li>
//                 <a
//                   href="#"
//                   className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
//                 >
//                   Dashboard
//                 </a>
//               </li>
//               <li>
//                 <a
//                   href="#"
//                   className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
//                 >
//                   Settings
//                 </a>
//               </li>
//               <li>
//                 <a
//                   href="#"
//                   className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
//                 >
//                   Earnings
//                 </a>
//               </li>
//               <li>
//                 <a
//                   href="#"
//                   className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
//                 >
//                   Sign out
//                 </a>
//               </li>
//             </ul>
//           </div>
//           <button
//             data-collapse-toggle="navbar-user"
//             type="button"
//             className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
//             aria-controls="navbar-user"
//             aria-expanded="false"
//           >
//             <span className="sr-only">Open main menu</span>
//             <svg
//               className="w-5 h-5"
//               aria-hidden="true"
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 17 14"
//             >
//               <path
//                 stroke="currentColor"
//                 stroke-linecap="round"
//                 stroke-linejoin="round"
//                 stroke-width="2"
//                 d="M1 1h15M1 7h15M1 13h15"
//               />
//             </svg>
//           </button>
//         </div>
//         <div
//           className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
//           id="navbar-user"
//         >
//           <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
//             <li>
//               <a
//                 href="#"
//                 className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
//                 aria-current="page"
//               >
//                 Home
//               </a>
//             </li>
//             <li>
//               <a
//                 href="#"
//                 className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
//               >
//                 About
//               </a>
//             </li>
//             <li>
//               <a
//                 href="#"
//                 className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
//               >
//                 Services
//               </a>
//             </li>
//             <li>
//               <a
//                 href="#"
//                 className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
//               >
//                 Pricing
//               </a>
//             </li>
//             <li>
//               <a
//                 href="#"
//                 className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
//               >
//                 Contact
//               </a>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </nav>
//   );
// }

// export default Nav_Bar;

////////////////////////////////////////////////////////////////////////

// function Nav_Bar() {
//   return (
//     <nav className="flex-no-wrap relative flex w-full items-center justify-between bg-zinc-50 py-2 shadow-dark-mild dark:bg-neutral-700 lg:flex-wrap lg:justify-start lg:py-4">
//       <div className="flex w-full flex-wrap items-center justify-between px-3">
//         {/* Hamburger button for mobile view */}
//         <button
//           className="block border-0 bg-transparent px-2 text-black/50 hover:no-underline hover:shadow-none focus:no-underline focus:shadow-none focus:outline-none focus:ring-0 dark:text-neutral-200 lg:hidden"
//           type="button"
//           data-twe-collapse-init
//           data-twe-target="#navbarSupportedContent1"
//           aria-controls="navbarSupportedContent1"
//           aria-expanded="false"
//           aria-label="Toggle navigation"
//         >
//           {/* Hamburger icon */}
//           <span className="[&>svg]:w-7 [&>svg]:stroke-black/50 dark:[&>svg]:stroke-neutral-200">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               viewBox="0 0 24 24"
//               fill="currentColor"
//             >
//               <path
//                 fillRule="evenodd"
//                 d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
//                 clipRule="evenodd"
//               />
//             </svg>
//           </span>
//         </button>

//         {/* Collapsible navigation container */}
//         <div
//           className="!visible hidden flex-grow basis-[100%] items-center lg:!flex lg:basis-auto"
//           id="navbarSupportedContent1"
//           data-twe-collapse-item
//         >
//           {/* Logo */}
//           <a
//             className="mb-4 me-5 ms-2 mt-3 flex items-center text-neutral-900 hover:text-neutral-900 focus:text-neutral-900 dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400 lg:mb-0 lg:mt-0"
//             href="#"
//           >
//             <img
//               src="https://tecdn.b-cdn.net/img/logo/te-transparent-noshadows.webp"
//               style={{ height: "15px" }}
//               alt="TE Logo"
//               loading="lazy"
//             />
//           </a>
//           {/* Left navigation links */}
//           <ul
//             className="list-style-none me-auto flex flex-col ps-0 lg:flex-row"
//             data-twe-navbar-nav-ref
//           >
//             <li className="mb-4 lg:mb-0 lg:pe-2" data-twe-nav-item-ref>
//               {/* Dashboard link */}
//               <a
//                 className="text-black/60 transition duration-200 hover:text-black/80 hover:ease-in-out focus:text-black/80 active:text-black/80 motion-reduce:transition-none dark:text-white/60 dark:hover:text-white/80 dark:focus:text-white/80 dark:active:text-white/80 lg:px-2"
//                 href="#"
//                 data-twe-nav-link-ref
//               >
//                 Dashboard
//               </a>
//             </li>
//             {/* Team link */}
//             <li className="mb-4 lg:mb-0 lg:pe-2" data-twe-nav-item-ref>
//               <a
//                 className="text-black/60 transition duration-200 hover:text-black/80 hover:ease-in-out focus:text-black/80 active:text-black/80 motion-reduce:transition-none dark:text-white/60 dark:hover:text-white/80 dark:focus:text-white/80 dark:active:text-white/80 lg:px-2"
//                 href="#"
//                 data-twe-nav-link-ref
//               >
//                 Team
//               </a>
//             </li>
//             {/* Projects link */}
//             <li className="mb-4 lg:mb-0 lg:pe-2" data-twe-nav-item-ref>
//               <a
//                 className="text-black/60 transition duration-200 hover:text-black/80 hover:ease-in-out focus:text-black/80 active:text-black/80 motion-reduce:transition-none dark:text-white/60 dark:hover:text-white/80 dark:focus:text-white/80 dark:active:text-white/80 lg:px-2"
//                 href="#"
//                 data-twe-nav-link-ref
//               >
//                 Projects
//               </a>
//             </li>
//           </ul>
//           {/* Left links */}
//         </div>

//         {/* Right elements */}
//         <div className="relative flex items-center">
//           {/* Icon */}
//           <a className="me-4 text-neutral-600 dark:text-white" href="#">
//             <span className="[&>svg]:w-5">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 24 24"
//                 fill="currentColor"
//               >
//                 <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
//               </svg>
//             </span>
//           </a>

//           {/* First dropdown container */}
//           <div
//             className="relative"
//             data-twe-dropdown-ref
//             data-twe-dropdown-alignment="end"
//           >
//             {/* First dropdown trigger */}
//             <a
//               className="me-4 flex items-center text-neutral-600 dark:text-white"
//               href="#"
//               id="dropdownMenuButton1"
//               role="button"
//               data-twe-dropdown-toggle-ref
//               aria-expanded="false"
//             >
//               {/* Dropdown trigger icon */}
//               <span className="[&>svg]:w-5">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   viewBox="0 0 24 24"
//                   fill="currentColor"
//                 >
//                   <path
//                     fillRule="evenodd"
//                     d="M5.25 9a6.75 6.75 0 0113.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 01-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 11-7.48 0 24.585 24.585 0 01-4.831-1.244.75.75 0 01-.298-1.205A8.217 8.217 0 005.25 9.75V9zm4.502 8.9a2.25 2.25 0 104.496 0 25.057 25.057 0 01-4.496 0z"
//                     clipRule="evenodd"
//                   />
//                 </svg>
//               </span>
//               {/* Notification counter */}
//               <span className="absolute -mt-4 ms-2.5 rounded-full bg-danger px-[0.35em] py-[0.15em] text-[0.6rem] font-bold leading-none text-white">
//                 1
//               </span>
//             </a>
//             {/* First dropdown menu */}
//             <ul
//               className="absolute z-[1000] float-left m-0 hidden min-w-max list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg data-[twe-dropdown-show]:block dark:bg-surface-dark"
//               aria-labelledby="dropdownMenuButton1"
//               data-twe-dropdown-menu-ref
//             >
//               <li>
//                 <a
//                   className="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 focus:bg-neutral-100 dark:text-neutral-200 dark:hover:bg-white/30 dark:focus:bg-white/30"
//                   href="#"
//                 >
//                   Action
//                 </a>
//               </li>
//               <li>
//                 <a
//                   className="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 focus:bg-neutral-100 dark:text-neutral-200 dark:hover:bg-white/30 dark:focus:bg-white/30"
//                   href="#"
//                 >
//                   Another action
//                 </a>
//               </li>
//               <li>
//                 <a
//                   className="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 focus:bg-neutral-100 dark:text-neutral-200 dark:hover:bg-white/30 dark:focus:bg-white/30"
//                   href="#"
//                 >
//                   Something else here
//                 </a>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// }

// export default Nav_Bar;

////////////////////////////////////////////////////////////////////////
