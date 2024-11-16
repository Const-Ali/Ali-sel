import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function HomeComOne() {
  interface Product {
    id: string;
    category: string;
    title: string;
    image: string;
    description: string;
    createdAt: string;
  }

  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get<Product[]>(
          "http://localhost:8001/products"
        );
        const sortedProducts = response.data.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setProducts(sortedProducts.slice(0, 3));
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="pb-[61px] pt-8">
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <header className="text-center">
          <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">
            محصولات جدید
          </h2>
          <p className="mx-auto mt-4 max-w-md text-gray-500">
            ما افتخار می‌کنیم که محصولات جدید خود را به شما معرفی کنیم. این
            مجموعه با دقت و توجه به جزئیات طراحی شده و با کیفیت بالا در دسترس
            شما قرار گرفته است. تجربه‌ای نو و متفاوت را با این محصولات تجربه
            کنید
          </p>
        </header>

        <ul className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-3">
          {products.map((product, index) => (
            <li
              key={product.id}
              className={
                index === 2
                  ? "lg:col-span-2 lg:col-start-2 lg:row-span-2 lg:row-start-1"
                  : ""
              }
            >
              <a
                href="#"
                className="group relative block transition transform duration-300 hover:scale-105 hover:shadow-lg" // افکت هاور اضافه شد
                onClick={() => navigate(`/product/${product.id}`)}
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="pb-10 aspect-square w-full object-cover transition duration-500 group-hover:opacity-90"
                />
                <div className="absolute inset-1 flex flex-col justify-end">
                  <div>
                    <button>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="45"
                        height="45"
                        viewBox="0 0 32 32"
                      >
                        <path
                          fill="#872222"
                          d="M4 7a1 1 0 0 0 0 2h2.22l2.624 10.5c.223.89 1.02 1.5 1.937 1.5h12.47c.903 0 1.67-.6 1.907-1.47L27.75 10h-2.094l-2.406 9H10.78L8.157 8.5A1.984 1.984 0 0 0 6.22 7zm18 14c-1.645 0-3 1.355-3 3s1.355 3 3 3s3-1.355 3-3s-1.355-3-3-3m-9 0c-1.645 0-3 1.355-3 3s1.355 3 3 3s3-1.355 3-3s-1.355-3-3-3m3-14v5h-3l4 4l4-4h-3V7zm-3 16c.564 0 1 .436 1 1s-.436 1-1 1s-1-.436-1-1s.436-1 1-1m9 0c.564 0 1 .436 1 1s-.436 1-1 1s-1-.436-1-1s.436-1 1-1"
                        />
                      </svg>
                    </button>
                  </div>
                  <h3 className="text-xl text-right font-medium text-gray-900 line-clamp-1">
                    {product.title}
                  </h3>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default HomeComOne;
