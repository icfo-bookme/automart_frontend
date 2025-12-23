"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetClose,
} from "@/components/ui/sheet";
import { X, ShoppingCart } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import CartItemRow from "./CartItemRow";

type FloatingButtonProps = {
    icon?: React.ReactNode;
    label?: string;
};

export default function FloatingButton({
    icon = <ShoppingCart />,
    label = "Cart",
}: FloatingButtonProps) {
    const cartItems = useSelector((state: RootState) => state.cart.items);
    const totalPrice = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    const [open, setOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    useEffect(() => {
        const handler = () => setOpen(true);
        window.addEventListener("open-cart", handler);
        return () => window.removeEventListener("open-cart", handler);
    }, []);

    if (!mounted) return null;

    return (
        <>
            {/* Floating Button */}
            <Button
                variant="destructive"
                className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full px-4 py-3 shadow-lg hover:scale-105 transition-transform"
                onClick={() => setOpen(true)}
            >
                {icon}
                {label && <span className="font-bold">{label}</span>}
                {cartItems.length > 0 && (
                    <span className="ml-2 bg-blue-600 text-white rounded-full px-2 py-0.5 text-xs">
                        {cartItems.length}
                    </span>
                )}
            </Button>

            {/* Cart Sheet */}
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetContent side="right" className="w-[400px]">
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
        </>
    );
}
