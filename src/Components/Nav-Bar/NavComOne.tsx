import { useEffect, useState } from "react";
import axios from "axios";

interface User {
  id: number;
  imguser: string;
  name: { firstname: string; lastname: string };
  phone: string;
}

interface NavComOneProps {
  onClose: () => void;
}

function NavComOne({ onClose }: NavComOneProps) {
  const [userData, setUserData] = useState<User | null>(null);
  const userId = JSON.parse(localStorage.getItem("user") || "null")?.id;

  useEffect(() => {
    if (userId) {
      axios
        .get(`http://localhost:8001/users/${userId}`)
        .then((response) => {
          setUserData(response.data);
        })
        .catch((error) => {
          console.error("Failed to fetch user data:", error);
        });
    }
  }, [userId]);

  const handleSave = () => {
    if (userId && userData) {
      axios
        .put(`http://localhost:8001/users/${userId}`, userData)
        .then(() => {
          alert("یک بار خارج و مجددا وارد شوید");
          onClose();
        })
        .catch((error) => {
          console.error("Failed to update user data:", error);
        });
    }
  };

  if (!userData) return null;

  return (
    <div>
      <div className="fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto font-[sans-serif]">
        <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-8 relative">
          <div className="flex items-center">
            <h3 className="text-blue-600 text-xl font-bold flex-1">
              ویرایش اطلاعات کاربری
            </h3>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-3 ml-2 cursor-pointer shrink-0 fill-gray-400 hover:fill-red-500"
              viewBox="0 0 320.591 320.591"
              onClick={onClose}
            >
              <path d="..."></path>
            </svg>
          </div>

          <form className="space-y-4 mt-8">
            <div>
              <label className="text-gray-800 text-sm mb-2 block">تصویر</label>
              <input
                type="url"
                value={userData.imguser}
                onChange={(e) =>
                  setUserData({ ...userData, imguser: e.target.value })
                }
                className="px-4 py-3 bg-gray-100 w-full text-gray-800 text-sm border-none focus:outline-blue-600 focus:bg-transparent rounded-lg"
              />
            </div>

            <div>
              <label className="text-gray-800 text-sm mb-2 block">نام</label>
              <input
                type="text"
                value={userData.name.firstname}
                onChange={(e) =>
                  setUserData({
                    ...userData,
                    name: { ...userData.name, firstname: e.target.value },
                  })
                }
                className="px-4 py-3 bg-gray-100 w-full text-gray-800 text-sm border-none focus:outline-blue-600 focus:bg-transparent rounded-lg"
              />
            </div>

            <div>
              <label className="text-gray-800 text-sm mb-2 block">
                نام خانوادگی
              </label>
              <input
                type="text"
                value={userData.name.lastname}
                onChange={(e) =>
                  setUserData({
                    ...userData,
                    name: { ...userData.name, lastname: e.target.value },
                  })
                }
                className="px-4 py-3 bg-gray-100 w-full text-gray-800 text-sm border-none focus:outline-blue-600 focus:bg-transparent rounded-lg"
              />
            </div>

            <div className="flex justify-end gap-4 !mt-8">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 rounded-lg text-gray-800 text-sm border-none outline-none tracking-wide bg-gray-200 hover:bg-gray-300"
              >
                انصراف
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="px-6 py-3 rounded-lg text-white text-sm border-none outline-none tracking-wide bg-blue-600 hover:bg-blue-700"
              >
                ذخیره
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default NavComOne;
