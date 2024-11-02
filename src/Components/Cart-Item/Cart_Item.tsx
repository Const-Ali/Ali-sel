import Button from "../Button/Button";
import { useEffect, useState } from "react";
import { getProduct } from "../../Services/Api";
import { IProduct } from "../../Types/servers_type";
import { useShop_Card_Cont } from "../../Pages/context/Shop_Card_Cont";
import { Link } from "react-router-dom";

interface ICart_Item {
  id: number;
  qty: number;
}

function Cart_Item({ id, qty }: ICart_Item) {
  const [product, setProduct] = useState<IProduct>();
  const [stockError, setStockError] = useState<string | null>(null);
  const {
    handleDecreaseProductQty,
    handleIncreaseProductQty,
    handleRemoveProductQty,
  } = useShop_Card_Cont();

  useEffect(() => {
    const fetchProduct = async () => {
      const data = await getProduct(id);
      setProduct(data);
      if (data.inventory < qty) {
        setStockError(`موجودی کافی برای ${data.title} وجود ندارد`);
      } else {
        setStockError(null);
      }
    };

    fetchProduct();
  }, [id, qty]);

  const handleIncrease = () => {
    if (product && qty >= product.inventory) {
      const errorMessage = ` . کافی نمیباشد  ${product.title} موجودی محصول`;
      setStockError(errorMessage);

      setTimeout(() => {
        setStockError(null);
      }, 4000);
    } else {
      setStockError(null);
      handleIncreaseProductQty(id);
    }
  };

  return (
    <div className="flex flex-row-reverse mt-4 border-b pb-4">
      <Link to={`/Product/${id}`}>
        <img className="rounded w-28" src={product?.image} alt="" />
      </Link>
      <div className="mr-4">
        <div className="flex justify-between gap-20">
          <h3 className="font-bold">{product?.price} $</h3>
          <h3 className="">{product?.title}</h3>
        </div>

        <div className="mt-2 flex justify-end">
          <Button
            onClick={() => handleRemoveProductQty(id)}
            className="mr-2"
            variant="danger"
          >
            Remove
          </Button>
          <Button
            onClick={handleIncrease}
            variant="primary"
            disabled={stockError !== null}
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
        {stockError && <p className="text-red-500 mt-1">{stockError}</p>}
      </div>
    </div>
  );
}

export default Cart_Item;
