import { ssrFetch } from "@/lib/ssrFetch";
import { Item } from "@/types/Item";
import Image from "next/image";



const PageComponents = async ({ params }: PageProps) => {
  const { name, id } = await params;

  const { data: item, error } = await ssrFetch<Item>(`/item/${id}`);

  if (error || !item) {
    return (
      <div className="flex items-center justify-center min-h-[300px] text-red-500 font-medium">
        Failed to load product information.
      </div>
    );
  }

  const imageSrc = item.resized_image
    ? `${process.env.NEXT_PUBLIC_MAIN_DOMAIN}/${item.resized_image}`
    : "/placeholder.png";

  return (
    <section className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* Product Image */}
        <div className="relative w-full h-[380px] rounded-xl border bg-white overflow-hidden">
          <Image
            src={imageSrc}
            alt={name || item.name || "Product image"}
            fill
            priority
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        {/* Product Info */}
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold text-gray-900">
            {item.name}
          </h1>

          {/* Price */}
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-400 line-through">
              ৳{Number(item.regular_price).toLocaleString()}
            </span>
            <span className="text-2xl font-bold text-red-600">
              ৳{Number(item.sales_price).toLocaleString()}
            </span>
          </div>

          {/* Divider */}
          <div className="border-t pt-4" />

          {/* Description */}
          <div
            className="prose max-w-none text-gray-700"
            dangerouslySetInnerHTML={{ __html: item.details || "" }}
          />
        </div>
      </div>
    </section>
  );
};

export default PageComponents;
