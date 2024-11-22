function DocumentSvg() {
  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="64"
        height="64"
        viewBox="0 0 48 48"
        className="w-11 cursor-pointer fill-gray-400 inline-block transition hover:scale-110 focus:outline-none focus:ring"
      >
        <path
          fill="none"
          stroke="black"
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M14 4.5h-3.5a2 2 0 0 0-2 2v35a2 2 0 0 0 2 2h27a2 2 0 0 0 2-2v-35a2 2 0 0 0-2-2H24"
        />
        <path
          fill="none"
          stroke="black"
          stroke-linecap="round"
          stroke-linejoin="round"
          d="m12 4.5l1.414-1.414a2 2 0 0 1 1.414-.586H23a1 1 0 0 1 1 1v25l-5-5l-5 5v-24M14 38h20M24 10h10m-10 7h10m-10 7h10m-20 7h20"
        />
      </svg>
    </div>
  );
}

export default DocumentSvg;
