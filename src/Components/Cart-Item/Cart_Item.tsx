import Button from "../Button/Button";
import { useEffect, useState } from "react";
import { getProduct } from "../../Services/Api";
import { IProduct } from "../../Types/servers_type";
import { useShop_Card_Cont } from "../../Pages/context/Shop_Card_Cont";
import { Link } from "react-router-dom";
import Product from "../../Pages/Product/Product";

interface ICart_Item {
  id: number;
  qty: number;
}

function Cart_Item({ id, qty }: ICart_Item) {
  const [product, setProduct] = useState<IProduct>();
  const {
    handleDecreaseProductQty,
    handleIncreaseProductQty,
    handleRemoveProductQty,
  } = useShop_Card_Cont();
  useEffect(() => {
    getProduct(id).then((data) => {
      setProduct(data);
    });
  });

  return (
    <div className="flex flex-row-reverse mt-4 border-b pb-4">
      <Link to={`/Product/${id}`}>
        <img className="rounded w-28" src={product?.image} alt="" />
      </Link>
      <div className="mr-4">
        <h3 className="text-right">{product?.title}</h3>
        <div className="mt-2">
          <Button
            onClick={() => handleRemoveProductQty(id)}
            className="mr-2"
            variant="danger"
          >
            Remove
          </Button>
          <Button
            onClick={() => handleIncreaseProductQty(id)}
            variant="primary"
          >
            +
          </Button>
          <span className="mx-2">{qty}</span>
          <Button
            onClick={() => handleDecreaseProductQty(id)}
            variant="primary"
          >
            -
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Cart_Item;
