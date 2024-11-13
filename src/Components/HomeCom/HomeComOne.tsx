import axios from "axios";
import { useEffect, useState } from "react";

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
    <>
      <section>
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
                  href={product.id}
                  key={product.id}
                  className="group relative block"
                >
                  <img
                    src={product.image}
                    alt={product.title}
                    className="aspect-square w-full object-cover transition duration-500 group-hover:opacity-90"
                  />
                  <div className="absolute inset-1 flex flex-col items-start justify-end p-6">
                    <h3 className="text-xl font-medium text-gray-900 line-clamp-1">
                      {product.title}
                    </h3>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

export default HomeComOne;
