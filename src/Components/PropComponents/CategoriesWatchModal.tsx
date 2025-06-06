import { useEffect, useState } from "react";
import { IProduct } from "../../Types/servers_type";
import { getProducts } from "../../Services/Api";

interface CategoriesWatchModalProps {
  isVisible: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const CategoriesWatchModal: React.FC<CategoriesWatchModalProps> = ({
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
            product.category === "ساعت-اپل" ||
            product.category === "ساعت-سامسونگ"
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
      className="absolute bg-white border border-gray-300 rounded-lg shadow-lg p-4 w-[1000px] max-w-max mt-14 mr-[300px]"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="bg-gray-100 rounded-md text-black p-4">
        <h3 className="text-lg font-semibold mb-4">دسته‌بندی های ساعت</h3>
        <ul className="space-y-2">
          {samsungMobiles.map((category) => (
            <li key={category} className="text-right">
              <a
                href="CollectionLaptaps"
                className="text-sm font-medium block px-4 py-2 rounded-md transition-all bg-gray-50 hover:bg-gray-200 hover:shadow-md"
              >
                {category}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CategoriesWatchModal;
