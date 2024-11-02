import { useState } from "react";
import Container from "../../Components/Container/Container";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [nationalCode, setNationalCode] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isFormValid()) {
      alert("لطفاً همه فیلدها را پر کنید.");
      return;
    }

    alert("سفارش شما ثبت شد!");
  };

  const handleBackToCart = () => {
    navigate("/Cart");
  };

  const isFormValid = () => {
    return (
      name &&
      lastName &&
      phone &&
      address &&
      postalCode &&
      nationalCode &&
      deliveryDate
    );
  };

  return (
    <Container>
      <h1 className="text-center text-2xl font-bold mb-8 mt-8">
        نهایی کردن خرید
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="نام"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="نام خانوادگی"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="کد ملی"
          value={nationalCode}
          onChange={(e) => setNationalCode(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="شماره تماس"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="آدرس"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="کد پستی"
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="date"
          value={deliveryDate}
          onChange={(e) => setDeliveryDate(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          className={`w-full p-2 rounded ${
            isFormValid() ? "bg-green-500" : "bg-green-200"
          } text-white`}
          disabled={!isFormValid()}
        >
          ثبت نهایی سفارش
        </button>
        <button
          type="button"
          onClick={handleBackToCart}
          className="w-full bg-gray-400 text-white p-2 rounded mt-4"
        >
          بازگشت به سبد خرید
        </button>
      </form>
    </Container>
  );
}

export default Checkout;
