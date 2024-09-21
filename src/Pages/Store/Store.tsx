import { useEffect, useState } from "react";
import Product_Item from "../../Components/Product_Item/Product_Item";
import Container from "../../Components/Container/Container";
import { Link } from "react-router-dom";
import { getProducts } from "../../Services/Api";
import { IProduct } from "../../Types/servers_type";

function Store() {
  const [products, setProduct] = useState<IProduct[]>([]);

  useEffect(() => {
    getProducts().then((result) => {
      setProduct(result);
    });
  }, []);
  console.log(products);

  return (
    <div>
      <Container>
        <h1 className="text-right mt-5">جدید ترین محصولات</h1>
        <div className="grid grid-cols-4 gap-5 mt-4">
          {products.map((item) => (
            <Link key={item.id} to={`/product/${item.id}`}>
              <Product_Item {...item} />
            </Link>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Store;
