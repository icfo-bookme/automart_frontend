import InfiniteProductList from "@/utils/InfiniteProductList";
import Banner from "@/components/modules/home/Banner";
import ShippingInfo from "@/components/modules/home/DeliverySupportComponent";
import LatestProduct from "@/components/modules/home/ProductShow/LatestProduct";
import { ssrFetch } from "@/lib/ssrFetch";
import { Category } from "@/types/category";

export default async function Page() {
  const { data: categories, error } = await ssrFetch<Category[]>("/categories");

  return (
    <>
      <div className="">
        <Banner />
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <ShippingInfo />
          <LatestProduct sectionId={2} headerTitle="LATEST COLLECTIONS" />
          <LatestProduct sectionId={1} headerTitle="TREANDING" />
          <LatestProduct sectionId={7} headerTitle="BOOK A SERVICE NOW" />
          <LatestProduct sectionId={2} headerTitle="SHOPS" />
          <InfiniteProductList />
        </div>

      </div>

    </>
  );
}
