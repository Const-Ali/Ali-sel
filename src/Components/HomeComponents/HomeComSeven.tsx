import { useEffect, useState } from "react";
import axios from "axios";
import { IProduct } from "../../Types/servers_type";
import TextTitle from "../PropComponents/TextTitle";

const RandomProducts = () => {
  const [product, setProduct] = useState<IProduct | null>(null);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8001/products");
        const shuffledProducts = response.data.sort(() => 0.5 - Math.random());
        setProduct(shuffledProducts[0]);

        const intervalId = setInterval(() => {
          setFade(true);
          setTimeout(() => {
            const newProduct =
              shuffledProducts[
                Math.floor(Math.random() * shuffledProducts.length)
              ];
            setProduct(newProduct);
            setFade(false);
          }, 1000);
        }, 5000);

        return () => clearInterval(intervalId);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="border border-gray-400 rounded-lg m-10">
      <div className="p-10 w-96">
        <TextTitle value="محصولات تصادفی" />
        {product && (
          <div
            className={`transition-opacity duration-1000 ${fade ? "opacity-0" : "opacity-100"}`}
          >
            <img src={product.image} className="w-96" />
            <h3 className="text-xl text-gray-800 line-clamp-1 text-right">
              {product.title.replace(/[A-Za-z]/g, "")}
              {product.title.replace(/[^A-Za-z]/g, "")}
            </h3>
            <p className="text-right text-xl mt-4 text-gray-500">
              {product.price.toLocaleString("fa-IR")} تومان
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RandomProducts;
