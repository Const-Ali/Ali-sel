import { useEffect, useState } from "react";
import { IProduct } from "../../Types/servers_type";
import { getProducts } from "../../Services/Api";

interface CategoriesMobileModalProps {
  isVisible: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const CategoriesMobileModal: React.FC<CategoriesMobileModalProps> = ({
  isVisible,
  onMouseEnter,
  onMouseLeave,
}) => {
  const [samsungMobiles, setSamsungMobiles] = useState<string[]>([]);

  useEffect(() => {
    getProducts()
      .then((result: IProduct[]) => {
        const filteredProducts = result.filter(
          (product: IProduct) =>
            product.category === "اسپیکر-جی بی ال" ||
            product.category === "اسپیکر-انکر" ||
            product.category === "اسپیکر-هارمن"
        );
        const uniqueCategories = [
          ...new Set(filteredProducts.map((product) => product.category)),
        ];
        setSamsungMobiles(uniqueCategories);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className="absolute bg-white border border-gray-300 rounded-lg shadow-lg p-4 w-[1000px] max-w-max mt-14"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="bg-gray-50 text-black p-4">
        <h3 className="text-lg font-semibold mb-4">دسته‌بندی های موبایل</h3>
        <ul className="space-y-2">
          {samsungMobiles.map((category) => (
            <li key={category} className="text-right">
              <span className="text-sm font-medium">{category}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CategoriesMobileModal;
