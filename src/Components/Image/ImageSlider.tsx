import { useEffect, useState } from "react";

const images = [
  "https://res.cloudinary.com/ds1yjxg7s/image/upload/v1749209964/Slide2_ybx3lh.jpg",
  "https://res.cloudinary.com/ds1yjxg7s/image/upload/v1746900423/17271647441215_mdd7vs.webp",
  "https://res.cloudinary.com/ds1yjxg7s/image/upload/v1749210028/Slide1_bk2541.jpg",
  "https://res.cloudinary.com/ds1yjxg7s/image/upload/v1746900423/17257084691314_xynba2.webp",
  "https://res.cloudinary.com/ds1yjxg7s/image/upload/v1746900422/1458_xfudla.jpg",
];

function CustomSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full max-w-screen-xl h-96 mx-auto overflow-hidden rounded-lg shadow-lg bg-gray-100 mt-10 mb-5">
      {images.map((src, index) => (
        <img
          key={index}
          src={src}
          alt={`slide-${index}`}
          className={`absolute top-0 left-0 w-full h-full object-cover transition-all duration-1000 ease-in-out ${
            index === current
              ? "opacity-100 scale-100 z-10"
              : "opacity-0 scale-95 z-0"
          }`}
        />
      ))}
    </div>
  );
}

export default CustomSlider;
