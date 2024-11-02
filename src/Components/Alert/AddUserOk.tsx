import { useState } from "react";

interface AddUserOkProps {
  idset: string | null;
}

const AddUserOk: React.FC<AddUserOkProps> = ({ idset }) => {
  const [isVisible, setIsVisible] = useState(true);

  const onClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <>
      <div
        role="alert"
        className="rounded-xl border border-gray-100 bg-white p-10"
      >
        <div className="flex items-start gap-8">
          <span className="text-green-600 ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="3"
              stroke="currentColor"
              className="size-24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </span>

          <div className="flex-1 p-6 ">
            <strong className="flex justify-center items-center font-medium text-gray-900 text-2xl mb-6">
              . کاربر جدید اضافه شد
            </strong>

            <p className="flex justify-center items-center mt-1 text-1xl text-gray-700">
              . ثبت شد {idset && <strong> "{idset}" </strong>}
              کاربر با شناسه
            </p>
          </div>

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
        </div>
      </div>
    </>
  );
};

export default AddUserOk;
