import axios from "axios";
import { useEffect, useState } from "react";

function RandomProduct() {
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
  const [visibleProducts, setVisibleProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get<Product[]>(
          "http://localhost:8001/products"
        );
        setProducts(response.data);
        setVisibleProducts(response.data.slice(0, 12));
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleProducts((prevVisibleProducts) => {
        if (prevVisibleProducts.length < 6) return prevVisibleProducts;

        const nextProductIndex =
          (products.indexOf(
            prevVisibleProducts[prevVisibleProducts.length - 1]
          ) +
            1) %
          products.length;

        return [...prevVisibleProducts.slice(1), products[nextProductIndex]];
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [products]);

  return (
    <div className="p-10 shadow-2xl">
      <div className="font-sans bg-gradient-to-r from-gray-200 via-gray-50 to-gray-200 px-4  py-10">
        <div className="mx-auto lg:max-w-6xl md:max-w-4xl">
          <h2 className="text-5xl font-extrabold text-gray-700 text-right mb-12">
            محصولات
          </h2>

          {visibleProducts.length === 0 ? (
            <div className="flex justify-center items-center">
              <p>محصولی یافت نشد</p>
            </div>
          ) : (
            <div className="flex flex-wrap justify-between">
              {visibleProducts.map((product) => (
                <a href={`/product/${product.id}`} key={product.id}>
                  <div className="bg-gray-50 my-3  p-3 cursor-pointer shadow-sm rounded-md hover:scale-[1.03] transition-all w-44">
                    <div className="w-full h-24 overflow-hidden mx-auto">
                      <img
                        className="mx-auto my-1 object-contain rounded-md max-h-full"
                        src={product.image}
                        alt={product.title}
                      />
                    </div>
                    <div className="text-center mt-4">
                      <h3 className="text-sm font-bold text-gray-800 line-clamp-2">
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
    </div>
  );
}

export default RandomProduct;
