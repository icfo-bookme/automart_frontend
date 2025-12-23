"use client";

import * as React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ShoppingCart, X } from "lucide-react";
import CartItemRow from "./CartItemRow";

export default function CartSheet() {
    const cartItems = useSelector((state: RootState) => state.cart.items);
    const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <Sheet >
            <SheetTrigger asChild>
                <Button variant="destructive" className="relative gap-2 text-medium py-5 text-white font-bold">
                    <ShoppingCart className="h-5 w-5" /> Cart
                    {cartItems.length > 0 && (
                        <span className="ml-1 bg-blue-600  text-white rounded-full px-2 py-0.5 text-xs">{cartItems.length}</span>
                    )}
                </Button>
            </SheetTrigger>

            <SheetContent side="right" className="w-[400px] flex flex-col">
                <SheetHeader>
                    <SheetTitle>Shopping Cart</SheetTitle>

                </SheetHeader>

                <div className="mt-4 flex-1 overflow-y-auto">
                    {cartItems.length === 0 ? (
                        <p className="text-center text-gray-500 mt-10">Your cart is empty.</p>
                    ) : (
                        cartItems.map((item) => <CartItemRow key={item.id} item={item} />)
                    )}
                </div>

                {cartItems.length > 0 && (
                    <div className="mt-4 border-t border-gray-200 pt-4">
                        <div className="flex justify-between font-bold mb-4 w-[80%] mx-auto">
                            <span>Total:</span>
                            <span>৳{totalPrice.toLocaleString()}</span>
                        </div>
                        <div className="w-[80%] mx-auto">
                            <Button className="w-full bg-red-600 text-white rounded-sm">Checkout</Button>
                        </div>

                    </div>
                )}
            </SheetContent>
        </Sheet>
    );
}
