import { useState } from "react";

function Checkiderror() {
  const [isVisible, setIsVisible] = useState(true);

  const onClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div>
      <div
        role="alert"
        className="rounded border-s-4 border-red-500 bg-red-50 p-4"
      >
        <button
          className="text-gray-500 transition hover:text-gray-600"
          onClick={onClose}
        >
          <span className="sr-only">Dismiss popup</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <strong className="block text-2xl text-red-800 text-right  pb-5">
          ! خطا در شناسه محصول
        </strong>
        <p className="mt-2 text-sm text-red-700 text-right pb-2">
          : شناسه محصول وارد شده نادرست است. لطفاً موارد زیر را بررسی کنید
        </p>
        <p className="mt-2 text-sm text-red-700 text-right pb-1">
          <strong>بررسی ورودی :</strong> مطمئن شوید شناسه به درستی وارد شده است
        </p>
        <p className="mt-2 text-sm text-red-700 text-right pb-1">
          <strong>موجود نبودن محصول :</strong> ممکن است شناسه در سیستم وجود
          نداشته باشد.
        </p>
        <p className="mt-2 text-sm text-red-700 text-right pb-1">
          <strong>استفاده از شناسه‌های معتبر :</strong> از لیست محصولات برای
          یافتن شناسه معتبر استفاده کنید.
        </p>
        <p className="mt-2 text-sm text-red-700 text-right">
          <strong>کمک گرفتن :</strong> در صورت مشکل، با تیم پشتیبانی تماس
          بگیرید.
        </p>
      </div>
    </div>
  );
}

export default Checkiderror;
