import { useState, useEffect } from "react";
import { getProducts } from "../../Services/Api";
import { IProduct } from "../../Types/servers_type";
import TextTitle from "../PropComponents/TextTitle";
import DeleteSvg from "../SVG/DeleteSvg";
import EditSvg from "../SVG/EditSvg";
import SerchSvg from "../SVG/SerchSvg";

function Classification() {
  const [categories, setCategories] = useState<string[]>([]);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [newCategoryName, setNewCategoryName] = useState<string>("");

  useEffect(() => {
    const fetchProductsAndCategories = async () => {
      try {
        const productsData: IProduct[] = await getProducts();
        setProducts(productsData);
        const Classification = [
          ...new Set(productsData.map((product) => product.category)),
        ];

        Classification.sort((a, b) => a.localeCompare(b));

        setCategories(Classification);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductsAndCategories();
  }, []);

  if (loading) return <div>Loading...</div>;

  const filteredCategories = categories
    .filter((category) => category.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => a.localeCompare(b));

  const getCategoryProductCount = (category: string) => {
    return products.filter((product) => product.category === category).length;
  };

  const handleEditCategory = (category: string) => {
    setSelectedCategory(category);
    setNewCategoryName(category);
    setShowEditModal(true);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewCategoryName(e.target.value);
  };

  const handleUpdateCategory = () => {
    if (newCategoryName !== selectedCategory) {
      const updatedCategories = categories.map((category) =>
        category === selectedCategory ? newCategoryName : category
      );
      setCategories(updatedCategories);
    }
    setShowEditModal(false);
  };

  return (
    <div className="container mx-auto">
      <TextTitle value="دسته‌بندی‌ های کالا ها" />
      <div className="flex items-center justify-center my-5">
        <div className="relative w-fit">
          <input
            className="block w-[500px] p-4 pe-10 text-sm text-gray-600 border border-gray-400 rounded-lg"
            placeholder="جستجوی دسته بندی ها"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="absolute inset-y-0 end-0 flex items-center pe-3 pointer-events-none">
            <SerchSvg />
          </div>
        </div>
      </div>

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">عملیات</th>
            <th className="border border-gray-300 p-2">
              تعداد کالا ها در دسته بندی
            </th>
            <th className="border border-gray-300 p-2">دسته‌بندی</th>
            <th className="border border-gray-300 p-2">ردیف</th>
          </tr>
        </thead>
        <tbody>
          {filteredCategories.map((category, index) => (
            <tr key={category || index} className="text-center">
              <td className="border border-gray-300 p-2 space-x-2">
                <button>
                  <DeleteSvg />
                </button>
                <button onClick={() => handleEditCategory(category)}>
                  <EditSvg />
                </button>
              </td>
              <td className="border border-gray-300 p-2">
                {getCategoryProductCount(category)}
              </td>
              <td className="border border-gray-300 p-2">{category}</td>
              <td className="border border-gray-300 p-2">{index + 1}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {showEditModal && (
        <div className="modal">
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-black opacity-50 backdrop-blur-sm"></div>
            <div className="flex flex-col p-4 relative items-center justify-center bg-gray-800 border border-gray-800 shadow-lg rounded-2xl w-96">
              <h2 className="text-xl font-bold py-4 text-gray-200">
                ویرایش دسته‌بندی
              </h2>
              <div className="mb-4">
                <label htmlFor="category" className="block text-gray-400 mb-4">
                  نام جدید دسته‌بندی
                </label>
                <input
                  type="text"
                  name="category"
                  value={newCategoryName}
                  onChange={handleCategoryChange}
                  placeholder="نام جدید دسته‌بندی"
                  className="border border-gray-300 p-2 rounded w-80"
                />
              </div>

              <div className="p-3 mt-2 text-center space-x-4">
                <button
                  className="bg-gray-700 px-4 py-1 text-sm font-medium tracking-wider border-2 border-gray-600 hover:border-gray-700 text-gray-300 rounded-full hover:bg-gray-800 transition ease-in duration-300"
                  onClick={() => setShowEditModal(false)}
                >
                  لغو
                </button>
                <button
                  className="bg-blue-400 hover:bg-blue-500 px-4 py-1 text-sm font-medium tracking-wider border-2 border-blue-300 hover:border-blue-500 text-white rounded-full transition ease-in duration-300"
                  onClick={handleUpdateCategory}
                >
                  به‌روزرسانی
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Classification;
