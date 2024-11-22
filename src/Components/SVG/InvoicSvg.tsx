function InvoicSvg() {
  return (
    <div className="flex flex-col justify-center items-center mx-2 h-[85px] bg-gray-100 rounded-xl">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="64"
        height="64"
        viewBox="0 0 1024 1024"
        className="w-20 cursor-pointer fill-gray-400 inline-block transition hover:scale-110 focus:outline-none focus:ring"
      >
        <path
          fill="black"
          d="M704 192h160v736H160V192h160v64h384zM288 512h448v-64H288zm0 256h448v-64H288zm96-576V96h256v96z"
        />
      </svg>
      <p className="p-2">نمایش فاکتور</p>
    </div>
  );
}

export default InvoicSvg;
