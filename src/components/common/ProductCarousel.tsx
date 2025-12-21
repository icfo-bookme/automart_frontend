"use client";

import * as React from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { Star } from "lucide-react";
import { Item } from "@/types/item";


type ProductCarouselProps = {
  products: Item[];
};

const calculateDiscount = (
  regular: number | string,
  sales: number | string
): number => {
  const r = Number(regular);
  const s = Number(sales);

  if (!r || r <= s) return 0;

  return Math.round(((r - s) / r) * 100);
};

export const ProductCarousel: React.FC<ProductCarouselProps> = ({
  products,
}) => {
  return (
    <div className="w-full px-4 md:px-6 lg:px-8 py-6">
      <Carousel
        opts={{
          align: "start",
          loop: true,
          slidesToScroll: 5,
        }}
        className="w-full relative group"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {products.map((item) => {
            const discount = calculateDiscount(
              item.regular_price,
              item.sales_price
            );

            return (
              <CarouselItem
                key={item.id}
                className="pl-2 md:pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 min-w-[50%] sm:min-w-[33.333%] md:min-w-[25%] lg:min-w-[20%]"
              >
                <div className="group/card relative bg-white rounded-lg overflow-hidden border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-200 h-full flex flex-col">
                  {discount > 0 && (
                    <div className="absolute top-2 left-2 z-10">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-red-600 text-white">
                        -{discount}%
                      </span>
                    </div>
                  )}

                  {/* STRICT FIXED HEIGHT CONTAINER */}
                  <div className="relative w-full" style={{ height: "160px" , width: "150px"}}>
                    <div 
                      className="relative w-full h-full bg-white"
                      style={{ 
                        height: "160px",
                        width: "150px",
                        minHeight: "160px",
                        maxHeight: "160px"
                      }}
                    >
                      <div className="absolute inset-0 flex items-center justify-center p-2">
                        <div 
                          className="relative w-full h-full"
                          style={{ 
                            height: "160px",
                            minHeight: "160px",
                            maxHeight: "160px"
                          }}
                        >
                          <Image
                            src={`${process.env.NEXT_PUBLIC_MAIN_DOMAIN}/${item.thumbnail}`}
                            alt={item.name || "Product image"}
                            width={100}
                            height={160}
                            className="object-contain"
                            sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                            priority={false}
                            style={{
                              height: "160px !important",
                              minHeight: "160px !important",
                              maxHeight: "160px !important",
                              objectFit: "contain"
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 flex flex-col flex-grow border-t border-gray-100">
                    <p className="text-xs font-semibold text-gray-700 mb-1 truncate uppercase">
                      {item.sub_category?.name || "Category"}
                    </p>

                    <h3 className="text-sm font-bold text-gray-900 mb-2 line-clamp-2 h-10">
                      {item.name || "Product Name"}
                    </h3>

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

                    <div className="mt-auto space-y-1">
                      <div className="flex items-center gap-2">
                        {discount > 0 ? (
                          <span className="text-sm line-through text-gray-400 font-medium">
                            ৳{Number(item.regular_price).toLocaleString()}
                          </span>
                        ) : (
                          <span className="text-lg font-bold text-gray-900">
                            ৳{Number(item.regular_price).toLocaleString()}
                          </span>
                        )}

                        {discount > 0 && (
                          <span className="text-lg font-bold text-red-600">
                            ৳{Number(item.sales_price).toLocaleString()}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>

        <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 md:-translate-x-1/2 z-10 h-8 w-8 md:h-10 md:w-10 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 shadow-md transition-all duration-200 opacity-0 group-hover:opacity-100" />
        <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 md:translate-x-1/2 z-10 h-8 w-8 md:h-10 md:w-10 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 shadow-md transition-all duration-200 opacity-0 group-hover:opacity-100" />
      </Carousel>
    </div>
  );
};