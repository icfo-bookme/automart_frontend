"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Star } from "lucide-react";
import { Item } from "@/types/Item";
import Header from "../components/modules/home/header";
import ProductModal from "./ProductModal";
import AddToCartButton from "@/components/modules/cart/AddToCartButton";

const calculateDiscount = (
  regular: number | string,
  sales: number | string
): number => {
  const r = Number(regular);
  const s = Number(sales);
  if (!r || r <= s) return 0;
  return Math.round(((r - s) / r) * 100);
};

const slugify = (text: string) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export default function InfiniteProductList() {
  const [items, setItems] = useState<Item[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const observerRef = useRef<HTMLDivElement | null>(null);

  const fetchItems = useCallback(async () => {
    if (loading || !hasMore) return;

    try {
      setLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/items?page=${page}`
      );

      if (!res.ok) throw new Error("Failed to fetch");

      const data = await res.json();
      const newItems: Item[] = data?.data?.data || [];

      if (newItems.length === 0) {
        setHasMore(false);
      } else {
        setItems((prev) => [...prev, ...newItems]);
        setPage((prev) => prev + 1);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
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
      { threshold: 0.5 }
    );

    observer.observe(observerRef.current);

    return () => observer.disconnect();
  }, [fetchItems]);

  return (
    <div className="relative px-4 md:px-6 lg:px-8 py-6">
      <Header title="All Products" />

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {items.map((item, index) => {
          const discount = calculateDiscount(
            item.regular_price,
            item.sales_price
          );

          return (
            <div
              key={`${item.id}-${index}`}
              className="group relative bg-white rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-200 flex flex-col h-full"
            >
              {/* Discount */}
              {discount > 0 && (
                <span className="absolute top-2 left-2 z-10 px-2 py-0.5 text-xs font-bold bg-red-600 text-white rounded">
                  {discount}% OFF
                </span>
              )}

              {/* Image */}
              <div className="relative h-40 p-3">
                <Image
                  src={`${process.env.NEXT_PUBLIC_MAIN_DOMAIN}/${item.thumbnail}`}
                  alt={item.name}
                  fill
                  className="object-contain transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
                />
              </div>

              {/* Content */}
              <div className="p-3 flex flex-col flex-grow border-t">
                <Link href={`/${slugify(item.name)}/${item.id}`}>
                  <p className="text-xs font-semibold text-gray-700 uppercase truncate">
                    {item.sub_category?.name || "Category"}
                  </p>

                  <h3 className="text-sm font-bold text-gray-900 mt-1 line-clamp-2 min-h-[2.5rem]">
                    {item.name}
                  </h3>

                  {/* Rating */}
                  <div className="flex items-center gap-1 my-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-3 h-3 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                    <span className="text-xs text-gray-500 ml-1">
                      Rate this product
                    </span>
                  </div>

                  {/* Price */}
                  <div>
                    {discount > 0 ? (
                      <div className="flex items-center gap-2">
                        <span className="text-sm line-through text-gray-400">
                          ৳{Number(item.regular_price).toLocaleString()}
                        </span>
                        <span className="text-lg font-bold text-red-600">
                          ৳{Number(item.sales_price).toLocaleString()}
                        </span>
                      </div>
                    ) : (
                      <span className="text-lg font-bold text-gray-900">
                        ৳{Number(item.regular_price).toLocaleString()}
                      </span>
                    )}
                  </div>
                </Link>

                <ProductModal product={item} />
                <div className="mt-auto grid grid-cols-3 gap-5 items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <div className="cursor-pointer w-full col-span-2">
                    <AddToCartButton product={item} />
                  </div>
                  <Heart className="col-span-1 cursor-pointer h-8 w-8 text-red-600 hover:text-gray-900" />
                  <ProductModal product={item} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Infinite Loader */}
      {hasMore && (
        <div ref={observerRef} className="h-20 flex justify-center items-center">
          {loading && (
            <div className="flex flex-col items-center gap-2">
              <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-700 rounded-full animate-spin" />
              <p className="text-sm text-gray-500">Loading more products...</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
