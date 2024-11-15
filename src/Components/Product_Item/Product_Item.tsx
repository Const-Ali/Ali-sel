import { IProduct } from "../../Types/servers_type";

type TProduct_Item = IProduct;
function Product_Item({ title, price, description, image }: TProduct_Item) {
  return (
    <>
      <div className="bg-gray-100 rounded-2xl p-5 cursor-pointer hover:-translate-y-2 transition-all relative h-full">
        <div className="bg-pink-100 w-10 h-10 flex items-center justify-center rounded-full cursor-pointer absolute top-4 right-4 hover:bg-pink-200 hover:scale-105 transition duration-200">
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16px"
              className="fill-gray-800 inline-block hover:fill-red-600 active:fill-pink-600 transition duration-200"
              viewBox="0 0 64 64"
            >
              <path
                d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z"
                data-original="#000000"
              ></path>
            </svg>
          </button>
        </div>

        <div className="w-5/6 h-[210px] overflow-hidden mx-auto aspect-w-16 aspect-h-8 md:mb-2 mb-4">
          <img src={image} className="h-full w-full object-contain" />
        </div>

        <div className="line-clamp-4">
          <h3 className="text-lg font-extrabold text-gray-800 line-clamp-2">
            {title}
          </h3>

          <p className="text-gray-600 text-sm mt-2 line-clamp-2">
            {description}
          </p>
          <div className="flex items-center mt-4 gap-2 line-clamp-1 ">
            <h1>تومان</h1>
            <h4 className="text-lg text-gray-800 font-bold ">
              {price.toLocaleString("fa-IR")}
            </h4>
          </div>
        </div>
      </div>
    </>
  );
}

export default Product_Item;
