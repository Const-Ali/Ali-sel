import { useState, useEffect } from "react";
import axios from "axios";
import { getProducts } from "../../Services/Api";
import { IProduct } from "../../Types/servers_type";
import TextTitle from "../PropComponents/TextTitle";
import DeleteSvg from "../SVG/DeleteSvg";
import EditSvg from "../SVG/EditSvg";
import SerchSvg from "../SVG/SerchSvg";

function ProductComTotal() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    null
  );
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
  const [search, setSearch] = useState("");
  const [sortOption, setSortOption] = useState("جدیدترین");

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

  const handleDelete = (id: number) => {
    setSelectedProductId(id);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    if (selectedProductId !== null) {
      try {
        await axios.delete(
          `http://localhost:8001/products/${selectedProductId}`
        );
        setProducts(
          products.filter((product) => product.id !== selectedProductId)
        );
        setShowModal(false);
      } catch (error) {
        console.error("Error deleting product:", error);
        alert("خطا در حذف محصول. لطفاً دوباره تلاش کنید.");
      }
    }
  };

  const handleEdit = (id: number) => {
    const productToEdit = products.find((product) => product.id === id);
    if (productToEdit) {
      setSelectedProduct(productToEdit);
      setShowEditModal(true);
    } else {
      console.error("Product not found");
    }
  };

  const handleUpdate = async () => {
    if (selectedProduct) {
      const originalProduct = products.find(
        (product) => product.id === selectedProduct.id
      );
      if (JSON.stringify(originalProduct) === JSON.stringify(selectedProduct)) {
        alert("هیچ تغییری ایجاد نشده است.");
        return;
      }

      try {
        await axios.put(
          `http://localhost:8001/products/${selectedProduct.id}`,
          selectedProduct
        );
        setProducts(
          products.map((product) =>
            product.id === selectedProduct.id ? selectedProduct : product
          )
        );
        setShowEditModal(false);
      } catch (error) {
        console.error("Error updating product:", error);
        alert("خطا در به‌روزرسانی محصول. لطفاً دوباره تلاش کنید.");
      }
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedProduct) {
      const { name, value } = e.target;

      const updatedValue =
        name === "price" || name === "inventory"
          ? parseFloat(value.replace(/,/g, ""))
          : value;

      setSelectedProduct({
        ...selectedProduct,
        [name]: updatedValue,
      });
    }
  };

  const sortedProducts = () => {
    switch (sortOption) {
      case "جدیدترین":
        return [...products].sort((a, b) =>
          a.createdAt < b.createdAt ? 1 : -1
        );
      case "ارزان‌ترین":
        return [...products].sort((a, b) => a.price - b.price);
      case "گران‌ترین":
        return [...products].sort((a, b) => b.price - a.price);
      case "پرفروش‌ترین":
        return [...products].sort((a, b) => b.rating.rate - a.rating.rate);
      case "پربازدیدترین":
        return [...products].sort((a, b) => b.rating.count - a.rating.count);
      default:
        return products;
    }
  };

  const filteredProducts = sortedProducts().filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mx-auto">
      <TextTitle value="لیست کالاهای سایت" />

      <form className="max-w-md mx-auto w-full p-5">
        <div className="flex items-center gap-6 flex-row">
          <div className="relative w-full">
            <input
              className="block w-full p-4 pe-10 text-sm text-gray-600 border border-gray-400 rounded-lg"
              placeholder="جستجوی محصولات"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className="absolute inset-y-0 end-0 flex items-center pe-3 pointer-events-none">
              <SerchSvg />
            </div>
          </div>
          <select
            className="p-2 border border-gray-400 rounded-lg"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="جدیدترین">جدیدترین</option>
            <option value="ارزان‌ترین">ارزان‌ترین</option>
            <option value="گران‌ترین">گران‌ترین</option>
            <option value="پرفروش‌ترین">پرفروش‌ترین</option>
            <option value="پربازدیدترین">پربازدیدترین</option>
          </select>
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
            <th className="border border-gray-300 p-2">تصویر محصول</th>
            <th className="border border-gray-300 p-2">شناسه</th>
            <th className="border border-gray-300 p-2">ردیف</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product, index) => (
            <tr key={product.id || index} className="text-center">
              <td className="border border-gray-300 p-2 space-x-2">
                <button onClick={() => handleDelete(Number(product.id))}>
                  <DeleteSvg />
                </button>
                <button onClick={() => handleEdit(Number(product.id))}>
                  <EditSvg />
                </button>
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
                <img className="w-20" src={product.image} />
              </td>
              <td className="border border-gray-300 p-2">
                {product.id || "ناشناخته"}
              </td>
              <td className="border border-gray-300 p-2">{index + 1}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black opacity-50 backdrop-blur-sm"></div>
          <div className="flex flex-col p-4 relative items-center justify-center bg-gray-800 border border-gray-800 shadow-lg rounded-2xl w-80">
            <div className="text-center p-5 flex-auto justify-center">
              <h2 className="text-xl font-bold py-4 text-gray-200">
                آیا مطمئن هستید؟
              </h2>
              <p className="text-sm text-gray-500 px-2">
                آیا می‌خواهید محصول با آیدی <strong>{selectedProductId}</strong>
                را حذف کنید؟ این عملیات قابل بازگشت نیست.
              </p>
            </div>
            <div className="p-3 mt-2 text-center space-x-4">
              <button
                className="bg-gray-700 px-4 py-1 text-sm font-medium tracking-wider border-2 border-gray-600 hover:border-gray-700 text-gray-300 rounded-full hover:bg-gray-800 transition ease-in duration-300"
                onClick={() => setShowModal(false)}
              >
                لغو
              </button>
              <button
                className="bg-green-400 hover:bg-green-500 px-4 py-1 text-sm font-medium tracking-wider border-2 border-green-300 hover:border-green-500 text-white rounded-full transition ease-in duration-300"
                onClick={confirmDelete}
              >
                تأیید
              </button>
            </div>
          </div>
        </div>
      )}

      {showEditModal && selectedProduct && (
        <div className="modal">
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-black opacity-50 backdrop-blur-sm"></div>
            <div className="flex flex-col p-4 relative items-center justify-center bg-gray-800 border border-gray-800 shadow-lg rounded-2xl w-96">
              <h2 className="text-xl font-bold py-4 text-gray-200">
                ویرایش محصول
              </h2>
              <div className="mb-4">
                <label htmlFor="title" className="block text-gray-400 mb-4">
                  عنوان محصول
                </label>
                <input
                  type="text"
                  name="title"
                  value={selectedProduct.title}
                  onChange={handleChange}
                  placeholder="عنوان محصول"
                  className="border border-gray-300 p-2 rounded w-80"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="price" className="block text-gray-400 mb-4">
                  قیمت
                </label>
                <input
                  type="number"
                  name="price"
                  value={selectedProduct?.price || ""}
                  onChange={handleChange}
                  placeholder="قیمت"
                  className="border border-gray-300 p-2 rounded w-80"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="image" className="block text-gray-400 mb-4">
                  آدرس تصویر
                </label>
                <input
                  type="text"
                  name="image"
                  value={selectedProduct.image}
                  onChange={handleChange}
                  placeholder="آدرس URL تصویر"
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
                  onClick={handleUpdate}
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

export default ProductComTotal;
