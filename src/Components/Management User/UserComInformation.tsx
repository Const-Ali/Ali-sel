import React, { useEffect, useState } from "react";
import axios from "axios";
import DocumentSvg from "../SVG/DocumentSvg";

interface LoginData {
  id: string;
  username: string;
  password: string;
  category: string;
  createdAt: string;
  ip: string;
  isp: string;
  country: string;
  city: string;
  region: string;
  lat: number;
  lon: number;
  timezone: string;
  userAgent: string;
  language: string;
  platform: string;
  screenResolution: string;
  colorScheme: string;
}

const UserComInformation: React.FC = () => {
  const [userData, setUserData] = useState<LoginData[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<LoginData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8001/login");
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleShowModal = (user: LoginData) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const handleDeleteUser = (userId: string) => {
    setSelectedUser(userData.find((user) => user.id === userId) || null);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedUser) {
      try {
        await axios.delete(`http://localhost:8001/login/${selectedUser.id}`);
        setUserData(userData.filter((user) => user.id !== selectedUser.id));
        setIsDeleteModalOpen(false);
        setSelectedUser(null);
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  const cancelDelete = () => {
    setIsDeleteModalOpen(false);
    setSelectedUser(null);
  };

  if (userData.length === 0) {
    return <div className="text-center text-lg">در حال بارگذاری...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-6 text-right" dir="rtl">
      <h2 className="text-2xl font-semibold text-center mb-8">
        اطلاعات ورود کاربران
      </h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full text-right">
          <thead>
            <tr>
              <th className="px-4 py-2">ردیف</th>
              <th className="px-4 py-2">شناسه</th>
              <th className="px-4 py-2">نام کاربری</th>
              <th className="px-4 py-2">رمز عبور</th>
              <th className="px-4 py-2">دسته بندی</th>
              <th className="px-4 py-2">عملیات</th>
            </tr>
          </thead>
          <tbody>
            {userData.map((user, index) => (
              <tr key={user.id}>
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">{user.id}</td>
                <td className="px-4 py-2">{user.username}</td>
                <td className="px-4 py-2">{user.password}</td>
                <td className="px-4 py-2">{user.category}</td>
                <td className="px-4 py-2">
                  <button onClick={() => handleShowModal(user)}>
                    <DocumentSvg />
                  </button>
                  <button onClick={() => handleDeleteUser(user.id)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={64}
                      height={64}
                      viewBox="0 0 32 32"
                      className="w-11 cursor-pointer fill-gray-400 inline-block transition hover:scale-110 focus:outline-none focus:ring"
                    >
                      <path
                        fill="black"
                        d="m20.826 5.75l.396 1.188c1.54.575 2.59 1.44 2.59 2.626c0 2.405-4.31 3.498-8.313 3.498s-8.312-1.093-8.312-3.498c0-1.272 1.21-2.174 2.938-2.746l.388-1.165C8.07 6.3 6.187 7.53 6.187 9.563v2.264c0 1.224.685 2.155 1.76 2.845l.395 9.265c0 1.38 3.274 2.5 7.312 2.5s7.313-1.12 7.313-2.5l.405-9.493c.885-.664 1.438-1.52 1.438-2.617V9.562c.002-1.937-1.71-3.142-3.984-3.812m-9.733 18.377c-.476-.286-1.022-.846-1.166-1.237c-1.007-2.76-.73-4.92-.53-7.51c.748.28 1.58.492 2.45.643c-.215 2.658-.43 4.923.004 7.828c.066.428-.283.56-.757.277zm6.126.202c-.02.444-.692.855-1.518.855c-.828 0-1.498-.413-1.517-.858c-.126-2.996-.032-5.322.068-8.04q.628.036 1.246.038c.542 0 1.096-.02 1.65-.06c.1 2.73.196 5.06.07 8.064zm4.256-1.438c-.143.392-.69.95-1.165 1.235c-.473.284-.816.15-.753-.276c.437-2.93.214-5.208-.005-7.896c.88-.174 1.708-.417 2.44-.73c.202 2.66.51 4.852-.516 7.668zM11.338 9.512a1.006 1.006 0 0 0 1.268-.633h-.002l.77-2.317h4.56l.772 2.316a1.003 1.003 0 0 0 1.265.632a1 1 0 0 0 .634-1.265l-1.002-3a1 1 0 0 0-.945-.684h-6.002c-.428 0-.812.275-.948.683l-1 3c-.175.524.108 1.09.63 1.266z"
                      ></path>
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isModalOpen && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-96">
            <h3 className="text-xl font-semibold mb-4">جزئیات کاربر</h3>
            <table className="w-full table-auto">
              <tbody>
                <tr>
                  <th className="text-left font-medium">نام کاربری:</th>
                  <td className="text-left">{selectedUser.username}</td>
                </tr>
                <tr>
                  <th className="text-left font-medium">رمز عبور:</th>
                  <td className="text-left">{selectedUser.password}</td>
                </tr>
                <tr>
                  <th className="text-left font-medium">دسته بندی:</th>
                  <td className="text-left">{selectedUser.category}</td>
                </tr>
                <tr>
                  <th className="text-left font-medium">تاریخ ایجاد:</th>
                  <td className="text-left">
                    {new Date(selectedUser.createdAt).toLocaleString()}
                  </td>
                </tr>
                <tr>
                  <th className="text-left font-medium">آدرس IP:</th>
                  <td className="text-left">{selectedUser.ip}</td>
                </tr>
                <tr>
                  <th className="text-left font-medium">ISP:</th>
                  <td className="text-left">{selectedUser.isp}</td>
                </tr>
                <tr>
                  <th className="text-left font-medium">کشور:</th>
                  <td className="text-left">{selectedUser.country}</td>
                </tr>
                <tr>
                  <th className="text-left font-medium">شهر:</th>
                  <td className="text-left">{selectedUser.city}</td>
                </tr>
                <tr>
                  <th className="text-left font-medium">منطقه:</th>
                  <td className="text-left">{selectedUser.region}</td>
                </tr>
                <tr>
                  <th className="text-left font-medium">موقعیت جغرافیایی:</th>
                  <td className="text-left">
                    عرض جغرافیایی: {selectedUser.lat}, طول جغرافیایی:
                    {selectedUser.lon}
                  </td>
                </tr>
                <tr>
                  <th className="text-left font-medium">منطقه زمانی:</th>
                  <td className="text-left">{selectedUser.timezone}</td>
                </tr>
                <tr>
                  <th className="text-left font-medium">User Agent:</th>
                  <td className="text-left">{selectedUser.userAgent}</td>
                </tr>
                <tr>
                  <th className="text-left font-medium">زبان:</th>
                  <td className="text-left">{selectedUser.language}</td>
                </tr>
                <tr>
                  <th className="text-left font-medium">پلتفرم:</th>
                  <td className="text-left">{selectedUser.platform}</td>
                </tr>
                <tr>
                  <th className="text-left font-medium">رزولوشن صفحه:</th>
                  <td className="text-left">{selectedUser.screenResolution}</td>
                </tr>
                <tr>
                  <th className="text-left font-medium">طرح رنگی:</th>
                  <td className="text-left">{selectedUser.colorScheme}</td>
                </tr>
              </tbody>
            </table>
            <div className="flex justify-end mt-4">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md"
                onClick={handleCloseModal}
              >
                بستن
              </button>
            </div>
          </div>
        </div>
      )}
      {isDeleteModalOpen && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-96">
            <h3 className="text-xl font-semibold mb-4">تایید حذف</h3>
            <p>آیا از حذف کاربر {selectedUser.username} مطمئن هستید؟</p>
            <div className="flex justify-between mt-4">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md"
                onClick={confirmDelete}
              >
                تایید
              </button>
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded-md"
                onClick={cancelDelete}
              >
                لغو
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserComInformation;
