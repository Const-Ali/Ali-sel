import { useEffect, useState } from "react";
import axios from "axios";
import { getUsers } from "../../Services/Api";
import TextTitle from "../Text/TextTitle";

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
              <svg
                className="w-4 h-4 text-gray-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
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
              <td className="border border-gray-300 p-2 text-center flex gap-1 justify-center items-center">
                <button onClick={() => handleEdit(user.id)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={81.46}
                    height={64}
                    viewBox="0 0 1792 1408"
                    className="w-10 cursor-pointer fill-gray-400 inline-block transition hover:scale-110 focus:outline-none focus:ring"
                  >
                    <path
                      fill="black"
                      d="m888 1056l116-116l-152-152l-116 116v56h96v96zm440-720q-16-16-33 1L945 687q-17 17-1 33t33-1l350-350q17-17 1-33m80 594v190q0 119-84.5 203.5T1120 1408H288q-119 0-203.5-84.5T0 1120V288Q0 169 84.5 84.5T288 0h832q63 0 117 25q15 7 18 23q3 17-9 29l-49 49q-14 14-32 8q-23-6-45-6H288q-66 0-113 47t-47 113v832q0 66 47 113t113 47h832q66 0 113-47t47-113V994q0-13 9-22l64-64q15-15 35-7t20 29m-96-738l288 288l-672 672H640V864zm444 132l-92 92l-288-288l92-92q28-28 68-28t68 28l152 152q28 28 28 68t-28 68"
                    ></path>
                  </svg>
                </button>
                <button onClick={() => handleDelete(user.id)}>
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
