import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SadSvg from "../SVG/SadSvg";

function SimilarProducts() {
  interface Product {
    id: string;
    category: string;
    title: string;
    image: string;
    description: string;
    createdAt: string;
    price: number;
    rating: {
      rate: number;
      count: number;
    };
  }

  const { id } = useParams<{ id: string }>();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProductAndRelated = async () => {
      try {
        const productResponse = await axios.get<Product>(
          `http://localhost:8001/products/${id}`
        );
        const product = productResponse.data;

        const productsResponse = await axios.get<Product[]>(
          "http://localhost:8001/products"
        );

        const relatedProducts = productsResponse.data.filter(
          (p) => p.category === product.category && p.id !== product.id
        );

        setProducts(relatedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProductAndRelated();
  }, [id]);

  return (
    <div className="font-sans bg-gradient-to-r from-gray-200 via-gray-50 to-gray-200 px-4 my-8 py-10">
      <div className="mx-auto lg:max-w-6xl md:max-w-4xl">
        <h2 className="text-5xl font-extrabold text-gray-700 text-center mb-12">
          محصولات مشابه
        </h2>

        {products.length === 0 ? (
          <div className="flex justify-center items-center">
            <SadSvg />
          </div>
        ) : (
          <div className="flex flex-wrap justify-center items-center gap-4">
            {products.map((product) => (
              <a href={`/product/${product.id}`} key={product.id}>
                <div className="bg-gray-50 p-3 cursor-pointer shadow-sm rounded-md hover:scale-[1.03] transition-all h-full">
                  <div className="w-full h-24 overflow-hidden mx-auto aspect-w-16 aspect-h-8">
                    <img
                      className="mx-auto my-1 object-contain rounded-md max-h-full"
                      src={product.image}
                      alt={product.title}
                    />
                  </div>
                  <div className="text-center mt-4">
                    <h3 className="text-sm font-bold text-gray-800">
                      {product.title}
                    </h3>
                    <h4 className="text-base text-gray-500 font-bold mt-3 flex justify-center">
                      <p className="pr-2">تومان</p>
                      {product.price.toLocaleString("fa-IR")}
                    </h4>
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SimilarProducts;
