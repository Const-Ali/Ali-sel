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
            src="https://www.upload.ee/image/17325996/design__1_.png"
          />
          <p className=" text-gray-500 text-sm pl-3"> پرداخت در محل</p>
        </div>
        <div
          className="cursor-pointer transition transform hover:scale-105 hover:shadow-xl p-4 rounded-lg w-44 pl-10"
          onClick={() => navigate("/Pro4itemsTwo")}
        >
          <img
            className="pl-3"
            src="https://www.upload.ee/image/17325994/design__2_.png"
          />
          <p className=" text-gray-500 text-sm">ضمانت اصالت کالا</p>
        </div>
        <div
          className="cursor-pointer transition transform hover:scale-105 hover:shadow-xl p-4 rounded-lg w-44 pl-12"
          onClick={() => navigate("/Pro4itemsThree")}
        >
          <img src="https://www.upload.ee/image/17325997/design.png" />
          <p className=" text-gray-500 text-sm">پرداخت قسطی</p>
        </div>
        <div
          className="cursor-pointer transition transform hover:scale-105 hover:shadow-xl p-4 rounded-lg w-44"
          onClick={() => navigate("/Pro4itemsFour")}
        >
          <img
            className="pl-10"
            src="https://www.upload.ee/image/17325993/design__3_.png"
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
