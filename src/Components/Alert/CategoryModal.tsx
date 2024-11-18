import React, { useState } from "react";

interface Category {
  category: string;
}

interface CategoryModalProps {
  categories: Category[];
  onSelect: (category: string) => void;
  onClose: () => void;
}

const CategoryModal: React.FC<CategoryModalProps> = ({
  categories,
  onSelect,
  onClose,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [search, setSearch] = useState("");

  const filteredCategories = categories.filter((cat) =>
    cat.category.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);

  const currentCategories = filteredCategories.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-lg w-80">
        <h2 className="text-lg font-semibold mb-2 text-center">
          انتخاب دسته‌ بندی
        </h2>
        <div className="relative w-full pb-5">
          <input
            className="block w-full p-4 pe-10 text-sm text-gray-600 border border-gray-400 rounded-lg"
            placeholder="جستجوی محصولات"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <ul className="space-y-3">
          {currentCategories.map((cat, index) => (
            <li key={index}>
              <button
                onClick={() => onSelect(cat.category)}
                className="block w-full text-center text-lg font-semibold text-gray-800 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-500 hover:text-white transition duration-300 ease-in-out shadow-sm transform hover:-translate-y-1"
              >
                {cat.category}
              </button>
            </li>
          ))}
        </ul>

        <div className="flex justify-center mt-4 space-x-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => handlePageChange(i + 1)}
              className={`px-3 py-1 rounded-md ${
                currentPage === i + 1
                  ? "bg-gray-700 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>

        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300 transform hover:scale-110"
        >
          بستن
        </button>
      </div>
    </div>
  );
};

export default CategoryModal;
