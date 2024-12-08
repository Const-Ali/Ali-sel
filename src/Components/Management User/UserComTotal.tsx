import { useEffect, useState } from "react";
import axios from "axios";
import { getUsers } from "../../Services/Api";
import TextTitle from "../PropComponents/TextTitle";
import DeleteSvg from "../SVG/DeleteSvg";
import EditSvg from "../SVG/EditSvg";
import SerchSvg from "../SVG/SerchSvg";

function UserComTotal() {
  interface IUser {
    createdAt: string;
    category: string | null;
    id: number;
    email: string;
    username: string;
    password: string;
    name: {
      firstname: string;
      lastname: string;
    };
    phone: string;
    [key: string]: any;
  }

  const [users, setUsers] = useState<IUser[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const [search, setSearch] = useState("");
  const [sortOption, setSortOption] = useState("جدیدترین");

  useEffect(() => {
    getUsers()
      .then((result) => {
        setUsers(result);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleDelete = (id: number) => {
    setSelectedUserId(id);
    setShowModal(true);
  };

  const confirmDelete = () => {
    if (selectedUserId) {
      axios
        .delete(`http://localhost:8001/users/${selectedUserId}`)
        .then(() => {
          setUsers(users.filter((user) => user.id !== selectedUserId));
          setShowModal(false);
        })
        .catch((error) => {
          console.error("Error deleting user:", error);
          alert("خطا در حذف کاربر. لطفاً دوباره تلاش کنید.");
        });
    }
  };

  const handleEdit = (id: number) => {
    const userToEdit = users.find((user) => user.id === id);
    setSelectedUser(userToEdit || null);
    setShowEditModal(true);
  };

  const handleUpdate = () => {
    if (selectedUser) {
      axios
        .put(`http://localhost:8001/users/${selectedUser.id}`, selectedUser)
        .then(() => {
          setUsers(
            users.map((user) =>
              user.id === selectedUser.id ? selectedUser : user
            )
          );
          setShowEditModal(false);
        })
        .catch((error) => {
          console.error("Error updating user:", error);
          alert("خطا در به‌روزرسانی کاربر. لطفاً دوباره تلاش کنید.");
        });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (selectedUser) {
      if (name.includes(".")) {
        const [parent, child] = name.split(".");
        setSelectedUser({
          ...selectedUser,
          [parent]: {
            ...selectedUser[parent],
            [child]: value,
          },
        });
      } else {
        setSelectedUser({
          ...selectedUser,
          [name]: value,
        });
      }
    }
  };

  const filteredUsers = users.filter((item) =>
    `${item.name.firstname} ${item.name.lastname}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const sortedUsers = () => {
    switch (sortOption) {
      case "جدیدترین":
        return [...filteredUsers].sort((a, b) =>
          a.createdAt < b.createdAt ? 1 : -1
        );
      case "Z to A":
        return [...filteredUsers]
          .sort((a, b) => a.username.localeCompare(b.username))
          .reverse();
      case "A to Z":
        return [...filteredUsers].sort((a, b) =>
          a.username.localeCompare(b.username)
        );
      case "قدیمی ترین":
        return [...filteredUsers].sort((a, b) =>
          a.createdAt > b.createdAt ? 1 : -1
        );
      default:
        return filteredUsers;
    }
  };

  const sortedAndFilteredUsers = sortedUsers();

  return (
    <div className="container mx-auto">
      <div>
        <TextTitle value="لیست کاربران سایت" />
      </div>
      <form className="max-w-md mx-auto w-full p-5">
        <div className="flex items-center gap-6 flex-row">
          <div className="relative w-full">
            <input
              className="block w-full p-4 pe-10 text-sm text-gray-600 border border-gray-400 rounded-lg"
              placeholder="جستجوی کاربران"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className="absolute inset-y-0 end-0 flex items-center pe-3 pointer-events-none">
              <SerchSvg />
            </div>
          </div>
          <select
            className="p-2 border border-gray-400 rounded-lg"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="جدیدترین">جدیدترین</option>
            <option value="A to Z">A to Z</option>
            <option value="Z to A">Z to A</option>
            <option value="قدیمی ترین">قدیمی ترین</option>
          </select>
        </div>
      </form>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">عملیات</th>
            <th className="border border-gray-300 p-2">رمز ورود</th>
            <th className="border border-gray-300 p-2">نام کاربری</th>
            <th className="border border-gray-300 p-2">شماره تماس</th>
            <th className="border border-gray-300 p-2">ایمیل</th>
            <th className="border border-gray-300 p-2">نام</th>
            <th className="border border-gray-300 p-2">شناسه</th>
            <th className="border border-gray-300 p-2">سطح دسترسی</th>
          </tr>
        </thead>
        <tbody>
          {sortedAndFilteredUsers.map((user) => (
            <tr key={user.id}>
              <td className="border border-gray-300 p-2 text-center space-x-2">
                <button onClick={() => handleEdit(user.id)}>
                  <EditSvg />
                </button>
                <button onClick={() => handleDelete(user.id)}>
                  <DeleteSvg />
                </button>
              </td>
              <td className="border border-gray-300 p-2 text-center">
                {user.password}
              </td>
              <td className="border border-gray-300 p-2 text-center">
                {user.username}
              </td>
              <td className="border border-gray-300 p-2 text-center">
                {user.phone}
              </td>
              <td className="border border-gray-300 p-2 text-center">
                {user.email}
              </td>
              <td className="border border-gray-300 p-2 text-center">
                {user.name.firstname} {user.name.lastname}
              </td>
              <td className="border border-gray-300 p-2 text-center">
                {user.id}
              </td>
              <td className="border border-gray-300 p-2 text-center">
                {user.category}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black opacity-50 backdrop-blur-sm"></div>
          <div className="flex flex-col p-4 relative items-center justify-center bg-gray-800 border border-gray-800 shadow-lg rounded-2xl w-80">
            <div className="text-center p-5 flex-auto justify-center">
              <h2 className="text-xl font-bold py-4 text-gray-200">
                آیا مطمئن هستید؟
              </h2>
              <p className="text-sm text-gray-500 px-2">
                آیا می‌خواهید کاربر با آیدی <strong>{selectedUserId}</strong> را
                حذف کنید؟ این عملیات قابل بازگشت نیست.
              </p>
            </div>
            <div className="p-3 mt-2 text-center space-x-4">
              <button
                className="bg-gray-700 px-4 py-1 text-sm font-medium tracking-wider border-2 border-gray-600 hover:border-gray-700 text-gray-300 rounded-full hover:bg-gray-800 transition ease-in duration-300"
                onClick={() => setShowModal(false)}
              >
                لغو
              </button>
              <button
                className="bg-green-400 hover:bg-green-500 px-4 py-1 text-sm font-medium tracking-wider border-2 border-green-300 hover:border-green-500 text-white rounded-full transition ease-in duration-300"
                onClick={confirmDelete}
              >
                تأیید
              </button>
            </div>
          </div>
        </div>
      )}
      {showEditModal && selectedUser && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black opacity-50 backdrop-blur-sm"></div>
          <div className="flex flex-col p-4 relative items-center justify-center bg-gray-800 border border-gray-800 shadow-lg rounded-2xl w-96">
            <h2 className="text-xl font-bold py-4 text-gray-200">
              ویرایش کاربر
            </h2>
            <div className="mb-4">
              <label htmlFor="username" className="block text-gray-400 mb-4">
                نام کاربری
              </label>
              <input
                type="text"
                name="username"
                value={selectedUser.username}
                onChange={handleChange}
                placeholder="نام کاربری"
                className="border border-gray-300 p-2 rounded w-80"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-400 mb-4">
                رمز ورود
              </label>
              <input
                type="text"
                name="password"
                value={selectedUser.password}
                onChange={handleChange}
                placeholder="رمز ورود"
                className="border border-gray-300 p-2 rounded w-80"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="firstname" className="block text-gray-400 mb-4">
                نام
              </label>
              <input
                type="text"
                name="name.firstname"
                value={selectedUser.name.firstname}
                onChange={handleChange}
                placeholder="نام"
                className="border border-gray-300 p-2 rounded w-80"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="lastname" className="block text-gray-400 mb-4">
                نام خانوادگی
              </label>
              <input
                type="text"
                name="name.lastname"
                value={selectedUser.name.lastname}
                onChange={handleChange}
                placeholder="نام خانوادگی"
                className="border border-gray-300 p-2 rounded w-80"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-400 mb-4">
                ایمیل
              </label>
              <input
                type="email"
                name="email"
                value={selectedUser.email}
                onChange={handleChange}
                placeholder="ایمیل"
                className="border border-gray-300 p-2 rounded w-80"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="phone" className="block text-gray-400 mb-4">
                شماره تماس
              </label>
              <input
                type="text"
                name="phone"
                value={selectedUser.phone}
                onChange={handleChange}
                placeholder="شماره تماس"
                className="border border-gray-300 p-2 rounded w-80"
              />
            </div>
            <div className="p-3 mt-2 text-center space-x-4">
              <button
                className="bg-gray-700 px-4 py-1 text-sm font-medium tracking-wider border-2 border-gray-600 hover:border-gray-700 text-gray-300 rounded-full hover:bg-gray-800 transition ease-in duration-300"
                onClick={() => setShowEditModal(false)}
              >
                لغو
              </button>
              <button
                className="bg-blue-400 hover:bg-blue-500 px-4 py-1 text-sm font-medium tracking-wider border-2 border-blue-300 hover:border-blue-500 text-white rounded-full transition ease-in duration-300"
                onClick={handleUpdate}
              >
                به‌روزرسانی
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserComTotal;
