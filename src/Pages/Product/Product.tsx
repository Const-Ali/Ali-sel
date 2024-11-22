import { Link, useParams } from "react-router-dom";
import Container from "../../Components/Container/Container";
import Button from "../../Components/Button/Button";
import { getProduct } from "../../Services/Api";
import { useEffect, useState } from "react";
import { IProduct } from "../../Types/servers_type";
import { useShop_Card_Cont } from "../context/Shop_Card_Cont";
import Spinner from "../../Components/Spinner/Spinner";
import RateProPage from "../../Components/RateProPage/RateProPage";
import Pro4item from "../../Components/Product_Item/Pro4item";

function Product() {
  const params = useParams<{ id: string }>();
  const [product, setProduct] = useState<IProduct>();
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  const {
    handleDecreaseProductQty,
    handleIncreaseProductQty,
    getProductQty,
    handleRemoveProductQty,
  } = useShop_Card_Cont();
  const [isloding, setIsloding] = useState(true);

  useEffect(() => {
    getProduct(params.id as string)
      .then((data) => {
        setProduct(data);
        setIsloding(false);
      })
      .catch((error) => {
        console.log(error);
        setIsloding(false);
      });
  }, [params.id]);

  const [error, setError] = useState<string | null>(null);

  const currentQty = getProductQty(parseInt(params.id as string));
  const inventory = product?.inventory || 0;

  const handleAddToCart = () => {
    if (currentQty > inventory) {
      setError(
        `موجودی محصول تنها ${inventory.toLocaleString("fa-IR")} عدد است.`
      );
    } else {
      handleIncreaseProductQty(parseInt(params.id as string));
      setError(null);
    }
  };

  useEffect(() => {
    const isQuantityValid = currentQty <= inventory;
    if (!isQuantityValid) {
      setError(
        `موجودی محصول تنها ${inventory.toLocaleString("fa-IR")} عدد است.`
      );
    } else {
      setError(null);
    }
  }, [currentQty, inventory]);

  const colors = [
    { name: "مشکی", code: "black" },
    { name: "خاکستری", code: "gray-400" },
    { name: "نارنجی", code: "orange-400" },
    { name: "قرمز", code: "red-500" },
  ];

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
  };

  const [isLiked, setIsLiked] = useState(false);

  const toggleLike = () => {
    setIsLiked(!isLiked);
  };

  return (
    <>
      <Container>
        {isloding ? (
          <Spinner />
        ) : (
          <>
            <div className="bg-red- flex justify-between mt-5">
              <div className="mt-7 ml-7 w-80 h-[500px] bg-gray-100 rounded-lg">
                <div className="flex flex-col items-end mx-4 mt-7">
                  <div className="flex items-center gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1em"
                      height="1em"
                      viewBox="0 0 24 24"
                      className="cursor-pointer"
                    >
                      <path
                        fill="none"
                        stroke="black"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.25}
                        d="M19 18L5 12l14-6"
                      ></path>
                    </svg>
                    <h1 className="text-sm text-gray-500 ml-36 ">
                      ارسال تکنوسنتر
                    </h1>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1.2em"
                      height="1.2em"
                      viewBox="0 0 24 24"
                      style={{ transform: "scaleX(-1)" }}
                    >
                      <path
                        fill="black"
                        d="M18 18.5c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5s.67 1.5 1.5 1.5m1.5-9H17V12h4.46zM6 18.5c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5s.67 1.5 1.5 1.5M20 8l3 4v5h-2c0 1.66-1.34 3-3 3s-3-1.34-3-3H9c0 1.66-1.34 3-3 3s-3-1.34-3-3H1V6c0-1.11.89-2 2-2h14v4zM3 6v9h.76c.55-.61 1.35-1 2.24-1s1.69.39 2.24 1H15V6z"
                      ></path>
                    </svg>
                  </div>
                  <div className="flex items-center gap-1">
                    <h1 className="text-sm text-gray-500 ml-2">
                      ارسال امروز (فقط استان تهران)
                    </h1>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1.2em"
                      height="1.2em"
                      viewBox="0 0 24 24"
                      style={{ transform: "scaleX(-1)" }}
                    >
                      <path
                        fill="black"
                        d="M.75 7.5h9.75l.75 1.5H1.5zm1 3h9.75l.75 1.5H2.5zm16.25 8c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5s.67 1.5 1.5 1.5m1.5-9H17V12h4.46zM8 18.5c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5s.67 1.5 1.5 1.5M20 8l3 4v5h-2c0 1.66-1.34 3-3 3s-3-1.34-3-3h-4c0 1.66-1.35 3-3 3c-1.66 0-3-1.34-3-3H3v-3.5h2V15h.76c.55-.61 1.35-1 2.24-1s1.69.39 2.24 1H15V6H3c0-1.11.89-2 2-2h12v4z"
                      ></path>
                    </svg>
                  </div>
                </div>

                <hr className="my-8 mx-4 border border-gray-400" />

                <div className=" col-span-2 mx-4">
                  {currentQty === 0 ? (
                    <Button
                      className="w-full !py-3 "
                      variant="primary"
                      onClick={handleAddToCart}
                    >
                      اضافه به سبد خرید
                    </Button>
                  ) : (
                    <>
                      <div className="flex items-center justify-end">
                        <p className="font-bold mr-1 text-gray-500">تومان</p>
                        <p className="text-right p-2 mb-2 text-3xl font-extrabold text-gray-700">
                          {((product?.price || 0) * currentQty).toLocaleString(
                            "fa-IR",
                            {
                              minimumFractionDigits: 0,
                              maximumFractionDigits: 0,
                            }
                          )}
                        </p>
                      </div>

                      <div className="flex justify-end items-center gap-x-3 00">
                        <h1 className="self-end">در سبد شما</h1>

                        <div className="mt-2 flex justify-center items-center ">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={50}
                            height={50}
                            viewBox="0 0 256 256"
                            onClick={() => {
                              if (currentQty <= inventory) {
                                handleIncreaseProductQty(
                                  parseInt(params.id as string)
                                );
                              }
                            }}
                            className="cursor-pointer font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring"
                          >
                            <path
                              fill="#685ee8"
                              d="M208 32H48a16 16 0 0 0-16 16v160a16 16 0 0 0 16 16h160a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16m-24 104h-48v48a8 8 0 0 1-16 0v-48H72a8 8 0 0 1 0-16h48V72a8 8 0 0 1 16 0v48h48a8 8 0 0 1 0 16"
                            ></path>
                          </svg>
                        </div>

                        <span className="flex justify-center items-center text-2xl">
                          {currentQty.toLocaleString("fa-IR")}
                        </span>
                        <div className="mt-2 flex justify-center items-center ">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={50}
                            height={50}
                            viewBox="0 0 256 256"
                            onClick={() =>
                              handleDecreaseProductQty(
                                parseInt(params.id as string)
                              )
                            }
                            className="cursor-pointer font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring"
                          >
                            <path
                              fill="#e85e5e"
                              d="M208 32H48a16 16 0 0 0-16 16v160a16 16 0 0 0 16 16h160a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16m-24 104H72a8 8 0 0 1 0-16h112a8 8 0 0 1 0 16"
                            ></path>
                          </svg>
                        </div>
                      </div>

                      <div className="flex justify-end items-center mr-1 ">
                        <h1 className="self-start mr-4">
                          مشاهده
                          <Link className="font-bold text-blue-400" to="/Cart">
                            سبد خرید
                          </Link>
                        </h1>
                        <Button
                          className="flex justify-center items-center w-32"
                          variant="danger"
                          onClick={() =>
                            handleRemoveProductQty(
                              parseInt(params.id as string)
                            )
                          }
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={35}
                            height={35}
                            viewBox="0 0 32 32"
                            className="font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring"
                          >
                            <path
                              fill="black"
                              d="m20.826 5.75l.396 1.188c1.54.575 2.59 1.44 2.59 2.626c0 2.405-4.31 3.498-8.313 3.498s-8.312-1.093-8.312-3.498c0-1.272 1.21-2.174 2.938-2.746l.388-1.165C8.07 6.3 6.187 7.53 6.187 9.563v2.264c0 1.224.685 2.155 1.76 2.845l.395 9.265c0 1.38 3.274 2.5 7.312 2.5s7.313-1.12 7.313-2.5l.405-9.493c.885-.664 1.438-1.52 1.438-2.617V9.562c.002-1.937-1.71-3.142-3.984-3.812m-9.733 18.377c-.476-.286-1.022-.846-1.166-1.237c-1.007-2.76-.73-4.92-.53-7.51c.748.28 1.58.492 2.45.643c-.215 2.658-.43 4.923.004 7.828c.066.428-.283.56-.757.277zm6.126.202c-.02.444-.692.855-1.518.855c-.828 0-1.498-.413-1.517-.858c-.126-2.996-.032-5.322.068-8.04q.628.036 1.246.038c.542 0 1.096-.02 1.65-.06c.1 2.73.196 5.06.07 8.064zm4.256-1.438c-.143.392-.69.95-1.165 1.235c-.473.284-.816.15-.753-.276c.437-2.93.214-5.208-.005-7.896c.88-.174 1.708-.417 2.44-.73c.202 2.66.51 4.852-.516 7.668zM11.338 9.512a1.006 1.006 0 0 0 1.268-.633h-.002l.77-2.317h4.56l.772 2.316a1.003 1.003 0 0 0 1.265.632a1 1 0 0 0 .634-1.265l-1.002-3a1 1 0 0 0-.945-.684h-6.002c-.428 0-.812.275-.948.683l-1 3c-.175.524.108 1.09.63 1.266z"
                            ></path>
                          </svg>
                        </Button>
                      </div>
                    </>
                  )}
                  {error && <p className="text-red-600 mt-2">{error}</p>}
                </div>
                <hr className="my-8 mx-4 border border-gray-400" />
              </div>
              <div className="font-sans flex justify-end">
                <div className="p-4 lg:max-w-6xl max-w-2xl max-lg:mx-auto">
                  <div className="grid items-start grid-cols-1 lg:grid-cols-2 gap-8 max-lg:gap-16">
                    <div>
                      <div className="flex justify-between items-start gap-4">
                        <div className="flex gap-4">
                          <button
                            type="button"
                            className={`px-2.5 py-1.5  text-xs text-gray-800 rounded-md flex items-center ${isLiked ? "bg-red-300 " : "bg-gray-100"}`}
                            onClick={toggleLike}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16px"
                              className={`cursor-pointer font-medium transition hover:scale-125 hover:shadow-xl focus:outline-none focus:ring ${isLiked ? "fill-red-700 " : "fill-gray-800"}`}
                              viewBox="0 0 64 64"
                            >
                              <path d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z"></path>
                            </svg>
                          </button>

                          <button
                            type="button"
                            className="px-2.5 py-1.5 bg-gray-100 text-xs text-gray-800 rounded-md flex items-center"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="12px"
                              fill="currentColor"
                              viewBox="0 0 512 512"
                              className="cursor-pointer font-medium transition hover:scale-125 hover:shadow-xl focus:outline-none focus:ring"
                            >
                              <path
                                d="M453.332 85.332c0 38.293-31.039 69.336-69.332 69.336s-69.332-31.043-69.332-69.336C314.668 47.043 345.707 16 384 16s69.332 31.043 69.332 69.332zm0 0"
                                data-original="#000000"
                              />
                              <path
                                d="M384 170.668c-47.063 0-85.332-38.273-85.332-85.336C298.668 38.273 336.938 0 384 0s85.332 38.273 85.332 85.332c0 47.063-38.27 85.336-85.332 85.336zM384 32c-29.418 0-53.332 23.938-53.332 53.332 0 29.398 23.914 53.336 53.332 53.336s53.332-23.938 53.332-53.336C437.332 55.938 413.418 32 384 32zm69.332 394.668C453.332 464.957 422.293 496 384 496s-69.332-31.043-69.332-69.332c0-38.293 31.039-69.336 69.332-69.336s69.332 31.043 69.332 69.336zm0 0"
                                data-original="#000000"
                              />
                              <path
                                d="M384 512c-47.063 0-85.332-38.273-85.332-85.332 0-47.063 38.27-85.336 85.332-85.336s85.332 38.273 85.332 85.336c0 47.059-38.27 85.332-85.332 85.332zm0-138.668c-29.418 0-53.332 23.938-53.332 53.336C330.668 456.063 354.582 480 384 480s53.332-23.938 53.332-53.332c0-29.398-23.914-53.336-53.332-53.336zM154.668 256c0 38.293-31.043 69.332-69.336 69.332C47.043 325.332 16 294.293 16 256s31.043-69.332 69.332-69.332c38.293 0 69.336 31.039 69.336 69.332zm0 0"
                                data-original="#000000"
                              />
                              <path
                                d="M85.332 341.332C38.273 341.332 0 303.062 0 256s38.273-85.332 85.332-85.332c47.063 0 85.336 38.27 85.336 85.332s-38.273 85.332-85.336 85.332zm0-138.664C55.914 202.668 32 226.602 32 256s23.914 53.332 53.332 53.332c29.422 0 53.336-23.934 53.336-53.332s-23.914-53.332-53.336-53.332zm0 0"
                                data-original="#000000"
                              />
                              <path
                                d="M135.703 245.762c-7.426 0-14.637-3.864-18.562-10.774-5.825-10.218-2.239-23.254 7.98-29.101l197.95-112.852c10.218-5.867 23.253-2.281 29.1 7.977 5.825 10.218 2.24 23.254-7.98 29.101L146.238 242.965a21.195 21.195 0 0 1-10.535 2.797zm197.93 176c-3.586 0-7.211-.899-10.54-2.797L125.142 306.113c-10.22-5.824-13.801-18.86-7.977-29.101 5.8-10.239 18.856-13.844 29.098-7.977l197.953 112.852c10.219 5.824 13.8 18.86 7.976 29.101-3.945 6.91-11.156 10.774-18.558 10.774zm0 0"
                                data-original="#000000"
                              />
                            </svg>
                          </button>
                        </div>
                        <div className="flex flex-col items-end">
                          <h2 className="text-2xl font-bold text-gray-800 text-right">
                            {product?.title.replace(/[A-Za-z]/g, "").trim()}
                            {product?.title.replace(/[^A-Za-z]/g, "").trim()}
                          </h2>
                          <p className="text-sm text-gray-500 mt-2">
                            {product?.category}
                          </p>
                        </div>
                      </div>

                      <hr className="my-8" />

                      <div className="flex justify-between items-start gap-4">
                        <div className="flex gap-4">
                          <button
                            type="button"
                            className="px-2.5 py-1.5 bg-pink-100 text-xs text-pink-600 rounded-md flex items-center"
                          >
                            <svg
                              className="mr-1 w-3 cursor-pointer font-medium transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring"
                              fill="currentColor"
                              viewBox="0 0 14 13"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                            </svg>
                            {product?.rating.rate.toLocaleString("fa-IR")}
                          </button>
                          <button
                            type="button"
                            className="px-2.5 py-1.5 bg-gray-100 text-xs text-gray-800 rounded-md flex items-center"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="mr-1 w-3 cursor-pointer font-medium transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring"
                              fill="currentColor"
                              viewBox="0 0 32 32"
                            >
                              <path
                                d="M14.236 21.954h-3.6c-.91 0-1.65-.74-1.65-1.65v-7.201c0-.91.74-1.65 1.65-1.65h3.6a.75.75 0 0 1 .75.75v9.001a.75.75 0 0 1-.75.75zm-3.6-9.001a.15.15 0 0 0-.15.15v7.2a.15.15 0 0 0 .15.151h2.85v-7.501z"
                                data-original="#000000"
                              />
                              <path
                                d="M20.52 21.954h-6.284a.75.75 0 0 1-.75-.75v-9.001c0-.257.132-.495.348-.633.017-.011 1.717-1.118 2.037-3.25.18-1.184 1.118-2.089 2.28-2.201a2.557 2.557 0 0 1 2.17.868c.489.56.71 1.305.609 2.042a9.468 9.468 0 0 1-.678 2.424h.943a2.56 2.56 0 0 1 1.918.862c.483.547.708 1.279.617 2.006l-.675 5.401a2.565 2.565 0 0 1-2.535 2.232zm-5.534-1.5h5.533a1.06 1.06 0 0 0 1.048-.922l.675-5.397a1.046 1.046 0 0 0-1.047-1.182h-2.16a.751.751 0 0 1-.648-1.13 8.147 8.147 0 0 0 1.057-3 1.059 1.059 0 0 0-.254-.852 1.057 1.057 0 0 0-.795-.365c-.577.052-.964.435-1.04.938-.326 2.163-1.71 3.507-2.369 4.036v7.874z"
                                data-original="#000000"
                              />
                              <path
                                d="M4 31.75a.75.75 0 0 1-.612-1.184c1.014-1.428 1.643-2.999 1.869-4.667.032-.241.055-.485.07-.719A14.701 14.701 0 0 1 1.25 15C1.25 6.867 7.867.25 16 .25S30.75 6.867 30.75 15 24.133 29.75 16 29.75a14.57 14.57 0 0 1-5.594-1.101c-2.179 2.045-4.61 2.81-6.281 3.09A.774.774 0 0 1 4 31.75zm12-30C8.694 1.75 2.75 7.694 2.75 15c0 3.52 1.375 6.845 3.872 9.362a.75.75 0 0 1 .217.55c-.01.373-.042.78-.095 1.186A11.715 11.715 0 0 1 5.58 29.83a10.387 10.387 0 0 0 3.898-2.37l.231-.23a.75.75 0 0 1 .84-.153A13.072 13.072 0 0 0 16 28.25c7.306 0 13.25-5.944 13.25-13.25S23.306 1.75 16 1.75z"
                                data-original="#000000"
                              />
                            </svg>
                            {product?.rating.count.toLocaleString("fa-IR")}
                            بازدید
                          </button>
                        </div>
                        <div className="flex flex-col items-end">
                          <div className="flex items-end">
                            <p className="font-bold mr-1 text-gray-500">
                              تومان
                            </p>
                            <p className="text-right p-2 mb-2 text-3xl font-extrabold">
                              {product?.price.toLocaleString("fa-IR", {
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 0,
                              })}
                            </p>
                          </div>

                          <p className="text-gray-500 text-sm mt-2">
                            <span className="text-sm ml-1">موجودی :</span>
                            <strong>
                              {product?.inventory.toLocaleString("fa-IR")} عدد
                            </strong>
                          </p>
                        </div>
                      </div>

                      <hr className="my-8" />

                      <div className="flex flex-col items-end gap-4">
                        <h3 className="text-xl font-bold text-gray-800">
                          رنگ {selectedColor && <span> : {selectedColor}</span>}
                        </h3>
                        <div className="flex flex-wrap gap-4 mt-4">
                          {colors.map((color) => (
                            <button
                              key={color.code}
                              type="button"
                              onClick={() => handleColorSelect(color.name)}
                              className={`w-10 h-10 bg-${color.code} border-2 ${
                                selectedColor === color.name
                                  ? "border-gray-800"
                                  : "border-white"
                              } hover:border-gray-800 rounded-md shrink-0 inline-block px-8 py-3 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:bg-indigo-500`}
                            ></button>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="w-full lg:sticky top-0 text-center mb-">
                      <div className="lg:h-auto">
                        <img
                          src={product?.image}
                          alt="Product"
                          className="lg:w-11/12 w-full h-full rounded-md object-cover object-top"
                        />
                      </div>
                    </div>
                  </div>

                  <div className=" max-w-4xl ">
                    <ul className="flex border-b flex-row-reverse">
                      <li className="text-gray-800 font-semibold text-sm bg-gray-100 py-3 px-8 border-b-2 border-gray-800 cursor-pointer transition-all">
                        توضیحات
                      </li>
                      <li className="text-gray-500 font-semibold text-sm hover:bg-gray-100 py-3 px-8 cursor-pointer transition-all">
                        مشخصات فنی
                      </li>
                    </ul>

                    <div className="mt-8">
                      <h3 className="text-xl font-bold text-gray-800 text-right">
                        توضیحات محصول
                      </h3>
                      <p className="text-sm text-gray-500 mt-4 text-right">
                        {product?.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pb-10">
              <Pro4item />
            </div>
            <div className="pt-10">
              <RateProPage />
            </div>
          </>
        )}
      </Container>
    </>
  );
}

export default Product;
