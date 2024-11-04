import { useEffect, useState } from "react";

function Test() {
  const photos = [
    "https://www.upload.ee/image/17340848/17242375283415.jpg",
    "https://www.upload.ee/image/17340849/17242427078015.jpg",
    "https://www.upload.ee/image/17340850/17257084691314.jpg",
    "https://www.upload.ee/image/17340851/17271647441215.jpg",
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
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h2 className="text-2xl font-bold mb-5">Photo Gallery</h2>
      <div className="relative mb-5">
        <img
          src={photos[currentIndex]}
          alt={`Photo ${currentIndex + 1}`}
          className="w-96 h-72 object-cover rounded-lg shadow-lg"
        />
      </div>
      <div className="flex space-x-4">
        <button
          onClick={prevPhoto}
          disabled={currentIndex === 0}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={nextPhoto}
          disabled={currentIndex === photos.length - 1}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Test;
