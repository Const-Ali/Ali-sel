import { useState, useEffect } from "react";
import { getProducts } from "../../Services/Api";
import { IProduct } from "../../Types/servers_type";
import TextTitle from "../PropComponents/TextTitle";
import Button from "../Button/Button";

function ProductOrderPoint() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [minInventory, setMinInventory] = useState<number>(0);
  const [maxInventory, setMaxInventory] = useState<number>(100);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
  const [newInventory, setNewInventory] = useState<number>(0);

  useEffect(() => {
    const fetchProductsAndCategories = async () => {
      try {
        const productsData: IProduct[] = await getProducts();
        const normalizedProducts = productsData.map((product) => ({
          ...product,
          id: Number(product.id),
        }));
        setProducts(normalizedProducts);
      } catch (error) {
        console.error("Error fetching products or categories:", error);
      }
    };

    fetchProductsAndCategories();
  }, []);

  const filteredProducts = products.filter(
    (product) =>
      product.inventory >= minInventory && product.inventory <= maxInventory
  );

  const handleAddProductClick = (product: IProduct) => {
    setSelectedProduct(product);
    setNewInventory(product.inventory);
    setIsModalOpen(true);
  };

  const handleUpdateInventory = () => {
    if (selectedProduct) {
      const updatedProduct = {
        ...selectedProduct,
        inventory: newInventory,
      };
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === updatedProduct.id ? updatedProduct : product
        )
      );
      setIsModalOpen(false);
    }
  };

  return (
    <div className="container mx-auto">
      <TextTitle value="لیست کالاهای به نقطه سفارش رسیده" />

      <form className="max-w-md mx-auto w-full p-5">
        <div className="mt-5">
          <label className="text-sm text-gray-600 mb-2">موجودی (از - تا)</label>
          <div className="flex justify-between">
            <span>{minInventory}</span>
            <span>{maxInventory}</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            step="1"
            value={minInventory}
            onChange={(e) => setMinInventory(Number(e.target.value))}
            className="w-full my-2"
          />
          <input
            type="range"
            min="0"
            max="100"
            step="1"
            value={maxInventory}
            onChange={(e) => setMaxInventory(Number(e.target.value))}
            className="w-full my-2"
          />
        </div>
      </form>

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">عملیات</th>
            <th className="border border-gray-300 p-2">موجودی</th>
            <th className="border border-gray-300 p-2">قیمت</th>
            <th className="border border-gray-300 p-2">دسته‌بندی</th>
            <th className="border border-gray-300 p-2">عنوان محصول</th>
            <th className="border border-gray-300 p-2">شناسه</th>
            <th className="border border-gray-300 p-2">ردیف</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product, index) => (
            <tr key={product.id || index} className="text-center">
              <td className="border border-gray-300 p-2">
                <Button
                  variant="Btn-1"
                  onClick={() => handleAddProductClick(product)}
                >
                  اضافه کردن محصول
                </Button>
              </td>
              <td className="border border-gray-300 p-2">
                {product.inventory.toLocaleString("fa-IR")}
              </td>
              <td className="border border-gray-300 p-2">
                {product?.price.toLocaleString("fa-IR")}
              </td>
              <td className="border border-gray-300 p-2">{product.category}</td>
              <td className="border border-gray-300 p-2">{product.title}</td>
              <td className="border border-gray-300 p-2">
                {product.id || "ناشناخته"}
              </td>
              <td className="border border-gray-300 p-2">{index + 1}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && selectedProduct && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-xl mb-4 text-center">بروزرسانی موجودی</h2>
            <div>
              <label className="block text-sm text-gray-600 mb-2 text-right">
                موجودی فعلی
              </label>
              <input
                type="text"
                value={selectedProduct.inventory}
                readOnly
                className="w-full p-2 mb-4 border border-gray-300 rounded text-right"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-2 text-right">
                موجودی جدید
              </label>
              <input
                type="number"
                value={newInventory}
                onChange={(e) => setNewInventory(Number(e.target.value))}
                className="w-full p-2 mb-4 border border-gray-300 rounded text-right"
              />
            </div>
            <div className="flex justify-end">
              <Button onClick={handleUpdateInventory}>بروزرسانی</Button>
              <Button variant="Btn-1" onClick={() => setIsModalOpen(false)}>
                بستن
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductOrderPoint;
