"use client";

import { useEffect, useState } from "react";
import { Trash2, Heart, ShoppingBag, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

type WishlistItem = {
    id: number;
    title: string;
    price: number;
    thumbnail: string;
};

const Page = () => {
    const [wishlist, setWishlist] = useState<WishlistItem[]>([]);

    useEffect(() => {
        const stored = localStorage.getItem("wishlist");
        if (stored) {
            setWishlist(JSON.parse(stored));
        }
    }, []);

    const removeFromWishlist = (id: number) => {
        const updatedWishlist = wishlist.filter((item) => item.id !== id);
        setWishlist(updatedWishlist);
        localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    };

    const clearWishlist = () => {
        setWishlist([]);
        localStorage.removeItem("wishlist");
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <Link
                        href="/"
                        className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Continue Shopping
                    </Link>

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-3 mb-4 sm:mb-0">
                            <div className="p-2 bg-pink-50 rounded-lg">
                                <Heart className="w-6 h-6 text-pink-600" fill="currentColor" />
                            </div>
                            <div>
                                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                                    My Wishlist
                                </h1>
                                <p className="text-gray-600">
                                    {wishlist.length} {wishlist.length === 1 ? "item" : "items"}
                                </p>
                            </div>
                        </div>

                        {wishlist.length > 0 && (
                            <button
                                onClick={clearWishlist}
                                className="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                            >
                                Clear All
                            </button>
                        )}
                    </div>
                </div>

                {/* Wishlist Content */}
                {wishlist.length === 0 ? (
                    <div className="bg-white rounded-2xl shadow-sm p-8 sm:p-12 text-center">
                        <div className="max-w-md mx-auto">
                            <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center bg-gray-100 rounded-full">
                                <Heart className="w-10 h-10 text-gray-400" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                Your wishlist is empty
                            </h3>
                            <p className="text-gray-600 mb-8">
                                Save items you love by clicking the heart icon. They'll appear here.
                            </p>
                            <Link
                                href="/"
                                className="inline-flex items-center justify-center px-6 py-3 bg-black text-white font-medium rounded-lg hover:bg-gray-800 transition-colors"
                            >
                                <ShoppingBag className="w-5 h-5 mr-2" />
                                Start Shopping
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className=" max-w-5xl mx-auto gap-8">
                        {/* Wishlist Items */}
                        <div className="lg:col-span-2">
                            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                                <div className="hidden md:grid grid-cols-12 gap-4 p-6 border-b bg-gray-50 text-sm font-medium text-gray-600">
                                    <div className="col-span-6">Product</div>
                                    <div className="col-span-3 text-center">Price</div>
                                    <div className="col-span-3 text-center">Actions</div>
                                </div>

                                <div className="divide-y">
                                    {wishlist.map((item) => (
                                        <div
                                            key={item.id}
                                            className="p-4 md:p-6 hover:bg-gray-50/50 transition-colors"
                                        >
                                            <div className="flex flex-col md:grid md:grid-cols-12 gap-4 md:gap-6">
                                                {/* Product Info */}
                                                <div className="flex gap-4 md:col-span-6">
                                                    <div className="relative">
                                                        <Image
                                                            src={`${process.env.NEXT_PUBLIC_MAIN_DOMAIN}/${item.thumbnail}`}
                                                            alt={item.title} width={80} height={80}
                                                            className="w-24 h-24 md:w-28 md:h-28 object-cover rounded-xl"
                                                        />
                                                        <button
                                                            onClick={() => removeFromWishlist(item.id)}
                                                            className="absolute -top-2 -right-2 p-1.5 bg-white border rounded-full shadow-sm hover:bg-gray-50 transition-colors"
                                                            aria-label="Remove from wishlist"
                                                        >
                                                            <Trash2 className="w-4 h-4 text-gray-500" />
                                                        </button>
                                                    </div>

                                                    <div className="flex-1">
                                                        <h3 className="font-medium text-gray-900 mb-2 line-clamp-2">
                                                            {item.title}
                                                        </h3>
                                                        <p className="text-gray-600 text-sm mb-4">
                                                            In Stock
                                                        </p>
                                                        <div className="flex gap-3">
                                                            <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
                                                                Move to Cart
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Price */}
                                                <div className="md:col-span-3 flex items-center justify-center">
                                                    <div className="text-lg font-semibold text-gray-900">
                                                        ৳ {item.price.toLocaleString()}
                                                    </div>
                                                </div>

                                                {/* Actions */}
                                                <div className="md:col-span-3 flex flex-col gap-3 items-center justify-center">
                                                    <button className="w-full md:w-auto px-6 py-2.5 bg-black text-white font-medium rounded-lg hover:bg-gray-800 transition-colors">
                                                        Add to Cart
                                                    </button>
                                                    <button
                                                        onClick={() => removeFromWishlist(item.id)}
                                                        className="text-sm text-red-600 hover:text-red-700 font-medium"
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>


                    </div>
                )}
            </div>
        </div>
    );
};

export default Page;