"use client";

import { useDispatch } from "react-redux";
import { addToCart } from "@/store/cartSlice";
import { Item } from "@/types/Item";
import { Button } from "@/components/ui/button";

type Props = { product: Item };

const AddToCartButton = ({ product }: Props) => {
  const dispatch = useDispatch();
  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: product.id,
        title: product.name,
        price: Number(product.sales_price),
        thumbnail: product.thumbnail,
      })
    );
  };

  return (
    <Button
      onClick={handleAddToCart}
      className="px-3 py-2 bg-red-600 text-white rounded w-full text-sm"
    >
      Add to Cart
    </Button>
  );
};

export default AddToCartButton;
