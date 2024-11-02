import React, { useState, useEffect } from "react";
import Container from "../Container/Container";
import axios from "axios";
import SaveChanges from "../Alert/SaveChanges";
import Checkidok from "../Alert/Checkidok";
import Checkiderror from "../Alert/Checkiderror";
import NotChanges from "../Alert/NotChanges";
import AddInput from "../AddInput/AddInput";
import TextTitle from "../Text/TextTitle";

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
interface Category {
  category: string;
}

function EditUser() {
  const [category, setCategory] = useState("");
  const [userId, setUserId] = useState("");
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
  const [notChangesVisible, setNotChangesVisible] = useState(false);
  const [originalUser, setOriginalUser] = useState<IUser | null>(null);
  const [isUserLoaded, setIsUserLoaded] = useState<null | boolean>(null);
  const [categories, setCategories] = useState<Category[]>([]);

  const isFormValid = () =>
    category &&
    email &&
    username &&
    password &&
    firstName &&
    lastName &&
    phone &&
    address.city &&
    address.street &&
    address.zipcode;

  const loadCheck = async () => {
    try {
      const response = await axios.get(`http://localhost:8001/users/${userId}`);
      const user: IUser = response.data;

      setCategory(user.category);
      setEmail(user.email);
      setUsername(user.username);
      setPassword(user.password);
      setFirstName(user.name.firstname);
      setLastName(user.name.lastname);
      setPhone(user.phone);
      setAddress(user.address);

      setOriginalUser(user);
      setIsUserLoaded(true);

      setTimeout(() => {
        setIsUserLoaded(null);
      }, 500);
    } catch (error) {
      console.error("Error fetching user:", error);
      setIsUserLoaded(false);
      setTimeout(() => {
        setIsUserLoaded(null);
      }, 1000);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isFormValid()) {
      alert("لطفاً همه فیلدها را پر کنید.");
      return;
    }

    const updatedUser = {
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
    };

    const hasChanges =
      originalUser &&
      (originalUser.category !== updatedUser.category ||
        originalUser.email !== updatedUser.email ||
        originalUser.username !== updatedUser.username ||
        originalUser.password !== updatedUser.password ||
        originalUser.name.firstname !== updatedUser.name.firstname ||
        originalUser.name.lastname !== updatedUser.name.lastname ||
        originalUser.phone !== updatedUser.phone ||
        originalUser.address.city !== updatedUser.address.city ||
        originalUser.address.street !== updatedUser.address.street ||
        originalUser.address.zipcode !== updatedUser.address.zipcode);

    if (!hasChanges) {
      setNotChangesVisible(true);
      setTimeout(() => {
        setNotChangesVisible(false);
      }, 2000);
      return;
    }

    try {
      await axios.put(`http://localhost:8001/users/${userId}`, updatedUser);
      setAlertVisible(true);
      setTimeout(() => {
        setAlertVisible(false);
      }, 2000);
    } catch (error) {
      console.error("Error updating user:", error);
      alert("خطا در ویرایش کاربر.");
    }
  };
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:8001/users");
        const data: IUser[] = response.data;

        const uniqueCategories = Array.from(
          new Set(data.map((cat) => cat.category))
        ).map((category) => ({ category }));

        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);
  return (
    <Container>
      {notChangesVisible && (
        <div
          role="alert"
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
        >
          <NotChanges />
        </div>
      )}
      {isUserLoaded === true && (
        <div
          role="alert"
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
        >
          <Checkidok />
        </div>
      )}
      {isUserLoaded === false && (
        <div
          role="alert"
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
        >
          <Checkiderror />
        </div>
      )}
      {alertVisible && (
        <div
          role="alert"
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
        >
          <SaveChanges />
        </div>
      )}
      <div className="pb-7">
        <TextTitle value="ویرایش کاربر" />
      </div>
      <div className="pl-36 pr-36 pb-8">
        <AddInput
          id="UserTitle"
          type="text"
          labelText="شناسه کاربر"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <button
          className="bg-green-500 text-white px-4 py-2 rounded mt-2 w-24"
          onClick={loadCheck}
        >
          بررسی
        </button>{" "}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 rtl">
        <div className="flex flex-col mb-4 rounded-md border border-gray-200 p-2 text-right ">
          <label
            htmlFor="HeadlineAct"
            className=" mb-1  text-sm font-medium text-gray-900 "
          >
            : سطح دسترسی
          </label>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            name="HeadlineAct"
            id="HeadlineAct"
            className="text-right mt-1.5  h-10 rounded-lg border-gray-300 text-gray-700 sm:text-sm w-full"
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
            {" "}
            <AddInput
              id="productUrl"
              type="email"
              labelText="ایمیل"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />{" "}
          </div>
        </div>
        <div className="flex justify-center items-center gap-x-10 ">
          <div>
            {" "}
            <AddInput
              id="productUrl"
              type="text"
              labelText="رمز عبور"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />{" "}
          </div>
          <div>
            {" "}
            <AddInput
              id="productUrl"
              type="text"
              labelText="نام کاربری"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />{" "}
          </div>
        </div>
        <div className="flex justify-center items-center gap-x-10 ">
          <div>
            {" "}
            <AddInput
              id="productUrl"
              type="text"
              labelText="شماره تلفن همراه"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />{" "}
          </div>
          <div>
            {" "}
            <AddInput
              id="productUrl"
              type="text"
              labelText="نام خانوادگی"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />{" "}
          </div>{" "}
          <div>
            {" "}
            <AddInput
              id="productUrl"
              type="text"
              labelText="نام"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />{" "}
          </div>
        </div>

        <div className="flex flex-col mb-4">
          <div>
            {" "}
            <AddInput
              id="productUrl"
              type="text"
              labelText="شهر"
              value={address.city}
              onChange={(e) =>
                setAddress((prevAddress) => ({
                  ...prevAddress,
                  city: e.target.value,
                }))
              }
            />{" "}
          </div>
        </div>

        <div className="flex flex-col mb-4">
          <div>
            {" "}
            <AddInput
              id="productUrl"
              type="text"
              labelText="آدرس"
              value={address.street}
              onChange={(e) =>
                setAddress((prevAddress) => ({
                  ...prevAddress,
                  street: e.target.value,
                }))
              }
            />{" "}
          </div>
        </div>

        <div className="flex flex-col mb-4">
          <div>
            {" "}
            <AddInput
              id="productUrl"
              type="text"
              labelText="کد پستی"
              value={address.zipcode}
              onChange={(e) =>
                setAddress((prevAddress) => ({
                  ...prevAddress,
                  zipcode: e.target.value,
                }))
              }
            />{" "}
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          ذخیره تغییرات
        </button>
      </form>
    </Container>
  );
}

export default EditUser;
