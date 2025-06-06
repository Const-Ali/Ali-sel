import { useNavigate } from "react-router-dom";

function Pro4item() {
  const navigate = useNavigate();
  return (
    <div className="w-full h-24 px-96">
      <div className="flex justify-between items-center pt-8">
        <div
          className="cursor-pointer transition transform hover:scale-105 hover:shadow-xl p-4 rounded-lg w-44 pl-8"
          onClick={() => navigate("/Pro4itemsOne")}
        >
          <img
            className="pl-4 w-20"
            src="https://res.cloudinary.com/ds1yjxg7s/image/upload/v1749208763/static_pay-at-home_hm8xfw.svg"
          />
          <p className=" text-gray-500 text-sm pl-3"> پرداخت در محل</p>
        </div>
        <div
          className="cursor-pointer transition transform hover:scale-105 hover:shadow-xl p-4 rounded-lg w-44 pl-10"
          onClick={() => navigate("/Pro4itemsTwo")}
        >
          <img
            className="pl-3"
            src="https://res.cloudinary.com/ds1yjxg7s/image/upload/v1749208763/static_original-warranty_thbcl8.svg"
          />
          <p className=" text-gray-500 text-sm">ضمانت اصالت کالا</p>
        </div>
        <div
          className="cursor-pointer transition transform hover:scale-105 hover:shadow-xl p-4 rounded-lg w-44 pl-12"
          onClick={() => navigate("/Pro4itemsThree")}
        >
          <img src="https://res.cloudinary.com/ds1yjxg7s/image/upload/v1749208764/static_refund-money_gsmrzs.svg" />
          <p className=" text-gray-500 text-sm">پرداخت قسطی</p>
        </div>
        <div
          className="cursor-pointer transition transform hover:scale-105 hover:shadow-xl p-4 rounded-lg w-44"
          onClick={() => navigate("/Pro4itemsFour")}
        >
          <img
            className="pl-10"
            src="https://res.cloudinary.com/ds1yjxg7s/image/upload/v1749208764/static_payment-in-installments_pqk8m3.svg"
          />
          <div className="flex justify-end items-center ">
            <p className=" text-gray-500 text-sm"> روز ضمانت بازگشت کالا </p>
            <strong className="text-gray-600 ml-2">7</strong>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center text-gray-500 text-sm"></div>
    </div>
  );
}

export default Pro4item;
