import React, { useState, useEffect } from "react";
import Container from "../Container/Container";
import axios from "axios";
import SaveChanges from "../Alert/SaveChanges";
import Checkidok from "../Alert/Checkidok";
import Checkiderror from "../Alert/Checkiderror";
import NotChanges from "../Alert/NotChanges";
import AddInput from "../AddInput/AddInput";
import CheckInputs from "../Alert/CheckInputs";
import TextTitle from "../PropComponents/TextTitle";
import Button from "../Button/Button";

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
  createdAt: string;
}

interface Category {
  category: string;
}

function EditPro() {
  const [productId, setProductId] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [inventory, setInventory] = useState("");
  const [image, setImage] = useState("");
  const [ratingRate, setRatingRate] = useState("");
  const [ratingCount, setRatingCount] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [alertVisible, setAlertVisible] = useState(false);
  const [notChangesVisible, setNotChangesVisible] = useState(false);
  const [originalProduct, setOriginalProduct] = useState<IProduct | null>(null);
  const [checkInputsVisible, setCheckInputsVisible] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:8001/products");
        const data: IProduct[] = response.data;

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

  const [isProductLoaded, setIsProductLoaded] = useState<null | boolean>(null);

  const loadCheck = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8001/products/${productId}`
      );
      const product: IProduct = response.data;

      setTitle(product.title);
      setPrice(product.price.toString());
      setDescription(product.description);
      setInventory(product.inventory.toString());
      setCategory(product.category);
      setImage(product.image);
      setRatingRate(product.rating.rate.toString());
      setRatingCount(product.rating.count.toString());

      setOriginalProduct(product);

      setIsProductLoaded(true);

      setTimeout(() => {
        setIsProductLoaded(null);
      }, 500);
    } catch (error) {
      console.error("Error fetching product:", error);
      setIsProductLoaded(false);
      setTimeout(() => {
        setIsProductLoaded(null);
      }, 3000);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isFormValid()) {
      setCheckInputsVisible(true);
      setTimeout(() => {
        setCheckInputsVisible(false);
      }, 2000);
      return;
    }

    const updatedProduct = {
      title,
      price: parseFloat(price),
      description,
      inventory: parseInt(inventory, 10),
      category,
      image,
      rating: {
        rate: parseFloat(ratingRate),
        count: parseInt(ratingCount, 10),
      },
      createdAt: originalProduct?.createdAt,
    };

    const hasChanges =
      originalProduct &&
      (originalProduct.title !== updatedProduct.title ||
        originalProduct.price !== updatedProduct.price ||
        originalProduct.description !== updatedProduct.description ||
        originalProduct.inventory !== updatedProduct.inventory ||
        originalProduct.category !== updatedProduct.category ||
        originalProduct.image !== updatedProduct.image ||
        originalProduct.rating.rate !== updatedProduct.rating.rate ||
        originalProduct.rating.count !== updatedProduct.rating.count);
    if (!hasChanges) {
      console.error("No changes detected!");
      setNotChangesVisible(true);
      setTimeout(() => {
        setNotChangesVisible(false);
      }, 2000);
      return;
    }

    try {
      await axios.put(
        `http://localhost:8001/products/${productId}`,
        updatedProduct
      );
      setAlertVisible(true);
      setTimeout(() => {
        setAlertVisible(false);
      }, 2000);
    } catch (error) {
      console.error("Error updating product:", error);
      alert("خطا در ویرایش محصول.");
    }
  };

  return (
    <Container>
      {checkInputsVisible && (
        <div
          role="alert"
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
        >
          <CheckInputs />
        </div>
      )}
      {notChangesVisible && (
        <div
          role="alert"
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
        >
          <NotChanges />
        </div>
      )}

      {isProductLoaded === true && (
        <div
          role="alert"
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
        >
          <Checkidok />
        </div>
      )}
      {isProductLoaded === false && (
        <div
          role="alert"
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
        >
          <Checkiderror />
        </div>
      )}

      {alertVisible && (
        <div
          role="alert"
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
        >
          <SaveChanges />
        </div>
      )}
      <div className="pb-7">
        <TextTitle value="ویرایش کالا" />
      </div>

      <div className="pl-36 pr-36 pb-8">
        <AddInput
          id="productTitle"
          type="text"
          labelText="شناسه محصول"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
        />
        <Button variant="Btn-1" onClick={loadCheck}>
          بررسی
        </Button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4 rtl">
        <div className="flex flex-col mb-4">
          <div className="pl-36 pr-36">
            <AddInput
              id="productTitle"
              type="text"
              labelText="عنوان محصول"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
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
            <label
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
            </select>
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
        <div className="flex flex-col mb-4">
          <div className="pl-36 pr-36">
            <AddInput
              id="productUrl"
              type="url"
              labelText="آدرس تصویر محصول"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </div>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded w-24"
        >
          ذخیره
        </button>
      </form>
    </Container>
  );
}

export default EditPro;
