"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useSelector } from "react-redux";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Heart, ShoppingCart, PhoneCall, ChevronUp } from "lucide-react";
import Search from "./Search";
import Link from "next/link";
import { RootState } from "@/store";
import CartSheet from "../modules/cart/CartSheet";
import BottomHeader from "./BottomHeader";

export default function Header() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const [categoryId, setCategoryId] = useState<string>("");
  const [search, setSearch] = useState<string>("");

  // Redux state (only safe after mount)
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (categoryId) params.append("category_id", categoryId);
    if (search.trim()) params.append("search", search.trim());
    router.push(`/items/search?${params.toString()}`);
  };

  if (!mounted) return null;

  return (
    <header className="w-full border-b bg-white">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-6 text-sm border-b border-b-gray-200 h-10">
        <div className="flex font-bold text-xs items-center gap-2">
          <PhoneCall className="h-4 w-4 text-muted-foreground" />
          <span>
            CALL US: <strong className="text-red-600">01888-022244</strong>
          </span>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="sm">
              LOGIN <ChevronUp />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-white">
            <DropdownMenuItem>Sign In</DropdownMenuItem>
            <DropdownMenuItem>Register</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Main Header */}
      <div className="md:grid grid-cols-5 flex justify-between gap-6 px-6 md:py-3 items-center ">
        {/* Logo */}
        <div className="lg:hidden col-span-1">
          <BottomHeader />
        </div>

        <Link href={"/"} className="col-span-1 flex items-center gap-2">
          <Image src="/logo/automax-lg.png" alt="Automart" width={100} height={50} priority fetchPriority={"high"} />
        </Link>

        {/* Search Bar */}
        <div className="col-span-3 hidden md:flex">
          <Search />
        </div>

        <div className="flex items-center gap-4 col-span-1">
          <div className="flex items-center gap-6 col-span-1">
            {/* Wishlist Button */}
            <Link href="/wishlist">
              <Button
                variant="ghost"
                size="icon"
                className="relative bg-red-600 md:p-6 hover:bg-red-800 transition-colors"
              >
                <Heart className="h-7 w-7 text-white" />
                <Badge
                  className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 text-xs text-white bg-blue-600"
                  variant="destructive"
                >
                  {wishlistItems.length}
                </Badge>
              </Button></Link>

            {/* ShadCN Sheet Trigger */}
            <CartSheet />

          </div>
        </div>


      </div>
    </header>
  );
}
