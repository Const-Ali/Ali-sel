import { useState } from "react";

function NotChanges() {
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
          ! اطلاعات تغییری نکرده است
        </strong>
        <p className="mt-2 text-sm text-red-700 text-right pb-2">
          به نظر می‌رسد هیچ‌یک از اطلاعات وارد شده تغییر نکرده است. لطفاً بررسی
          . کنید که آیا تغییرات مورد نظر را اعمال کرده‌اید
        </p>
      </div>
    </div>
  );
}

export default NotChanges;
