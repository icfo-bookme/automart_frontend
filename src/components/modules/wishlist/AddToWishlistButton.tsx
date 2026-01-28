"use client";

import { useDispatch, useSelector } from "react-redux";
import { addToWishlist, removeFromWishlist } from "@/store/wishlistSlice";
import { Item } from "@/types/Item";
import { Button } from "@/components/ui/button";
import { RootState } from "@/store";
import { Heart } from "lucide-react";

type Props = {
  product: Item;
};

const AddToWishlistButton = ({ product }: Props) => {
  const dispatch = useDispatch();

  const isInWishlist = useSelector((state: RootState) =>
    state.wishlist.items.some(item => item.id === product.id)
  );

  const handleWishlist = () => {
    if (isInWishlist) {
      dispatch(removeFromWishlist(product.id));
    } else {
      dispatch(
        addToWishlist({
          id: product.id,
          title: product.name,
          price: Number(product.sales_price),
          thumbnail: product.thumbnail,
        })
      );
    }
  };

  return (
    <Button asChild
      onClick={handleWishlist}
      className={`px-3 py-2 w-full text-sm ${
        isInWishlist
          ? "bg-gray-800 text-gray-100"
          : "bg-red-600 text-white"
      }`}
    >
      {isInWishlist ? <Heart className="h-4 w-4" /> : <Heart className="h-4 w-4" />}
    </Button>
  );
};

export default AddToWishlistButton;
