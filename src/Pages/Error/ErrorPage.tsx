import { Link } from "react-router-dom";

function ErrorPage() {
  return (
    <>
      <div className="grid h-screen w-screen place-content-center bg-white px-4">
        <div className="flex flex-col justify-center items-center">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="400"
              height="400"
              viewBox="0 0 24 24"
            >
              <path
                fill="none"
                stroke="#374151 "
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.25"
                d="M3 7v4a1 1 0 0 0 1 1h3m0-5v10m3-9v8a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1m7-1v4a1 1 0 0 0 1 1h3m0-5v10"
              />
            </svg>
          </div>
          <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Uh-oh!
          </p>

          <p className="mt-4 text-gray-500 text-4xl">
            !! صفحه‌ ای که دنبال آن بودید پیدا نشد
          </p>

          <Link
            to="/"
            className="mt-6 inline-block rounded bg-gray-700 px-5 py-3 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring"
          >
            بازگشت به خانه{" "}
          </Link>
        </div>
      </div>
    </>
  );
}

export default ErrorPage;
