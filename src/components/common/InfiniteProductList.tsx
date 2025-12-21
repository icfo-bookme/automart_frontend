"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import { Item } from "@/types/item";
import Header from "../modules/home/header";

const calculateDiscount = (
    regular: number | string,
    sales: number | string
): number => {
    const r = Number(regular);
    const s = Number(sales);
    if (!r || r <= s) return 0;
    return Math.round(((r - s) / r) * 100);
};

export default function InfiniteProductList() {
    const [items, setItems] = useState<Item[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const observerRef = useRef<HTMLDivElement | null>(null);

    const fetchItems = useCallback(async () => {
        if (loading || !hasMore) return;

        setLoading(true);

        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/items?page=${page}`
        );
        const data = await res.json();

        const newItems = data.data.data;

        if (newItems.length === 0) {
            setHasMore(false);
        } else {
            setItems((prev) => [...prev, ...newItems]);
            setPage((prev) => prev + 1);
        }

        setLoading(false);
    }, [page, loading, hasMore]);

    useEffect(() => {
        fetchItems();
    }, []);

    useEffect(() => {
        if (!observerRef.current) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    fetchItems();
                }
            },
            { threshold: 1 }
        );

        observer.observe(observerRef.current);

        return () => observer.disconnect();
    }, [fetchItems]);

    return (
        <div className="px-4 md:px-6 lg:px-8 py-6">
            {/* Grid container with fixed columns */}
            <Header title="All Products" />
            <div className="grid grid-cols-5 gap-4">
                {items.map((item, index) => {
                    const discount = calculateDiscount(
                        item.regular_price,
                        item.sales_price
                    );

                    return (
                        <div
                            key={`${item.id}-${index}`}
                            className="group bg-white rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-200 flex flex-col h-full"
                        >
                            {/* Discount Badge */}
                            {discount > 0 && (
                                <div className="absolute top-2 left-2 z-10">
                                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-red-600 text-white">
                                        -{discount}%
                                    </span>
                                </div>
                            )}

                            {/* Image Container - Fixed Height */}
                            <div className="relative w-full h-40 bg-white overflow-hidden">
                                <div className="absolute inset-0 flex items-center justify-center p-3">
                                    <div className="relative w-full h-full">
                                        <Image
                                            src={`${process.env.NEXT_PUBLIC_MAIN_DOMAIN}/${item.thumbnail}`}
                                            alt={item.name}
                                            fill
                                            className="object-contain transition-transform duration-300 group-hover:scale-105"
                                            sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                                            priority={false}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Content Section */}
                            <div className="p-3 flex flex-col flex-grow border-t border-gray-100">
                                {/* Category */}
                                <p className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-1 truncate">
                                    {item.sub_category?.name || "Category"}
                                </p>

                                {/* Product Name */}
                                <h3 className="text-sm font-bold text-gray-900 mb-2 line-clamp-2 min-h-[2.5rem]">
                                    {item.name}
                                </h3>

                                {/* Rating */}
                                <div className="flex items-center gap-1 mb-3">
                                    <div className="flex">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className="w-3 h-3 fill-yellow-400 text-yellow-400"
                                            />
                                        ))}
                                    </div>
                                    <span className="text-xs text-gray-500 ml-1">
                                        Rate this product
                                    </span>
                                </div>

                                {/* Price Section */}
                                <div className="mt-auto space-y-1">
                                    <div className="flex items-center gap-2">
                                        {discount > 0 ? (
                                            <>
                                                <span className="text-sm line-through text-gray-400 font-medium">
                                                    ৳{Number(item.regular_price).toLocaleString()}
                                                </span>
                                                <span className="text-lg font-bold text-red-600">
                                                    ৳{Number(item.sales_price).toLocaleString()}
                                                </span>
                                            </>
                                        ) : (
                                            <span className="text-lg font-bold text-gray-900">
                                                ৳{Number(item.regular_price).toLocaleString()}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Add to Cart Button (Optional) */}
                                <button className="mt-3 w-full py-2 bg-gray-900 text-white text-sm font-medium rounded hover:bg-gray-800 transition-colors duration-200 opacity-0 group-hover:opacity-100">
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Observer for infinite scroll */}
            {hasMore && (
                <div ref={observerRef} className="h-20 flex items-center justify-center mt-6">
                    {loading && (
                        <div className="flex flex-col items-center gap-2">
                            <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
                            <p className="text-sm text-gray-500">Loading more products...</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}