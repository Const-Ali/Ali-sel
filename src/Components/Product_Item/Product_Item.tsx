import { IProduct } from "../../Types/servers_type";

type TProduct_Item = IProduct;
function Product_Item({ title, price, description, image }: TProduct_Item) {
  return (
    <div className="shadow-xl border rounded pb-2">
      <img className="rounded-t" src={image} alt="" />
      <div className=" flex justify-between  px-4 mt-2">
        <h3 className="line-clamp-1 font-bold w-52">{title}</h3>
        <span className="font-bold">{price}$</span>
      </div>
      <div className="px-4 mt-1">
        <p className="line-clamp-2 text-left text-gray-500">{description}</p>
      </div>
    </div>
  );
}

export default Product_Item;
