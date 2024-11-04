import axios from "axios";
import { useEffect, useState } from "react";

function HomeComFour() {
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

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get<Product[]>(
          "http://localhost:8001/products"
        );
        const filteredProducts = response.data
          .filter((product) => product.rating.count > 200)
          .sort((a, b) => b.rating.count - a.rating.count);
        setProducts(filteredProducts.slice(0, 12));
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="font-sans bg-gray-50 px-4 py-8">
      <div className="mx-auto lg:max-w-6xl md:max-w-4xl">
        <h2 className="text-5xl font-extrabold text-gray-700 text-center mb-12">
          پربازدید ترین ها
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white p-3 cursor-pointer shadow-sm rounded-md hover:scale-[1.03] transition-all"
            >
              <div className="w-full h-24 overflow-hidden mx-auto aspect-w-16 aspect-h-8">
                <img
                  className="mx-auto my-2 object-contain rounded-md"
                  src={product.image}
                  alt={product.title}
                />
              </div>
              <div className="text-center mt-4">
                <h3 className="text-sm font-bold text-gray-800">
                  {product.title}
                </h3>
                <h4 className="text-base text-gray-500 font-bold mt-2">
                  {product.price} ريال
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomeComFour;
