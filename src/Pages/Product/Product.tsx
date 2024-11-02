import { useParams } from "react-router-dom";
import Container from "../../Components/Container/Container";
import Button from "../../Components/Button/Button";
import { getProduct } from "../../Services/Api";
import { useEffect, useState } from "react";
import { IProduct } from "../../Types/servers_type";
import { useShop_Card_Cont } from "../context/Shop_Card_Cont";
import Spinner from "../../Components/Spinner/Spinner";
import RateProPage from "../../Components/RateProPage/RateProPage";
import Pro4item from "../../Components/Product_Item/Pro4item";

function Product() {
  const params = useParams<{ id: string }>();
  const [product, setProduct] = useState<IProduct>();

  const {
    handleDecreaseProductQty,
    handleIncreaseProductQty,
    getProductQty,
    handleRemoveProductQty,
  } = useShop_Card_Cont();
  const [isloding, setIsloding] = useState(true);

  useEffect(() => {
    getProduct(params.id as string)
      .then((data) => {
        setProduct(data);
        setIsloding(false);
      })
      .catch((error) => {
        console.log(error);
        setIsloding(false);
      });
  }, [params.id]);

  const [error, setError] = useState<string | null>(null);

  const currentQty = getProductQty(parseInt(params.id as string));
  const inventory = product?.inventory || 0;

  const handleAddToCart = () => {
    if (currentQty > inventory) {
      setError(`موجودی محصول تنها ${inventory} عدد است.`);
    } else {
      handleIncreaseProductQty(parseInt(params.id as string));
      setError(null);
    }
  };

  useEffect(() => {
    const isQuantityValid = currentQty <= inventory;
    if (!isQuantityValid) {
      setError(`موجودی محصول تنها ${inventory} عدد است.`);
    } else {
      setError(null);
    }
  }, [currentQty, inventory]);

  return (
    <>
      <Container>
        {isloding ? (
          <Spinner />
        ) : (
          <div className="shadow mt-4 grid grid-cols-12">
            <div className="bg-slate-100 col-span-10 p-4 h-auto">
              <div className="flex justify-between">
                <div className="flex justify-between items-center font-bold">
                  <h2>{product?.rating.count} پیشنهادات خرید</h2>
                  <img
                    className="w-8 hover:bg-green-700 rounded-full ml-1.5"
                    src="https://www.upload.ee/image/17312158/flat-color-icons--ok.png"
                    title="پیشنهاد خریداران"
                  />
                </div>
                <div className="flex justify-between items-center font-bold">
                  {product?.rating.rate}
                  <img
                    className="w-8 hover:bg-yellow-500 rounded-full ml-1.5"
                    src="https://www.upload.ee/image/17312120/openmoji--star.png"
                    title="امتیاز محصول"
                  />
                </div>
              </div>

              <h1 className="text-right p-2">{product?.title}</h1>
              <div>
                <p className="text-right p-2 mb-2">{product?.price} $</p>
                <p className="text-right p-2 mb-2">{product?.category}</p>

                <p className="text-right mb-2">معرفی محصول</p>
                <p className="text-right ">{product?.description}</p>
              </div>
              <div>
                <p className="text-right p-2 mb-2">
                  موجودی <strong>{inventory}</strong> عدد
                </p>
              </div>
            </div>
            <div className="bg-slate-200 col-span-2 p-3">
              <img className="rounded" src={product?.image} alt="" />
              {currentQty === 0 ? (
                <Button
                  className="mt-2 w-full !py-3"
                  variant="primary"
                  onClick={handleAddToCart}
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
                      disabled={!!error}
                    >
                      +
                    </Button>

                    <span className="flex justify-center items-center">
                      {currentQty}
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
              {error && <p className="text-red-600 mt-2">{error}</p>}
            </div>
          </div>
        )}
        <div className="pb-10">
          <Pro4item />
        </div>
        <div className="pt-10">
          <RateProPage />
        </div>
      </Container>
    </>
  );
}

export default Product;
