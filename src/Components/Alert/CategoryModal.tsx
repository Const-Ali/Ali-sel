import React from "react";

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
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-lg w-80">
        <h2 className="text-lg font-semibold mb-2">انتخاب دسته‌بندی</h2>
        <ul className="space-y-2">
          {categories.map((cat, index) => (
            <li key={index}>
              <button
                onClick={() => onSelect(cat.category)}
                className="text-blue-500 hover:underline"
              >
                {cat.category}
              </button>
            </li>
          ))}
        </ul>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
        >
          بستن
        </button>
      </div>
    </div>
  );
};

export default CategoryModal;
