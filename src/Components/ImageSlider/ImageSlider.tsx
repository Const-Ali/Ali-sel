import React, { useEffect, useState } from "react";

function ImageSlider() {
  const photos = [
    "https://www.upload.ee/image/17340848/17242375283415.jpg",
    "https://www.upload.ee/image/17340849/17242427078015.jpg",
    "https://www.upload.ee/image/17340850/17257084691314.jpg",
    "https://www.upload.ee/image/17340851/17271647441215.jpg",
    "https://www.upload.ee/image/17349064/Slide1.JPG",
    "https://www.upload.ee/image/17349065/Slide2.JPG",
    "https://www.upload.ee/image/17340893/1458.jpg",
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
