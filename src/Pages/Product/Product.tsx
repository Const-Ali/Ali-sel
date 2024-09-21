import { useParams } from "react-router-dom";
import Container from "../../Components/Container/Container";
import Button from "../../Components/Button/Button";
import { getProduct } from "../../Services/Api";
import { useEffect, useState } from "react";
import { IProduct } from "../../Types/servers_type";
import { useShop_Card_Cont } from "../context/Shop_Card_Cont";

function Product() {
  const params = useParams<{ id: string }>();
  const [product, setProduct] = useState<IProduct>();
  const {
    handleDecreaseProductQty,
    handleIncreaseProductQty,
    getProductQty,
    handleRemoveProductQty,
    CartItems,
  } = useShop_Card_Cont();
  useEffect(() => {
    getProduct(params.id as string).then((data) => {
      setProduct(data);
    });
  }, []);
  console.log(CartItems);
  return (
    <div>
      <Container>
        <div className="shadow mt-4 grid grid-cols-12">
          <div className="bg-slate-300 col-span-10 p-4">
            <h1 className="text-right p-2">{product?.title} </h1>
            <div>
              <p className="text-right p-2">{product?.price}</p>
              <p className="text-right">{product?.description}</p>
            </div>
          </div>
          <div className="bg-slate-400 col-span-2 p-3">
            <img className="rounded" src={product?.image} alt="" />
            {getProductQty(parseInt(params.id as string)) === 0 ? (
              <Button
                className="mt-2 w-full !py-3"
                variant="primary"
                onClick={() =>
                  handleIncreaseProductQty(parseInt(params.id as string))
                }
              >
                اضافه به سبد خرید
              </Button>
            ) : (
              <>
                <div className="grid grid-cols-3">
                  <Button
                    className="mt-2 w-full"
                    variant="primary"
                    onClick={() =>
                      handleIncreaseProductQty(parseInt(params.id as string))
                    }
                  >
                    +
                  </Button>

                  <span className="flex justify-center items-center">
                    {getProductQty(parseInt(params.id as string))}
                  </span>
                  <Button
                    className="mt-2 w-full"
                    variant="primary"
                    onClick={() =>
                      handleDecreaseProductQty(parseInt(params.id as string))
                    }
                  >
                    -
                  </Button>
                </div>
                <Button
                  className="mt-2 w-full !py-3"
                  variant="danger"
                  onClick={() =>
                    handleRemoveProductQty(parseInt(params.id as string))
                  }
                >
                  حذف
                </Button>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Product;
