import React, { useEffect, useState } from "react";
import Container from "../Container/Container";
import axios from "axios";
import AddUserOk from "../Alert/AddUserOk";
import AddUserNot from "../Alert/AddUserNot";
import AddInput from "../AddInput/AddInput";
import TextTitle from "../PropComponents/TextTitle";

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

interface ICategory {
  category: string;
}

function AddUser() {
  const [userId, setUserId] = useState<string | null>(null);
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState<ICategory[]>([]);
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

  const [alertVisible, setAlertVisible] = useState(false);
  const [errorVisible, setErrorVisible] = useState(false);

  const isFormValid = () => email && username && phone;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isFormValid()) {
      alert("لطفاً همه فیلدهای ضروری را پر کنید.");
      return;
    }
    const currentDateTime = new Date().toISOString();
    const imgUsers = "https://www.upload.ee/image/17363767/name.png";

    const newUser = {
      imguser: imgUsers,
      category,
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
          user.email === newUser.email ||
          user.username === newUser.username ||
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

      setCategory("");
      setEmail("");
      setUsername("");
      setPassword("");
      setFirstName("");
      setLastName("");
      setPhone("");
      setAddress({ city: "", street: "", zipcode: "" });
    } catch (error) {
      console.error("Error adding user:", error);
      alert("خطا در اضافه کردن کاربر.");
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:8001/users");
        const data: IUser[] = response.data;

        const uniqueCategoriesSet = new Set(data.map((user) => user.category));

        const uniqueCategories = Array.from(uniqueCategoriesSet).map(
          (category) => ({ category })
        );

        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <Container>
      {alertVisible && (
        <div
          role="alert"
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
        >
          <AddUserOk idset={userId} />
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
      <div className="pb-7">
        <TextTitle value="اضافه کردن کاربر جدید" />
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 rtl">
        <div className="flex flex-col mb-4 rounded-md border border-gray-200 p-2 text-right ">
          <label
            htmlFor="HeadlineAct"
            className=" mb-1 text-sm font-medium text-gray-900 "
          >
            : سطح دسترسی
          </label>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            name="HeadlineAct"
            id="HeadlineAct"
            className="text-right mt-1.5 h-10 rounded-lg border-gray-300 text-gray-700 sm:text-sm w-full"
          >
            <option value="">انتخاب کنید</option>
            {categories.map((cat, index) => (
              <option key={index} value={cat.category}>
                {cat.category}
              </option>
            ))}
          </select>
        </div>

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
        </div>

        <div className="flex flex-col mb-4">
          <div>
            <AddInput
              id="AddressInput"
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
        </div>

        <div className="flex flex-col mb-4">
          <div>
            <AddInput
              id="ZipInput"
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

        <div className="flex justify-center items-center mt-4 mb-4">
          <button
            type="submit"
            className="rounded-md border border-gray-300 bg-blue-500 py-2 px-4 text-white hover:bg-blue-700"
          >
            ثبت کاربر
          </button>
        </div>
      </form>
    </Container>
  );
}

export default AddUser;
