import React, { useState } from "react";
import Container from "../../Components/Container/Container";
import axios from "axios";
import AddUserNot from "../../Components/Alert/AddUserNot";
import AddInput from "../../Components/PropComponents/AddInput";
import CreatUserOk from "../../Components/Alert/CreatUserOk";
import { useNavigate } from "react-router-dom";

interface IAddress {
  city: string;
  street: string;
  zipcode: string;
}

interface IUser {
  category: string;
  id: number;
  email: string;
  username: string;
  password: string;
  name: {
    firstname: string;
    lastname: string;
  };
  phone: string;
  address: IAddress;
}

function CreateAccount() {
  const [alertVisible, setAlertVisible] = useState(false);
  const [errorVisible, setErrorVisible] = useState(false);
  const [usernameError, setUsernameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState<IAddress>({
    city: "",
    street: "",
    zipcode: "",
  });
  const navigate = useNavigate();

  const isFormValid = () => {
    const isUsernameValid = username.length >= 3;
    const isPhoneValid = phone.length === 11;

    setUsernameError(
      isUsernameValid ? "" : ". نام کاربری باید حداقل ۳ حرف باشد"
    );
    setPhoneError(isPhoneValid ? "" : ". شماره تلفن باید ۱۱ رقم باشد");

    return email && isUsernameValid && isPhoneValid;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isFormValid()) {
      return;
    }

    const currentDateTime = new Date().toISOString();

    const newUser = {
      category: "User",
      imguser: "https://www.upload.ee/image/17363767/name.png",
      email,
      username,
      password,
      name: {
        firstname: firstName,
        lastname: lastName,
      },
      phone,
      address,
      createdAt: currentDateTime,
    };

    try {
      const existingUsersResponse = await axios.get(
        `http://localhost:8001/users`
      );
      const existingUsers: IUser[] = existingUsersResponse.data;

      const userExists = existingUsers.some(
        (user) =>
          user.email.toLowerCase() === newUser.email.toLowerCase() ||
          user.username.toLowerCase() === newUser.username.toLowerCase() ||
          user.phone === newUser.phone
      );

      if (userExists) {
        setUserId(null);
        setErrorVisible(true);
        setTimeout(() => {
          setErrorVisible(false);
        }, 3000);
        return;
      }

      const response = await axios.post(`http://localhost:8001/users`, newUser);
      setUserId(response.data.id);
      setAlertVisible(true);
      setTimeout(() => {
        setAlertVisible(false);
      }, 2000);
      setEmail("");
      setUsername("");
      setPassword("");
      setFirstName("");
      setLastName("");
      setPhone("");
      setAddress({ city: "", street: "", zipcode: "" });
      setUsernameError("");
      setPhoneError("");
    } catch (error) {
      console.error("Error adding user:", error);
      alert("خطا در اضافه کردن کاربر.");
    } finally {
      setTimeout(() => {
        navigate("/login");
      }, 4000);
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsCheckboxChecked(e.target.checked);
  };

  return (
    <Container>
      <section className="bg-white my-10 shadow-2xl">
        <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
          <aside className="relative block h-60 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
            <img
              alt=""
              src="https://www.upload.ee/image/17332422/gg.jpg"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </aside>

          <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
            <div className="max-w-xl lg:max-w-3xl">
              <img
                src="https://www.upload.ee/image/17269868/_-_Copy__2_-denoised_sharpened_width_400__light-100__wb-25__exposure_correction-removebg-preview.png"
                className="h-24"
                alt="Logo"
              />

              <h1 className="mt-32 text-lg font-bold text-gray-900 sm:text-xl md:text-xl text-center">
                تکنو سنتر همراه مطمئن شما در دنیای تکنولوژی
              </h1>

              <p className="mt-4 leading-relaxed text-gray-500 text-right">
                با ساخت حساب کاربری در تکنو سنتر، به مجموعه‌ای گسترده از
                موبایل‌ها و لوازم جانبی با کیفیت دسترسی پیدا کنید و از تخفیف‌ها
                و پیشنهادات ویژه بهره‌مند شوید. ثبت‌نام کنید و تجربه‌ای منحصر به
                فرد از خرید آنلاین را آغاز کنید
              </p>

              <form onSubmit={handleSubmit} className="space-y-4 rtl pt-5">
                <Container>
                  {alertVisible && (
                    <div
                      role="alert"
                      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
                    >
                      <CreatUserOk />
                    </div>
                  )}

                  {errorVisible && (
                    <div
                      role="alert"
                      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
                    >
                      <AddUserNot idset={userId} />
                    </div>
                  )}

                  <div className="flex flex-col mb-4">
                    <div className="pl-36 pr-36">
                      <AddInput
                        id="EmailInput"
                        type="email"
                        labelText="ایمیل"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="flex justify-center items-center gap-x-10 ">
                    <div>
                      <AddInput
                        id="PassInput"
                        type="text"
                        labelText="رمز عبور"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <div>
                      <AddInput
                        id="UserNAInput"
                        type="text"
                        labelText="نام کاربری"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                      {usernameError && (
                        <p className="text-red-500">{usernameError}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex justify-center items-center gap-x-10 ">
                    <div>
                      <AddInput
                        id="NumInput"
                        type="number"
                        labelText="شماره تلفن همراه"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                      {phoneError && (
                        <p className="text-red-500">{phoneError}</p>
                      )}
                    </div>
                    <div>
                      <AddInput
                        id="UserLNInput"
                        type="text"
                        labelText="نام خانوادگی"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </div>
                    <div>
                      <AddInput
                        id="UserFNInput"
                        type="text"
                        labelText="نام"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col mb-4">
                    <div>
                      <AddInput
                        id="CityInput"
                        type="text"
                        labelText="شهر"
                        value={address.city}
                        onChange={(e) =>
                          setAddress((prevAddress) => ({
                            ...prevAddress,
                            city: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div>
                      <AddInput
                        id="StreetInput"
                        type="text"
                        labelText="آدرس"
                        value={address.street}
                        onChange={(e) =>
                          setAddress((prevAddress) => ({
                            ...prevAddress,
                            street: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div>
                      <AddInput
                        id="ZipCodeInput"
                        type="text"
                        labelText="کد پستی"
                        value={address.zipcode}
                        onChange={(e) =>
                          setAddress((prevAddress) => ({
                            ...prevAddress,
                            zipcode: e.target.value,
                          }))
                        }
                      />
                    </div>
                  </div>
                </Container>

                <div className="col-span-6">
                  <label htmlFor="MarketingAccept" className="flex gap-4">
                    <input
                      type="checkbox"
                      id="MarketingAccept"
                      name="marketing_accept"
                      className="size-5 rounded-md border-gray-200 bg-white shadow-sm"
                      onChange={handleCheckboxChange}
                    />
                    <span className="text-sm text-gray-800">
                      . می‌خواهم ایمیل‌هایی درباره رویدادها، به‌روزرسانی‌های
                      محصولات و اعلامیه‌های شرکتی دریافت کنم
                    </span>
                  </label>
                </div>

                <div className="col-span-6">
                  <p className="text-sm text-gray-700">
                    ورود شما به منزله پذیرش شرایط تکنوسنتر و
                    <a href="Terms" className="text-gray-500 underline mx-2">
                      قوانین حریم‌ خصوصی
                    </a>
                    است
                  </p>
                </div>

                <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                  <button
                    type="submit"
                    className={`inline-block shrink-0 rounded-md border border-blue-600 px-12 py-3 text-sm font-medium transition focus:outline-none focus:ring ${
                      isCheckboxChecked
                        ? "bg-blue-600 text-white hover:bg-transparent hover:text-blue-600 active:text-blue-500"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                    disabled={!isCheckboxChecked}
                  >
                    ساخت حساب کاربری
                  </button>
                  <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                    ! حساب کاربری دارید
                    <a href="login" className="text-gray-700 underline p-1">
                      وارد شوید
                    </a>
                  </p>
                </div>
              </form>
            </div>
          </main>
        </div>
      </section>
    </Container>
  );
}

export default CreateAccount;
