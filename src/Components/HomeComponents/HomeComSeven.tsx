import { useEffect, useState } from "react";
import axios from "axios";
import { IProduct } from "../../Types/servers_type";
import TextTitle from "../PropComponents/TextTitle";
import { Link } from "react-router-dom";

const RandomProducts = () => {
  const [product, setProduct] = useState<IProduct | null>(null);
  const [fade, setFade] = useState(false);
  const [progress, setProgress] = useState(0);
  const [discount, setDiscount] = useState<number>(0);
  let progressInterval: ReturnType<typeof setInterval>;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8001/products");
        const shuffledProducts = response.data.sort(() => 0.5 - Math.random());
        setProduct(shuffledProducts[0]);
        setDiscount(Math.floor(Math.random() * 10) + 1);

        const intervalId = setInterval(() => {
          setFade(true);

          setTimeout(() => {
            const newProduct =
              shuffledProducts[
                Math.floor(Math.random() * shuffledProducts.length)
              ];
            setProduct(newProduct);
            setDiscount(Math.floor(Math.random() * 20) + 1);
            setFade(false);
            setProgress(0);
          }, 1000);
        }, 5000);

        progressInterval = setInterval(() => {
          setProgress((prev) => (prev < 100 ? prev + 100 / (9999 / 100) : 0));
        }, 100);

        return () => {
          clearInterval(intervalId);
          clearInterval(progressInterval);
        };
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();

    return () => clearInterval(progressInterval);
  }, []);

  return (
    <div className="border border-gray-400 rounded-lg m-10">
      <div className="p-10 w-96">
        <TextTitle value="پیشنهاد لحظه‌ای" />

        {product && (
          <div
            className={`transition-opacity duration-1000 ${
              fade ? "opacity-0" : "opacity-100"
            }`}
          >
            <Link to={`/product/${product.id}`}>
              <div className="relative w-full h-1 bg-gray-300 rounded-full my-4 overflow-hidden flex flex-row-reverse">
                <div
                  className="absolute h-full bg-red-500 transition-all"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <div>
                <h3 className="rounded-xl bg-red-500 text-white w-16 h-7 text-center">
                  % {discount}
                </h3>
                <img src={product.image} className="w-96" alt={product.title} />
              </div>

              <h3 className="text-xl text-gray-800 line-clamp-1 text-center">
                {product.title.replace(/[A-Za-z]/g, "")}
                {product.title.replace(/[^A-Za-z]/g, "")}
              </h3>

              <p className="text-center text-xl mt-4 text-gray-500 line-through">
                {product.price.toLocaleString("fa-IR")} تومان
              </p>
              <p className="text-center text-xl mt-1 text-red-500 font-bold">
                {(product.price * (1 - discount / 100)).toLocaleString("fa-IR")}{" "}
                تومان
              </p>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default RandomProducts;
