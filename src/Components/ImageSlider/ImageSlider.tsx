import { useEffect, useState } from "react";

function ImageSlider() {
  const photos = [
    "https://res.cloudinary.com/ds1yjxg7s/image/upload/v1746900424/speaker_tbxium.jpg",
    "https://res.cloudinary.com/ds1yjxg7s/image/upload/v1746900423/17271647441215_mdd7vs.webp",
    "https://res.cloudinary.com/ds1yjxg7s/image/upload/v1746900423/mobile_ptlp0c.jpg",
    "https://res.cloudinary.com/ds1yjxg7s/image/upload/v1746900423/17257084691314_xynba2.webp",
    "https://res.cloudinary.com/ds1yjxg7s/image/upload/v1746900423/17242427078015_qngzah.webp",
    "https://res.cloudinary.com/ds1yjxg7s/image/upload/v1746900423/17242375283415_z6fmfw.webp",
    "https://res.cloudinary.com/ds1yjxg7s/image/upload/v1746900422/1458_xfudla.jpg",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextPhoto = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % photos.length);
  };

  const prevPhoto = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + photos.length) % photos.length
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextPhoto();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative flex justify-center items-center bg-gray-100 my-5">
      <button
        onClick={prevPhoto}
        disabled={currentIndex === 0}
        className="absolute left-5 top-1/2 transform -translate-y-1/2 px-4 py-2 bg-gray-300 text-black rounded-full shadow hover:bg-gray-400 disabled:opacity-50"
      >
        {"<"}
      </button>
      <img
        src={photos[currentIndex]}
        alt={`Photo ${currentIndex + 1}`}
        className="w-screen h-96 object-cover rounded-lg shadow-lg"
      />
      <button
        onClick={nextPhoto}
        disabled={currentIndex === photos.length - 1}
        className="absolute right-5 top-1/2 transform -translate-y-1/2 px-4 py-2 bg-gray-300 text-black rounded-full shadow hover:bg-gray-400 disabled:opacity-50"
      >
        {">"}
      </button>
    </div>
  );
}

export default ImageSlider;
