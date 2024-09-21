import Button from "../../Components/Button/Button";
import Cart_Item from "../../Components/Cart-Item/Cart_Item";
import Container from "../../Components/Container/Container";
import { useShop_Card_Cont } from "../context/Shop_Card_Cont";

function Cart() {
  const { CartItems } = useShop_Card_Cont();
  return (
    <div>
      <Container>
        <div className="">
          {CartItems.map((item) => (
            <Cart_Item {...item} />
          ))}
        </div>
        <div className="bg-gray-300 rounded p-6">
          <p className="text-right">قیمت کل: 2.000</p>
          <p className="text-right">تخفیف شما: 200</p>
          <p className="text-right">قیمت نهایی: 800</p>
        </div>
        <Button className="mt-2" variant="success">
          ثبت سفارش
        </Button>
      </Container>
    </div>
  );
}

export default Cart;
