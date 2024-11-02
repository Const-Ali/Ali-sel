import Container from "../../Components/Container/Container";
import { useShop_Card_Cont } from "../context/Shop_Card_Cont";
import { useState, useEffect } from "react";
import axios from "axios";

interface User {
  username: string;
  password: string;
  email?: string;
  phone?: string;
  category?: string;
}

function Login() {
  const { handleLogin } = useShop_Card_Cont();

  const [user, setuser] = useState<{ username: string; password: string }>({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [validUsers, setValidUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:8001/users");
        setValidUsers(response.data);
      } catch (err) {
        setError("خطا در دریافت اطلاعات کاربران");
        console.error(err);
      }
    };

    fetchUsers();
  }, []);

  const handleCange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setuser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const foundUser = validUsers.find(
      (u) =>
        (u.username === user.username ||
          u.email === user.username ||
          u.phone === user.username) &&
        u.password === user.password
    );

    if (foundUser) {
      handleLogin(user.username, user.password, foundUser.category || "");
    } else {
      setError("! نام کاربری، ایمیل یا شماره تماس یا رمز عبور اشتباه است");
    }
  };

  return (
    <Container>
      <section className="relative flex flex-wrap lg:h-screen lg:items-center my-10 shadow-2xl ">
        <div className="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24">
          <div className=" mx-auto max-w-lg text-center">
            <div className="flex items-center ">
              <img
                src="https://www.upload.ee/image/17269868/_-_Copy__2_-denoised_sharpened_width_400__light-100__wb-25__exposure_correction-removebg-preview.png"
                className="h-20"
                alt="Logo"
              />
            </div>
            <h1 className="text-2xl font-bold sm:text-3xl pt-10">
              به تکنوسنتر خوش آمدید{" "}
            </h1>
            <p className="mt-4 text-gray-500">
              با ورود به حساب کاربری خود در تکنو سنتر، از جدیدترین مدل‌های
              موبایل و بهترین لوازم جانبی با خبر شوید و خریدی مطمئن و سریع را .
              تجربه کنید{" "}
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="mx-auto mb-0 mt-8 max-w-md space-y-4"
          >
            <div>
              <label htmlFor="username" className="sr-only">
                Username / Email / Phone
              </label>
              <div className="relative">
                <input
                  onChange={handleCange}
                  type="text"
                  name="username"
                  value={user.username}
                  className="w-full rounded-lg bg-slate-100 border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="Enter username, email, or phone"
                />
                <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    />
                  </svg>
                </span>
              </div>
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <div className="relative">
                <input
                  onChange={handleCange}
                  type="password"
                  name="password"
                  value={user.password}
                  className="w-full rounded-lg bg-slate-100 border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="Enter password"
                />
                <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </span>
              </div>
            </div>
            {error && <p className="text-red-500">{error}</p>}{" "}
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">
                حساب کاربری ندارید ؟
                <a className="underline " href="/CreateAccount">
                  ساخت حساب کاربری{" "}
                </a>
              </p>
              <button
                type="submit"
                className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
              >
                ورود{" "}
              </button>
            </div>
          </form>
        </div>

        <div className="relative h-64 w-full sm:h-96 lg:h-full lg:w-1/2">
          <img
            alt=""
            src="https://www.upload.ee/image/17332422/gg.jpg"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      </section>
    </Container>
  );
}

export default Login;
