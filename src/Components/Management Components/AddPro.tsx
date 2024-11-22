import React, { useState, useEffect } from "react";
import Container from "../Container/Container";
import axios from "axios";
import Addok from "../Alert/Addok";
import AddProNot from "../Alert/AddProNot";
import AddInput from "../AddInput/AddInput";
import TextTitle from "../PropComponents/TextTitle";
import CategoryModal from "../Alert/CategoryModal";

interface IProduct {
  id: string;
  title: string;
  price: number;
  inventory: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

interface Category {
  category: string;
}

function AddPro() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [inventory, setInventory] = useState("");
  const [image, setImage] = useState("");
  const [ratingRate, setRatingRate] = useState("");
  const [ratingCount, setRatingCount] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [showAlert, setShowAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [productId, setProductId] = useState<string | null>(null);
  const [newCategory, setNewCategory] = useState("");
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:8001/products");
        const data: IProduct[] = await response.json();
        const uniqueCategories = Array.from(
          new Set(data.map((cat) => cat.category))
        ).map((category) => ({ category }));
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const openCategoryModal = () => {
    setIsCategoryModalOpen(true);
  };

  const closeCategoryModal = () => {
    setIsCategoryModalOpen(false);
  };

  const selectCategory = (selectedCategory: string) => {
    setCategory(selectedCategory);
    closeCategoryModal();
  };

  const checkDuplicateProduct = async (newProduct: any) => {
    try {
      const response = await axios.get("http://localhost:8001/products");
      const products: IProduct[] = response.data;

      return products.some(
        (product) =>
          product.title === newProduct.title &&
          product.price === newProduct.price &&
          product.description === newProduct.description &&
          product.inventory === newProduct.inventory &&
          product.category === newProduct.category &&
          product.image === newProduct.image &&
          product.rating.rate === newProduct.rating.rate &&
          product.rating.count === newProduct.rating.count
      );
    } catch (error) {
      console.error("Error checking for duplicate products:", error);
      return false;
    }
  };

  const normalizeSpaces = (str: string) => {
    return str.replace(/\s+/g, " ").trim();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isFormValid()) {
      alert("لطفاً همه فیلدها را پر کنید.");
      return;
    }

    const generateUniqueId = async () => {
      let uniqueId = Math.floor(1000 + Math.random() * 9000);
      const response = await axios.get("http://localhost:8001/products");
      const products: IProduct[] = response.data;

      while (products.some((product) => product.id === uniqueId.toString())) {
        uniqueId = Math.floor(1000 + Math.random() * 9000);
      }

      return uniqueId;
    };

    const newProduct = {
      id: (await generateUniqueId()).toString(),
      title: normalizeSpaces(title),
      price: parseFloat(price),
      description: normalizeSpaces(description),
      inventory: parseInt(inventory),
      category: normalizeSpaces(category),
      image: normalizeSpaces(image),
      rating: {
        rate: parseFloat(ratingRate),
        count: parseInt(ratingCount),
      },
      createdAt: new Date().toISOString(),
    };

    const isDuplicate = await checkDuplicateProduct(newProduct);
    if (isDuplicate) {
      setShowErrorAlert(true);
      setTimeout(() => {
        setShowErrorAlert(false);
      }, 4000);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8001/products",
        newProduct
      );
      setShowAlert(true);
      setProductId(response.data.id);
      setTitle("");
      setPrice("");
      setDescription("");
      setInventory("");
      setCategory("");
      setImage("");
      setRatingRate("");
      setRatingCount("");

      setTimeout(() => {
        setShowAlert(false);
      }, 4000);
    } catch (error) {
      console.error("Error adding product:", error);
      alert("خطا در ثبت محصول.");
    }
  };

  const isFormValid = () => {
    return (
      title &&
      price &&
      description &&
      inventory &&
      category &&
      image &&
      ratingRate &&
      ratingCount
    );
  };

  const addNewCategory = () => {
    if (
      newCategory &&
      !categories.some((cat) => cat.category === newCategory)
    ) {
      setCategories([...categories, { category: newCategory }]);
      setNewCategory("");
    } else {
      alert("لطفاً یک دسته‌بندی معتبر وارد کنید یا دسته‌بندی تکراری نباشد.");
    }
  };

  return (
    <Container>
      {showAlert && (
        <div
          role="alert"
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
        >
          <Addok idset={productId} />
        </div>
      )}
      {showErrorAlert && (
        <div
          role="alert"
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
        >
          <AddProNot idset={productId} />
        </div>
      )}
      {isCategoryModalOpen && (
        <CategoryModal
          categories={categories}
          onSelect={selectCategory}
          onClose={closeCategoryModal}
        />
      )}
      <div className="pb-7">
        <TextTitle value="ثبت کالای جدید" />
      </div>
      <form onSubmit={handleSubmit} className="space-y-4 rtl">
        <div className="pl-36 pr-36">
          <AddInput
            id="productTitle"
            type="text"
            labelText="عنوان محصول"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="flex justify-center  items-center gap-24">
          <AddInput
            id="productPrice"
            type="number"
            labelText="قیمت محصول"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <AddInput
            id="productInventory"
            type="number"
            labelText="موجودی محصول"
            value={inventory}
            onChange={(e) => setInventory(e.target.value)}
          />
        </div>
        <div className="flex justify-center items-center gap-24">
          <div className="flex flex-col mb-4 rounded-md border border-gray-200 p-2 text-right ">
            {/* <label
              htmlFor="HeadlineAct"
              className=" mb-1  text-sm font-medium text-gray-900 "
            >
              دسته بندی
            </label>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              name="HeadlineAct"
              id="HeadlineAct"
              className="text-right mt-1.5  h-10 rounded-lg border-gray-300 text-gray-700 sm:text-sm w-96"
            >
              <option value="">انتخاب کنید</option>
              {categories.map((cat, index) => (
                <option key={index} value={cat.category}>
                  {cat.category}
                </option>
              ))}
            </select> */}
            <div className="flex justify-center items-center gap-24">
              <button
                type="button"
                onClick={openCategoryModal}
                className="px-4 py-2 bg-gray-500 text-white rounded"
              >
                انتخاب دسته‌ بندی
              </button>
              {category && (
                <span className="ml-2 text-gray-700">
                  دسته‌بندی: {category}
                </span>
              )}
            </div>
            <div className="flex mt-2 gap-2">
              <input
                type="text"
                placeholder="دسته‌بندی جدید"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="w-60 border-gray-300 rounded-lg p-1"
              />
              <button
                type="button"
                onClick={addNewCategory}
                className="px-4 py-1 bg-gray-600 text-white rounded-lg"
              >
                افزودن دسته‌بندی
              </button>
            </div>
          </div>
          <AddInput
            id="productRate"
            type="number"
            labelText="نمره محصول"
            value={ratingRate}
            onChange={(e) => setRatingRate(e.target.value)}
          />
          <AddInput
            id="productCount"
            type="number"
            labelText="تعداد نظرات"
            value={ratingCount}
            onChange={(e) => setRatingCount(e.target.value)}
          />
        </div>
        <div className="pl-36 pr-36">
          <label
            htmlFor="OrderNotes"
            className="block text-sm font-medium text-gray-700 text-right p-2"
          >
            توضیحات محصول
          </label>

          <textarea
            id="OrderNotes"
            className="mt-2 w-full rounded-xl border-gray-300 align-top shadow-md sm:text-sm text-right p-4"
            placeholder="توضیحات محصول"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="pl-36 pr-36">
          <AddInput
            id="productUrl"
            type="url"
            labelText="آدرس تصویر محصول"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>
        <div className="pl-36 pr-36">
          <button
            type="submit"
            className={`w-full p-2 rounded ${
              isFormValid() ? "bg-gray-700" : "bg-gray-400"
            } text-white`}
            disabled={!isFormValid()}
          >
            ثبت محصول
          </button>
        </div>
      </form>
    </Container>
  );
}

export default AddPro;
