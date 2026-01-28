import InfiniteProductList from "@/utils/InfiniteProductList";
import Banner from "@/components/modules/home/Banner";
import ShippingInfo from "@/components/modules/home/DeliverySupportComponent";
import Products from "@/components/modules/home/ProductShow/Products";
import { ssrFetch } from "@/lib/ssrFetch";
import { Category } from "@/types/category";

export default async function Page() {
  const { data: categories, error } = await ssrFetch<Category[]>("/categories");

  return (
    <>
      <div className="">
        <Banner />
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="hidden lg:block">
            <ShippingInfo />
          </div>

          <div className="my-8 lg:my-0">
            <Products sectionId={2} headerTitle="LATEST COLLECTIONS" />
          </div>


          <Products sectionId={1} headerTitle="TREANDING" />
          <Products sectionId={7} headerTitle="BOOK A SERVICE NOW" />
          <Products sectionId={2} headerTitle="SHOPS" />
          <InfiniteProductList sort="newest" styleClass="grid-cols-4" />
        </div>

      </div>

    </>
  );
}
